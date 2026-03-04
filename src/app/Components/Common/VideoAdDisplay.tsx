"use client";

import { useEffect, useRef, useState } from "react";
import { Backdrop, Box, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useVideoAdFetcher } from "../../Hooks/useVideoAdFetcher";
import { frostedGlassEffect } from "../../Utils/colors";
import { borderRadius } from "../../Utils/spacings";
import { incrementAdViews } from "../../Services/feedService";
import { getSavedVolume } from "../PageLayout/Navbar/VolumeButtons";
import { VolumeOffOutlined, VolumeUpOutlined } from "@mui/icons-material";

const VideoAdDisplay = ({
  onEnd,
  onStart,
}: {
  onEnd?: () => void;
  onStart?: () => void;
}) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ad, loading } = useVideoAdFetcher();

  const [mute, setMute] = useState(false);
  const [open, setOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Displaying the actual remaining time of Video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const remaining = (video.duration - video.currentTime) * 1000;
      setTimeLeft(Math.max(remaining, 0));
    };

    const handleEnded = () => {
      setOpen(false); // Close the ad when video ends
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [isVideoReady]);

  useEffect(() => {
    if (!ad && !loading) {
      // If ad is null, close the ad display
      setOpen(false);
      onEnd?.();
      return;
    }

    if (ad?._id && open) {
      handleAdViewIncrement(ad._id);
    }
  }, [ad, open, loading]);

  useEffect(() => {
    if (!open) {
      onEnd?.();
    }
  }, [open]);

  const handleAdViewIncrement = async (adId: string) => {
    try {
      await incrementAdViews(adId);
    } catch (error) {
      console.error("Failed to increment ad view:", error);
    }
  };

  const handleLoadedMetadata = () => {
    const duration = videoRef.current?.duration;
    if (duration && !isNaN(duration)) {
      const durationMs = Math.floor(duration * 1000);
      setTimeLeft(durationMs);
    }

    // Set volume
    const video = videoRef.current;
    if (video) {
      const savedVolume = getSavedVolume();
      video.volume = savedVolume;
      video.muted = false;
      setMute(false);
    }

    setIsVideoReady(true);
    onStart?.(); // ✅ Notify parent when video actually starts
  };

  const formatTime = (milliseconds: number | null) => {
    if (milliseconds === null) return "";
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    return `${seconds}s`;
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !mute;
    video.muted = newMuted;
    setMute(newMuted);
  };

  if (!open || !ad) return null;

  return (
    <Backdrop
      sx={{
        position: "fixed !important",
        width: "100vw",
        height: "100dvh",
        top: 0,
        zIndex: 1300,
        display: !isVideoReady ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backdropFilter: "none",
        backgroundColor: "#000",
      }}
      open={open}
    >
      <Box
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 12px",
          zIndex: 1,
          backgroundColor: "rgba(256,256,256, 0.65)",
          borderRadius: borderRadius.lg,
          ...frostedGlassEffect,
        }}
      >
        {t("Ad will skip in ")}
        {formatTime(timeLeft)}
      </Box>

      <video
        ref={videoRef}
        src={ad.picture}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay
        muted={mute || !isVideoReady} // ✅ Keep muted during preload
        playsInline
        style={{
          width: "100vw",
          height: "100dvh",
          objectFit: "contain",
        }}
      />

      {/* Mute Button stays same */}
      <IconButton
        size='large'
        onClick={toggleMute}
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          borderRadius: "50%",
          zIndex: 2,
          backgroundColor: "rgba(256,256,256, 0.65)",
          ...frostedGlassEffect,

          "&:hover": { backgroundColor: "rgba(256,256,256, 0.85)" },
        }}
      >
        {mute ? (
          <VolumeOffOutlined fontSize='inherit' />
        ) : (
          <VolumeUpOutlined fontSize='inherit' />
        )}
      </IconButton>
    </Backdrop>
  );
};

export default VideoAdDisplay;

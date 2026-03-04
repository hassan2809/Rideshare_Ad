"use client";

import { Box, Skeleton, SxProps, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import colors from "../../Utils/colors";
import { useState, useEffect, useRef } from "react";
import { borderRadius } from "../../Utils/spacings";
import { isVideoFromUrl } from "../../Utils/utils";
import { applySavedVolume } from "../PageLayout/Navbar/VolumeButtons";
import { VolumeOffOutlined, VolumeUpOutlined } from "@mui/icons-material";

interface FloatingButtonProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  right?: number;
  left?: number;
}

const FloatingButton = ({
  children,
  left,
  right,
  onClick,
}: FloatingButtonProps) => {
  return (
    <IconButton
      size='small'
      onClick={onClick}
      sx={{
        position: "absolute",
        bottom: 8,
        right,
        left,
        bgcolor: "rgba(0,0,0,0.4)",
        color: "white",
        borderRadius: "50%",
        zIndex: 2,
        "&:hover": { bgcolor: "rgba(0,0,0,0.6)" },
      }}
    >
      {children}
    </IconButton>
  );
};

interface PostPictureProps {
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  aspectRatio?: number | string;
  src?: string;
  onClick?: () => void;
  sx?: SxProps;
}

const PostPicture = ({
  className,
  objectFit = "contain",
  aspectRatio,
  src,
  onClick,
  sx,
  ...props
}: PostPictureProps) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mute, setMute] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isVideo = isVideoFromUrl(src);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px 150px 0px",
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Play/pause video based on 50% visibility
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.intersectionRatio >= 0.5) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [loaded]);

  const togglePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // prevent triggering the parent's onClick
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !mute;
    video.muted = newMuted;
    setMute(newMuted);
  };

  const isVisible = loaded && inView;

  return (
    // <ViewTransition name='post-picture-transition'>
    <Box
      className={className}
      ref={containerRef}
      position='relative'
      sx={{
        aspectRatio,
        minHeight: isVisible ? "auto" : 250,
        borderRadius: borderRadius.xl,
        width: "100%",
        boxShadow: `rgba(23, 58, 90, 0.25) 0px 50px 50px -10px`,
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        ...sx,
      }}
      onClick={onClick}
    >
      {inView &&
        (isVideo ? (
          <>
            <Box
              component='video'
              ref={videoRef}
              src={src}
              onLoadedData={() => {
                setLoaded(true);
                applySavedVolume(videoRef.current);
              }}
              autoPlay
              muted={mute}
              loop
              playsInline
              preload='metadata'
              style={{ display: loaded ? "block" : "none" }}
              {...props}
              sx={{
                objectFit,
                width: "100%",
                height: "100%",
                minHeight: isVisible ? "auto" : 350,
                borderRadius: borderRadius.xl,
                border: `0.5px solid ${colors.border}`,
                aspectRatio,
              }}
            />

            <FloatingButton onClick={togglePlay} left={8}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </FloatingButton>

            <FloatingButton onClick={toggleMute} right={8}>
              {mute ? <VolumeOffOutlined /> : <VolumeUpOutlined />}
            </FloatingButton>
          </>
        ) : (
          <Box
            component='img'
            src={src}
            onLoad={() => setLoaded(true)}
            alt='Post'
            sx={{
              maxWidth: "100%",
              width: "100%",
              objectFit,
              borderRadius: borderRadius.xl,
              minHeight: isVisible ? "auto" : 350,
              height: "100%",
              border: `0.5px solid ${colors.border}`,
              display: loaded ? "block" : "none",
              aspectRatio,
            }}
            {...props}
          />
        ))}

      <Skeleton
        variant='rectangular'
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          minWidth: "100%",
          height: "100%",
          display: isVisible ? "none" : "block",
          borderRadius: borderRadius.xl,
          border: `0.5px solid ${colors.border}`,
          bgcolor: "#EBEBEE",
          aspectRatio,
        }}
        animation='wave'
      />
    </Box>
    // </ViewTransition>
  );
};

export default PostPicture;

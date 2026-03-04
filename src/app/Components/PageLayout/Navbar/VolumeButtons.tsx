"use client";

import { useEffect, useRef, useState } from "react";
import { Box, Popover, Slider } from "@mui/material";
import {
  VolumeDownOutlined,
  VolumeUpOutlined,
  VolumeOffOutlined,
  VolumeMuteOutlined,
} from "@mui/icons-material";
import { borderRadius } from "../../../Utils/spacings";
import { useTranslation } from "react-i18next";
import CustomButton from "../../Common/CustomButton";
import { volumeKey } from "@/app/Utils/enums";
import { lessBlurredFrostedGlassEffect } from "@/app/Utils/colors";

export function applySavedVolume(el: HTMLMediaElement | null) {
  if (!el) return;
  const saved = localStorage.getItem(volumeKey);
  const vol = saved ? parseInt(saved) : 100;
  el.volume = vol / 100;
}

export function getSavedVolume() {
  const saved = localStorage.getItem(volumeKey);
  const vol = saved ? parseInt(saved) : 100;
  return vol / 100;
}

// Helper: Get icon based on volume level
const getVolumeIcon = (volume: number) => {
  if (volume === 0) return <VolumeMuteOutlined />;
  if (volume < 50) return <VolumeDownOutlined />;
  return <VolumeUpOutlined />;
};

const VolumeButtons = () => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [volume, setVolume] = useState<number>(50);
  const [previousVolume, setPreviousVolume] = useState<number>(50);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const autoCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const open = Boolean(anchorEl);

  const applyVolume = (val: number) => {
    document
      .querySelectorAll<HTMLMediaElement>("video, audio")
      .forEach((element) => {
        element.muted = false;
        element.volume = val / 100;
      });
  };

  const handleMuteClick = () => {
    const isMuted = volume === 0;
    const newVolume = isMuted ? previousVolume : 0;

    if (!isMuted) {
      setPreviousVolume(volume);
    }

    setVolume(newVolume);
    document
      .querySelectorAll<HTMLMediaElement>("video, audio")
      .forEach((element) => {
        element.muted = newVolume === 0;
        if (newVolume !== 0) element.volume = newVolume / 100;
      });

    localStorage.setItem(volumeKey, volume.toString());
  };

  const handleVolumeSlider = (_: Event, val: number | number[]) => {
    const newVal = Array.isArray(val) ? val[0] : val;
    setVolume(newVal);
    applyVolume(newVal);
    localStorage.setItem(volumeKey, newVal.toString());
    resetAutoCloseTimer();
  };

  const handleVolumeClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    resetAutoCloseTimer();
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    clearTimeout(autoCloseTimeoutRef.current!);
  };

  const resetAutoCloseTimer = () => {
    clearTimeout(autoCloseTimeoutRef.current!);
    autoCloseTimeoutRef.current = setTimeout(() => {
      handlePopoverClose();
    }, 2000);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        anchorEl &&
        !anchorEl.contains(target)
      ) {
        handlePopoverClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl]);

  // Set initial volume
  useEffect(() => {
    const saved = localStorage.getItem(volumeKey);
    const initialVol = saved ? parseInt(saved) : 100;
    setVolume(initialVol);
    setPreviousVolume(initialVol);
  }, []);

  return (
    <>
      <CustomButton variant='text' onClick={handleMuteClick}>
        <VolumeOffOutlined />
        {t("Mute")}
      </CustomButton>
      <CustomButton onClick={handleVolumeClick} variant='text'>
        {getVolumeIcon(volume)}
        {t("Volume")}
      </CustomButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        hideBackdrop
        disableEnforceFocus
        disableAutoFocus
        disableRestoreFocus
        disableEscapeKeyDown
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        PaperProps={{
          ref: popoverRef,
          sx: {
            p: "24px 18px 28px 18px",
            borderRadius: borderRadius.lg,
            backgroundColor: "rgba(0,0,0,0.6)",
            ...lessBlurredFrostedGlassEffect,
            color: "#fff",
            marginBottom: 20,
            boxShadow: `rgba(23, 58, 90, 0.25) 0px 50px 50px -10px`,
            pointerEvents: "auto",
          },
        }}
        sx={{
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            height: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            gap: 20,
          }}
        >
          {getVolumeIcon(volume)}
          <Slider
            orientation='vertical'
            value={volume}
            min={0}
            max={100}
            step={5}
            onChange={handleVolumeSlider}
            sx={{
              color: "white",
              "& .MuiSlider-thumb": {
                backgroundColor: "white",
              },
              "& .MuiSlider-track": {
                backgroundColor: "white",
              },
              "& .MuiSlider-rail": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          />
        </Box>
      </Popover>
    </>
  );
};

export default VolumeButtons;

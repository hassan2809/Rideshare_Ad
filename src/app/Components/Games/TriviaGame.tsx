"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Button, Chip, Typography } from "@mui/material";
import { borderRadius, navbarHeight } from "../../Utils/spacings";
import { useTranslation } from "react-i18next";
import { games } from "@/app/api/utils/enums";
import { getShuffledQuestions } from "./questions";
import GameOverScreen from "./GameOverScreen";
import { useGameScore } from "./Hooks/useGameScore";
import { GameType } from "@/app/Utils/types";
import { usePlayerData } from "./Hooks/usePlayerData";
import PlayerDialogs from "./PlayerDialogs";
import { useGameTimer } from "./Hooks/useGameTimer";
import VideoAdDisplay from "../Common/VideoAdDisplay";
import TimeOverDialog from "./TimeOverDialog";
import useInactivityHandler from "@/app/Hooks/useInactivityHandler";
import { QuestionAnswerOutlined } from "@mui/icons-material";
import RenderTimer from "../Common/RenderTimer";
import PageHeading from "../Common/PageHeading";

const TriviaGame = () => {
  const { t } = useTranslation();
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const { playerData, updatePlayer, resetPlayer } = usePlayerData();
  const { leaderboard, submitScore, loadingLeaderboard } = useGameScore(
    games.TRIVIA as GameType
  );
  const { questionTime, totalTime, startTimer, stopTimer, resetQuestionTime } =
    useGameTimer({
      timePerQuestion: 60,
      onTimeUp: () => {
        setGameFailed(true);
        stopTimer();
      },
    });
  useInactivityHandler();

  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [showStartingModal, setShowStartingModal] = useState(true);
  const [showEndingModal, setShowEndingModal] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [displayAd, setDisplayAd] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Array<any>>(() =>
    getShuffledQuestions()
  );

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  useEffect(() => {
    if (isFinished || currentQuestionIndex === 9) {
      setDisplayAd(true); // TODO: incase face any issue here, will gonna move the Ad here
    }
  }, [isFinished, currentQuestionIndex]);

  useEffect(() => {
    if (!isFinished && !showStartingModal && !showEndingModal) {
      resetQuestionTime();
      startTimer();
    }
  }, [currentQuestionIndex, isFinished, showStartingModal, showEndingModal]);

  const handleAnswerClick = (option: string) => {
    setSelectedAnswer(option);

    // Scroll to the submit button after small delay to allow render
    setTimeout(() => {
      submitButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleNext = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
      resetQuestionTime();
    } else {
      setShowEndingModal(true);
      stopTimer();
    }
  };

  const handleSubmitStartingDetails = (data: any) => {
    updatePlayer({ ...playerData, city: data.city, username: data.username });
    setShowStartingModal(false);
    setDisplayAd(true);
  };

  const handleSubmitEndingDetails = (data: any) => {
    const updatedPlayerData = {
      ...playerData,
      name: data.name,
      email: data.email,
    };
    updatePlayer(updatedPlayerData);
    setShowEndingModal(false);
    setIsFinished(true);
    submitScore(updatedPlayerData, score, totalTime);
  };

  const handleRestart = () => {
    setShuffledQuestions(getShuffledQuestions());
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setIsFinished(false);
    resetPlayer();
    setShowStartingModal(true);
    setGameFailed(false);
    resetQuestionTime();
  };

  const yourEntry = leaderboard?.find(
    (item: any) =>
      item.username === playerData.username && item.name === playerData.name
  );

  // TODO: check location for opera/google chrome

  const currentPosition = yourEntry?.position;

  return (
    <>
      {/* <PlayerDialogs
        showStartingModal={showStartingModal}
        onStart={handleSubmitStartingDetails}
        showEndingModal={showEndingModal}
        onEnd={handleSubmitEndingDetails}
      /> */}

      <TimeOverDialog open={gameFailed} onRestart={handleRestart} />

      {displayAd && (
        <VideoAdDisplay
          onStart={() => stopTimer()}
          onEnd={() => {
            if (!showStartingModal && !isFinished && !showEndingModal) {
              startTimer();
            }
            setDisplayAd(false);
          }}
        />
      )}

      <Box
        sx={{
          minHeight: `calc(100dvh - ${navbarHeight}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          // padding: 32,
          padding: 14,
          position: "relative",
        }}
      >
        {isFinished ? (
          <GameOverScreen
            score={score}
            position={currentPosition}
            leaderboard={leaderboard}
            yourId={yourEntry?._id}
            onRestart={handleRestart}
            loading={loadingLeaderboard}
            time={totalTime}
          />
        ) : (
          <>
            <RenderTimer time={questionTime} absolutePosition />
            <Box maxWidth={650} width='100%'>
              <PageHeading mb={8}>{t("TRIVIA")}</PageHeading>
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexWrap='wrap'
                gap={8}
                mb={32}
              >
                <PageHeading mb={0} variant='h6'>
                  {t("THE BEST SCORE OF THE DAY")}
                </PageHeading>
                <PageHeading variant='h4' mb={0}>
                  {t("WIN $25")}
                </PageHeading>
              </Box>

              <Box
                className='pop-out-animation'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                mb={16}
              >
                <Typography
                  display='flex'
                  alignItems='center'
                  gap={6}
                  fontSize={12}
                >
                  <QuestionAnswerOutlined fontSize='medium' />
                  {t("Question: ")}
                  {currentQuestionIndex + 1}/{shuffledQuestions.length}
                </Typography>

                <Chip
                  size='small'
                  label={t(currentQuestion?.difficulty)}
                  sx={{
                    textTransform: "uppercase",
                    p: "4px 6px",
                    height: "auto",
                    "& .MuiChip-label": {
                      fontSize: "8px !important",
                    },
                  }}
                />
              </Box>

              <Typography
                key={currentQuestionIndex + "-question"}
                className='pop-out-animation'
                variant='h4'
                mb={18}
                textAlign='center'
              >
                {t(currentQuestion.question)}
              </Typography>

              <Box
                display='flex'
                flexDirection={{ xs: "column", sm: "row" }}
                gap={24}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  {currentQuestion.options.map((option: any, idx: number) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.correctAnswer;

                    const variant: "contained" | "outlined" = isSelected
                      ? "contained"
                      : "outlined";
                    const color: "primary" | "error" | "success" =
                      isSelected && isCorrect
                        ? "success"
                        : isSelected && !isCorrect
                        ? "error"
                        : "primary";

                    return (
                      <Button
                        className='pop-out-animation'
                        key={option}
                        variant={variant}
                        color={color}
                        onClick={() => handleAnswerClick(option)}
                        disabled={!!selectedAnswer}
                        sx={{
                          borderRadius: borderRadius.lg,
                          animationDelay: `${idx * 0.05}s`,
                          paddingBlock: 30,
                        }}
                      >
                        {t(option)}
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              {selectedAnswer ? (
                <Button
                  ref={submitButtonRef}
                  variant='contained'
                  sx={{ mt: 16 }}
                  onClick={handleNext}
                  fullWidth
                  className='slide-up-bounce'
                >
                  {t(
                    currentQuestionIndex === shuffledQuestions.length - 1
                      ? "Finish"
                      : "Next"
                  )}
                </Button>
              ) : (
                <Box height={16 + 50} />
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default TriviaGame;

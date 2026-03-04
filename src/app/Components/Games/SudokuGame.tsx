"use client";

import { useTranslation } from "react-i18next";
import { getSudoku } from "sudoku-gen";
import { Box, Button, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import colors from "@/app/Utils/colors";
import {
  ReplayOutlined,
  ArrowUpward,
  ArrowDownward,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { navbarHeight } from "@/app/Utils/spacings";
import { games } from "@/app/api/utils/enums";
import GameOverScreen from "./GameOverScreen";
import { useGameScore } from "./Hooks/useGameScore";
import { GameType } from "@/app/Utils/types";
import { usePlayerData } from "./Hooks/usePlayerData";
import PlayerDialogs from "./PlayerDialogs";
import { useGameTimer } from "./Hooks/useGameTimer";
import useInactivityHandler from "@/app/Hooks/useInactivityHandler";
import TimeOverDialog from "./TimeOverDialog";
import VideoAdDisplay from "../Common/VideoAdDisplay";
import RenderTimer from "../Common/RenderTimer";
import PageHeading from "../Common/PageHeading";

type Difficulty = "easy" | "medium" | "hard";

const stringToGrid = (str: string): number[][] => {
  const nums = str.split("").map((char) => (char === "-" ? 0 : parseInt(char)));
  const grid: number[][] = [];
  for (let i = 0; i < 9; i++) {
    grid.push(nums.slice(i * 9, i * 9 + 9));
  }
  return grid;
};

const SudokuGame = () => {
  const difficulty = "easy";

  const { t } = useTranslation();
  const { playerData, updatePlayer, resetPlayer } = usePlayerData();
  const { leaderboard, submitScore, loadingLeaderboard } = useGameScore(
    games.SUDOKU as GameType
  );
  const { questionTime, totalTime, startTimer, stopTimer, resetQuestionTime } =
    useGameTimer({
      timePerQuestion: 180,
      onTimeUp: () => {
        setGameFailed(true);
        stopTimer();
      },
    });
  useInactivityHandler();

  const [puzzle, setPuzzle] = useState<number[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [board, setBoard] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null
  );
  const [isFinished, setIsFinished] = useState(false);
  const [showStartingModal, setShowStartingModal] = useState(true);
  const [showEndingModal, setShowEndingModal] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);
  const [displayAd, setDisplayAd] = useState(false);

  const loadPuzzle = (level: Difficulty) => {
    const { puzzle, solution } = getSudoku(level);
    const puzzleGrid = stringToGrid(puzzle);
    const solutionGrid = stringToGrid(solution);
    const boardGrid = puzzleGrid.map((row) => [...row]);

    setPuzzle(puzzleGrid);
    setSolution(solutionGrid);
    setBoard(boardGrid);
    setSelectedCell(null);

    // ✅ Auto-select the first empty (0) cell
    outer: for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (boardGrid[i][j] === 0) {
          setSelectedCell([i, j]);
          break outer;
        }
      }
    }
  };

  useEffect(() => {
    loadPuzzle(difficulty);
  }, [difficulty]);

  useEffect(() => {
    if (isFinished) {
      setDisplayAd(true);
    }
  }, [isFinished]);

  useEffect(() => {
    if (!isFinished && !showStartingModal && !showEndingModal) {
      resetQuestionTime();
      startTimer();
    }
  }, [isFinished, showStartingModal, showEndingModal]);

  const handleValueInput = (val: number) => {
    if (selectedCell) {
      const [row, col] = selectedCell;
      const isFixed = puzzle[row][col] !== 0;
      if (isFixed) return;

      const updated = [...board];
      updated[row][col] = val;
      setBoard(updated);
    }
  };

  const handleArrowMove = (direction: "up" | "down" | "left" | "right") => {
    if (!selectedCell) return;
    let [row, col] = selectedCell;

    switch (direction) {
      case "up":
        if (row > 0) row--;
        break;
      case "down":
        if (row < 8) row++;
        break;
      case "left":
        if (col > 0) col--;
        break;
      case "right":
        if (col < 8) col++;
        break;
    }

    setSelectedCell([row, col]);
  };

  const checkSolution = () => {
    // const correct = board.every((row, r) =>
    //   row.every((cell, c) => cell === solution[r][c])
    // );

    // if (correct) {
    setShowEndingModal(true);
    stopTimer();
    // } else {
    //   alert("❌ There are mistakes.");
    // }
  };

  const handleSubmitStartingDetails = (data: any) => {
    updatePlayer({
      ...playerData,
      city: data.city,
      username: data.username,
    });
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
    submitScore(
      updatedPlayerData,
      calculateScore(puzzle, board, solution),
      totalTime
    );
  };

  const calculateScore = (
    puzzle: number[][],
    board: number[][],
    solution: number[][]
  ): number => {
    let score = 0;
    let totalFillable = 0;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (puzzle[r][c] === 0) {
          totalFillable++;
          if (board[r][c] === solution[r][c]) {
            score++;
          }
        }
      }
    }

    return Math.round((score / totalFillable) * 100); // return score as percentage
  };

  const handleRestart = () => {
    loadPuzzle(difficulty);
    setIsFinished(false);
    resetPlayer();
    setShowStartingModal(true);
    setGameFailed(false);
    resetQuestionTime();
    if (isFinished) {
      setIsFinished(!isFinished);
    }
  };

  const isBoardFullyFilled = (): boolean => {
    return board.every((row) => row.every((cell) => cell !== 0));
  };

  const yourEntry = leaderboard?.find(
    (item: any) =>
      item.username === playerData.username && item.name === playerData.name
  );

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
        position='relative'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        sx={{
          // padding: 32,
          padding: 14,
          maxWidth: "100vw",
          minHeight: `calc(100dvh - ${navbarHeight}px)`,
        }}
      >
        {isFinished ? (
          <GameOverScreen
            score={`${calculateScore(puzzle, board, solution)}%`}
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

            <PageHeading mb={8}>{t("SUDOKU")}</PageHeading>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              flexWrap='wrap'
              gap={8}
              mb={18}
            >
              <PageHeading mb={0} variant='h6'>
                {t("THE BEST SCORE OF THE DAY")}
              </PageHeading>
              <PageHeading variant='h4' mb={0}>
                {t("WIN $25")}
              </PageHeading>
            </Box>

            <Box
              position='relative'
              display='flex'
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent='center'
              alignItems='center'
              gap={24}
              width='100%'
            >
              <Box
                className='pop-out-animation'
                display='grid'
                gridTemplateColumns='repeat(9, 1fr)'
                maxWidth={380}
                width='100%'
              >
                {board.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isFixed = puzzle[rowIndex][colIndex] !== 0;
                    const isSelected =
                      selectedCell?.[0] === rowIndex &&
                      selectedCell?.[1] === colIndex;
                    const isSameRow = selectedCell?.[0] === rowIndex;
                    const isSameCol = selectedCell?.[1] === colIndex;

                    return (
                      <Box
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => setSelectedCell([rowIndex, colIndex])}
                        sx={{
                          borderRight:
                            colIndex === 8
                              ? "1px solid #ccc"
                              : (colIndex + 1) % 3 === 0
                              ? "1.85px solid #ccc"
                              : "1px solid #ccc",
                          borderBottom:
                            rowIndex === 8
                              ? "1px solid #ccc"
                              : (rowIndex + 1) % 3 === 0
                              ? "1.85px solid #ccc"
                              : "1px solid #ccc",
                          borderTop: rowIndex === 0 ? "1px solid #ccc" : "none",
                          borderLeft:
                            colIndex === 0 ? "1px solid #ccc" : "none",

                          height: { xs: 28, sm: 40 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: isFixed ? "400" : "600",
                          color: isFixed ? "text.secondary" : "text.main",
                          fontSize: isFixed ? 16 : 20,
                          cursor: isFixed ? "not-allowed" : "pointer",
                          backgroundColor: isSelected
                            ? colors.primary
                            : isSameRow || isSameCol
                            ? colors.primary + 30
                            : "#fff",
                        }}
                      >
                        {cell !== 0 ? cell : ""}
                      </Box>
                    );
                  })
                )}
              </Box>

              {/* Controls */}
              <Box
                className='pop-out-animation'
                sx={{ animationDelay: "0.1s" }}
                display='flex'
                flexDirection='column'
                gap={4}
                width={"100%"}
                maxWidth={{ xs: 380, sm: 220 }}
              >
                {/* Number Buttons */}
                <Box
                  display='grid'
                  gridTemplateColumns='repeat(3, 1fr)'
                  gap='inherit'
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Button
                      key={num}
                      size='small'
                      variant='contained'
                      sx={{ fontSize: { xs: 16, sm: 30 } }}
                      onClick={() => handleValueInput(num)}
                    >
                      {num}
                    </Button>
                  ))}
                  {/* Arrow Keys */}
                  <Box />
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => handleArrowMove("up")}
                    sx={{ paddingBlock: '12px !important' }}
                  >
                    <ArrowUpward fontSize='large' />
                  </Button>
                  <Box />
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => handleArrowMove("left")}
                    sx={{ paddingBlock: '12px !important' }}
                  >
                    <ArrowBack fontSize='large' />
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => handleArrowMove("down")}
                    sx={{ paddingBlock: '12px !important' }}
                  >
                    <ArrowDownward fontSize='large' />
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => handleArrowMove("right")}
                    sx={{ paddingBlock: '12px !important' }}
                  >
                    <ArrowForward fontSize='large' />
                  </Button>
                </Box>

                {/* Actions */}
                <Box
                  display='grid'
                  gridTemplateColumns='1fr 1fr'
                  gap='inherit'
                  mt={12}
                >
                  <Tooltip
                    title={
                      !isBoardFullyFilled()
                        ? t("❌ Please fill all Sudoku cells to submit.")
                        : ""
                    }
                    arrow
                  >
                    <span>
                      <Button
                        size='small'
                        fullWidth
                        variant='contained'
                        onClick={checkSolution}
                        disabled={!isBoardFullyFilled()}
                      >
                        {t("Submit")}
                      </Button>
                    </span>
                  </Tooltip>
                  <Button
                    size='small'
                    fullWidth
                    variant='outlined'
                    onClick={handleRestart}
                    endIcon={<ReplayOutlined sx={{ width: 16, height: 16 }} />}
                  >
                    {t("Restart")}
                  </Button>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default SudokuGame;

import { Box, Button, Skeleton, Typography } from "@mui/material";
import CustomTable from "../Common/Table/CustomTable";
import RenderUserInLeaderboard from "../Common/RenderUserInLeaderboard";
import { useTranslation } from "react-i18next";
import { borderRadius } from "@/app/Utils/spacings";
import { formatSeconds } from "@/app/Utils/utils";

const GameOverScreen = ({
  title = "🎉 Game Over!",
  scoreText = "You scored:",
  timeText = "Completed in:",
  score,
  time,
  position,
  leaderboard,
  yourId,
  onRestart,
  loading,
}: {
  title?: string;
  scoreText?: string;
  timeText?: string;
  score: number | string;
  time: number | string;
  position: number | string;
  leaderboard: any[];
  yourId: string;
  onRestart: () => void;
  loading?: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      textAlign='center'
      display='grid'
      gridTemplateColumns={{
        md: `repeat(2, 1fr)`,
        sm: "repeat(1, 1fr)",
      }}
      gap={32}
      alignItems='center'
      minWidth='80%'
    >
      <Box>
        <Typography className='pop-out-animation' variant='h2' mb={16}>
          {t(title)}
        </Typography>

        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              className='slide-up-bounce'
              key={index}
              variant='text'
              width='50%'
              height={20}
              sx={{
                mx: "auto",
                borderRadius: borderRadius.sm,
                mb: index === 1 ? 32 : 0,
              }}
            />
          ))
        ) : (
          <>
            <Typography className='slide-up-bounce' variant='h6' mb={12}>
              {t(scoreText)} {score}
            </Typography>
            <Typography className='slide-up-bounce' variant='h6' mb={12}>
              {t(timeText)} {formatSeconds(time)}
            </Typography>
            <Typography className='slide-up-bounce' variant='h6' mb={32}>
              {t("You are on position:")} {position || "0"}
            </Typography>
          </>
        )}
        <Button
          className='slide-up-bounce'
          variant='contained'
          onClick={onRestart}
          sx={{ animationDelay: "0.1s" }}
          disabled={loading}
        >
          {t("Play Again")}
        </Button>
      </Box>

      <Box>
        <Typography variant='h4'>{t("Leaderboard")}</Typography>
        <CustomTable
          stickyHeaders
          headers={[
            { text: "Position", key: "position", sortable: true },
            {
              text: "Name",
              key: "name",
              customComponent: (props: {
                name: string;
                _id: string;
                username: string;
              }) => <RenderUserInLeaderboard yourId={yourId} user={props} />,
            },
            {
              text: "Score",
              key: "score",
              sortable: true,
              align: "center",
            },
            {
              text: "Time",
              key: "time",
              sortable: true,
              align: "center",
              customComponent: (props: { time: number }) => (
                <Typography>{formatSeconds(props.time)}</Typography>
              ),
            },
          ]}
          rows={leaderboard}
          rowsPerPage={50}
          maxHeight={250}
          highlightedId={yourId || ""}
        />
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              className='slide-up-bounce'
              key={index}
              variant='text'
              width='100%'
              height={20}
              sx={{
                mx: "auto",
                borderRadius: borderRadius.sm,
                mt: !index ? 12 : 0,
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default GameOverScreen;

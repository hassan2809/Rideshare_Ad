import { Typography } from "@mui/material";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface UserProps {
  name: string;
  _id: string;
  username: string;
}

interface RenderUserInLeaderboardProps {
  user: UserProps;
  yourId?: string;
}

const RenderUserInLeaderboard = ({
  user,
  yourId,
}: RenderUserInLeaderboardProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography fontWeight={yourId === user._id ? 600 : 500}>
        {user.name}{" "}
        {yourId === user._id && (
          <Typography component='span' fontSize={10} color='primary.main'>
            {t("(me)")}
          </Typography>
        )}
      </Typography>
      <Typography fontSize={10} color='text.secondary' mt={6}>
        @{user.username}
      </Typography>
    </>
  );
};

export default RenderUserInLeaderboard;

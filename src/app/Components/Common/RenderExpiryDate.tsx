import { Chip, Box } from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";

const RenderExpiryDate = ({ date }: { date: string }) => {
  const { t } = useTranslation();

  const isExpired = moment(date).isBefore(moment(), "day");

  return isExpired ? (
    <Box
      sx={{
        color: "error.main",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {moment(date).format("LL")}
      <Chip size='small' color='error' label={t("Expired")} />
    </Box>
  ) : (
    moment(date).format("LL")
  );
};

export default RenderExpiryDate;

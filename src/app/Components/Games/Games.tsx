"use client";

import { useTranslation } from "react-i18next";
import { allRoutes } from "../../Routes/AllRoutes";
import PageHeading from "../Common/PageHeading";
import HomeCard from "../Home/HomeCard";
import { HomeContainer, HomeInnerBlock } from "../Home/homeStyles";

const Games = () => {
  const { t } = useTranslation();
  return (
    <>
      <HomeContainer>
        <PageHeading variant='h2' animationDelay={0.1} mb={12}>
          {t("PLAY & WIN")}
        </PageHeading>
        <PageHeading animationDelay={0.2} mb={32}>{t("CASH PRIZES!")}</PageHeading>
        <HomeInnerBlock sx={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          <HomeCard isGameCard href={allRoutes.TRIVIA_GAME} text='TRIVIA' />
          <HomeCard
            isGameCard
            href={allRoutes.SUDOKU_GAME}
            text='SUDOKU'
            animationDelay={0.05}
          />
          <HomeCard isGameCard disabled text='FACTS' animationDelay={0.1} />
          <HomeCard
            isGameCard
            disabled
            text='CELEBRITY'
            animationDelay={0.15}
          />
        </HomeInnerBlock>
        <PageHeading animationDelay={0.3} variant="h2" mt={32} mb={12}>
          {t("THANK YOUR DRIVER!")}
        </PageHeading>
        <PageHeading animationDelay={0.4} variant='h4' mb={0}>
          {t("Tip is appreciated!")}
        </PageHeading>
      </HomeContainer>
    </>
  );
};

export default Games;

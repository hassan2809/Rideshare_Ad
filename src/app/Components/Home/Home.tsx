"use client";

import { allRoutes } from "../../Routes/AllRoutes";
import { HomeContainer, HomeInnerBlock } from "./homeStyles";
import HomeCard from "./HomeCard";
import { useTranslation } from "react-i18next";
import PageHeading from "../Common/PageHeading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("deviceId");
    if (id) {
      setDeviceId(id);
      localStorage.setItem("deviceId", id);
    }
  }, [searchParams]);

  return (
    <>
      <HomeContainer>
        <PageHeading>{t("CHOOSE YOUR EXPERIENCE")}</PageHeading>
        <HomeInnerBlock>
          <HomeCard href={allRoutes.GAMES} text='PLAY GAMES AND WIN PRIZES' />
          <HomeCard
            href={allRoutes.EXPLORE_SPOTS}
            text='SEE THE BEST SPOTS AROUND YOU'
            animationDelay={0.05}
          />
          <HomeCard href={allRoutes.FEED} text='FEED' animationDelay={0.1} />
        </HomeInnerBlock>
      </HomeContainer>
    </>
  );
};

export default Home;

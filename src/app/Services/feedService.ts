import { FeedAdsParams } from "../Components/Feed/Feed";
import http from "./httpService";

const apiEndpoint = "/feed";

interface AdsParams extends FeedAdsParams {
  index?: number;
}

// =====|  Feed Service  |=====

const FeedService = {
  getFeedData: () => http.get(`${apiEndpoint}/`),
  getAdsForFeed: (params: AdsParams) =>
    http.post(`${apiEndpoint}/ads-for-feed`, params),
  getVideoAd: (params: AdsParams) =>
    http.post(`${apiEndpoint}/video-ad`, params),
  incrementAdViews: (id: string) =>
    http.patch(`${apiEndpoint}/increment-ad-views/${id}`),
};

// =====|  APIs  |=====

export const getFeedData = () => {
  return FeedService.getFeedData();
};

export const getAdsForFeed = (params: FeedAdsParams) => {
  const index = getAdIndex("osherAdIndex");
  return FeedService.getAdsForFeed({ ...params, index });
};

export const getVideoAd = (params: FeedAdsParams) => {
  const index = getAdIndex();
  return FeedService.getVideoAd({ ...params, index });
};

export const incrementAdViews = (id: string) => {
  return FeedService.incrementAdViews(id);
};

const getAdIndex = (key = "osherVideoIndex") => {
  const index = Number(localStorage.getItem(key) || "0");
  localStorage.setItem(key, (index + 1).toString());
  return index;
};

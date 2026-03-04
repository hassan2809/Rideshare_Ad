import bcrypt from "bcrypt";
import Ad from "../models/Ad.js";

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export function rotate(arr, index = 0) {
  if (!arr.length) return arr;
  const rotation = index % arr.length;
  return arr.slice(rotation).concat(arr.slice(0, rotation));
}

const getTimeSlot = (time) => {
  return time !== undefined
    ? time.toString().padStart(2, "0") + ":00" // e.g., 7 -> "07:00"
    : null;
};

export const getFilteredAdQuery = ({ adType, time, day, state }) => {
  const timeSlot = getTimeSlot(time);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const query = {
    adType,
    expiryDate: {
      $gte: today,
    },
  };

  if (timeSlot) query.timeSlots = timeSlot;
  if (day) query.days = day;
  if (state) query.states = state;

  return query;
};

export const fetchFormattedAds = async (query, index, sortingOrder = -1) => {
  const ads = await Ad.find(query)
    .sort({ _id: sortingOrder })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "brandId", select: "name picture" });

  const formattedAds = ads.map((ad) => formatAdData(ad));

  const rotatedAds = rotate(formattedAds, index);

  return rotatedAds;
};

export const formatPostData = (post) => ({
  ...post.toObject(),
  userName: post.userId?.name,
  userPicture: post.userId?.picture,
  userId: post.userId?._id,
});

export const formatAdData = (ad) => ({
  ...ad.toObject(),
  categoryName: ad.categoryId?.name,
  categoryId: ad.categoryId?._id,
  brandName: ad.brandId?.name,
  brandPicture: ad.brandId?.picture,
  brandId: ad.brandId?._id,
});

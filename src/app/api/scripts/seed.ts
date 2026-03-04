import mongoose from "mongoose";
import moment from "moment";
import User from "../models/User.js";
import Category from "../models/Category.js";
import Post from "../models/Post.js";
import Spot from "../models/Spot.js";
import Ad from "../models/Ad.js";
import { roles } from "../utils/enums.js";
import { hashPassword } from "../utils/utils.js";
import { connectDB } from "../startup/mongodb.js";

const categories = [
  { name: "Beauty", publishDate: moment().toJSON() },
  { name: "Entertainment", publishDate: moment().toJSON() },
  { name: "Food", publishDate: moment().toJSON() },
  { name: "Health", publishDate: moment().toJSON() },
  { name: "Electronics", publishDate: moment().toJSON() },
  { name: "Fashion", publishDate: moment().toJSON() },
  { name: "Sports", publishDate: moment().toJSON() },
  { name: "Gym", publishDate: moment().toJSON() },
];

const adminAndBrands = [
  {
    name: "Aqib",
    email: "aqib@live.com",
    password: "12345",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/profile-pictures/1740481464193_IMG_8771.PNG",
    phone: "12345",
    address: "Pakistan 🇵🇰",
    role: roles.ADMIN,
    publishDate: moment().toJSON(),
  },
  {
    name: "KFC",
    email: "kfc@live.com",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/profile-pictures/1740141856543_kfc.jpg.jpg",
    phone: "12345",
    password: "12345",
    address: "Pakistan 🇵🇰",
    role: roles.BRAND,
    publishDate: moment().toJSON(),
  },
  {
    name: "Subway",
    email: "subway@live.com",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/profile-pictures/1740163017206_Unknown.png",
    phone: "+1 (112) 999-9999",
    password: "12345",
    address: "NY, USA 🇺🇸",
    role: roles.BRAND,
    publishDate: moment().toJSON(),
  },
  {
    name: "McDonalds",
    email: "mc@live.com",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/profile-pictures/1740163359635_McDonalds-logo-cover.jpg",
    phone: "+44 1233 2332",
    password: "12345",
    address: "London, UK 🇬🇧",
    role: roles.BRAND,
    publishDate: moment().toJSON(),
  },
  {
    name: "Kriss",
    email: "kriss@live.com",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/profile-pictures/1745437493197_young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
    phone: "+1 123 1234 43",
    password: "12345",
    address: "NYC, USA 🇺🇸",
    role: roles.INFLUENCER,
    publishDate: moment().toJSON(),
  },
];

const posts = [
  {
    name: "New Shoes!!!",
    description:
      "Love these new shoes by Gucci!!! ✨👞❤️\r\n.\r\n.\r\n.\r\n#shoes #gucci #loafers",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/posts/1745437666307_eeae1e62fb8707bab11a27b17e23ba42.jpg",
  },
  {
    name: "My new favourite!",
    description:
      "Best shakes and sandwiches in our area! 🥤🥪\r\n.\r\n.\r\n.\r\n#Gucci #Shoes #Social Media App #OsherTv",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/posts/1745437888745_shake-shack-shake.max-825x550.jpg",
  },
  {
    name: "Best Burger!!!",
    description:
      "Best burger in Town by KFC. 🔥🐔🍔\r\n.\r\n.\r\n.\r\n.\r\n#burger #kfc #post #oshertv",
    picture:
      "https://storage.googleapis.com/beverix.appspot.com/posts/1745437028190_burger-with-cheese-2021-08-26-17.jpg",
  },
];

const spots = [
  {
    name: "Parc Montmorency",
    picture:
      "https://storage.googleapis.com/osher-tv.firebasestorage.app/spots/1748462743687_can.jpg",
    information:
      "Parc Montmorency gives you a great view of the Chateau Frontenac.",
    location: "Côte de la Montagne Streets, Québec City",
    phone: "",
  },
  {
    name: "Rue du Petit Champlain",
    picture:
      "https://storage.googleapis.com/osher-tv.firebasestorage.app/spots/1748462780292_can 2.jpg",
    information: "Rue du Petit Champlain is located in Quebec, Canada",
    location: "Rue du Petit Champlain, Quebec",
    phone: "",
  },
];

async function seed() {
  console.log("🌱 Seeding database...");
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clean database
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Post.deleteMany({}),
      Ad.deleteMany({}),
      Spot.deleteMany({}),
    ]);
    console.log("🧹 Cleared existing collections");

    // Hash passwords
    for (const user of adminAndBrands) {
      user.password = await hashPassword(user.password);
    }

    // Insert users
    const insertedUsers = await User.insertMany(adminAndBrands);

    const influencer = insertedUsers.find((u) => u.role === roles.INFLUENCER);
    if (!influencer) {
      throw new Error("No influencer found. Cannot assign userId to posts.");
    }

    const postsWithUserId = posts.map((post) => ({
      ...post,
      userId: influencer._id,
      publishDate: moment().toJSON(),
    }));

    await Promise.all([
      Spot.insertMany(spots),
      Category.insertMany(categories),
      Post.insertMany(postsWithUserId),
    ]);

    console.log("Seeding completed successfully ✅");
  } catch (error) {
    console.error("Error during seeding ❌", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB ✅");
  }
}

seed();

// // use this command for seeding: node src/app/api/scripts/seed.js

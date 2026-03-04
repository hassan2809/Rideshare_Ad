export const allRoutes = {
  HOME: "/",
  EXPLORE_SPOTS: "/explore-spots",
  NOT_FOUND: "/*",
  LOGIN: "/login",
  LOGOUT: "/logout",
  SIGN_UP: "/register",
  RESET_PASSWORD: "/reset-password/:userId?/:token?",
  VERIFY_EMAIL: "/auth/verify-email/:userId?/:token?",
  ACCOUNT_SETTINGS: "/account-settings",
  MY_PROFILE: "/my-profile",
  DASHBOARD: "/dashboard",
  FEED: "/feed",
  
  GAMES: "/games",
  TRIVIA_GAME: "/games/trivia",
  SUDOKU_GAME: "/games/sudoku",

  BRANDS: "/brands",
  VIEW_BRAND: "/brands/view/:id",
  EDIT_BRAND: "/brands/edit/:id",
  ADD_BRAND: "/brands/add",

  INFLUENCERS: "/influencers",
  VIEW_INFLUENCER: "/influencers/view/:id",
  EDIT_INFLUENCER: "/influencers/edit/:id",
  ADD_INFLUENCER: "/influencers/add",

  DRIVERS: "/drivers",
  VIEW_DRIVER: "/drivers/view/:id",
  EDIT_DRIVER: "/drivers/edit/:id",
  ADD_DRIVER: "/drivers/add",

  // TODO: add drivers on sidebar, duplicate influencers FE pages

  CATEGORIES: "/categories",

  ADS: "/ads",
  VIEW_AD: "/ads/view/:id",
  EDIT_AD: "/ads/edit/:id",
  ADD_AD: "/ads/add",

  POSTS: "/posts",
  VIEW_POST: "/posts/view/:id",
  EDIT_POST: "/posts/edit/:id",
  ADD_POST: "/posts/add",

  SPOTS: "/spots",
  VIEW_SPOT: "/spots/view/:id",
  EDIT_SPOT: "/spots/edit/:id",
  ADD_SPOT: "/spots/add",
};

export default {
  /* ---------------- App-State ----------------- */
  app: {
    appName: "SA-Commerce",
    appLogo: "http://localhost:3001/src/assets/images/logo/SACAsset 7@4x.png",
    appFavIcon:
      "http://localhost:3001/src/assets/images/logo/SACAsset 7@4x.png",
  },

  /* ------------ Notification-State ------------ */
  notification: {
    show: false,
    type: "" /* success,danger,info,warning */,
    message: "",
  },

  /* ---------------- User-State ---------------- */
  user: {
    token: sessionStorage.getItem("TOKEN"),
    data: {},
  },

  users: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null,
  },
  /* -------------- Products-State -------------- */
  products: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null,
  },

  /* ---------- Search-Products-State ----------- */
  searchProducts: {
    loading: false,
    data: [],
  },

  /* ------------ Cart-Items-State -------------- */
  cartItems: {
    loading: false,
    cartProducts: [],
    cartQuantities: [],
    total: null,
  },
  cartCount: {
    count: 0,
    loading: false,
  },

  /* -------------- Orders-State ---------------- */
  appOrders: {
    loading: false,
    data: [],
  },
  orders: {
    loading: false,
    data: [],
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null,
  },

  /* -------- Admin-Date-Options-State ---------- */
  dateOptions: [
    { key: "1d", text: "Last Day" },
    { key: "1k", text: "Last Week" },
    { key: "2k", text: "Last 2 Weeks" },
    { key: "1m", text: "Last Month" },
    { key: "3m", text: "Last 3 Months" },
    { key: "6m", text: "Last 6 Months" },
    { key: "all", text: "All Time" },
  ],
};

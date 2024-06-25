/* --------------------- User-Mutations --------------------- */
const setUsers = (state, [loading, data = null]) => {
  if (data) {
    state.users = {
      ...state.users,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.users.loading = loading;
};

const setUser = (state, user) => {
  state.user.data = user;
};

/* --------------------- Token-Mutations -------------------- */
const setToken = (state, token) => {
  state.user.token = token;

  if (token) {
    sessionStorage.setItem("TOKEN", token);
  } else {
    sessionStorage.removeItem("TOKEN");
  }
};

/* ----------------- Notification-Mutations ----------------- */
const notify = (state, { message, type }) => {
  state.notification.show = true;
  state.notification.type = type;
  state.notification.message = message;

  setTimeout(() => {
    state.notification.show = false;
  }, 3000);
};

/* ------------------- Products-Mutations ------------------- */
const setProducts = (state, [loading, data = null]) => {
  if (data) {
    state.products = {
      ...state.products,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.products.loading = loading;
};

/* --------------- Search-Products-Mutations ---------------- */
const setSearchProducts = (state, [loading, data = null]) => {
  if (data) {
    state.searchProducts.data = data.data;
  }
  state.searchProducts.loading = loading;
};

/* ----------------- Cart-Items-Mutations ------------------- */
const setCartItems = (
  state,
  [loading, cartProducts = null, cartQuantities = null, total = null]
) => {
  state.cartItems.cartProducts = cartProducts;
  state.cartItems.cartQuantities = cartQuantities;
  state.cartItems.total = total;
  state.cartItems.loading = loading;
};

/* ---------------- Admin-Orders-Mutations ------------------ */
const setOrders = (state, [loading, data = null]) => {
  if (data) {
    state.orders = {
      ...state.orders,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    };
  }
  state.orders.loading = loading;
};

/* -------------------- Export Functions -------------------- */
export {
  setUsers,
  setUser,
  setToken,
  notify,
  setProducts,
  setSearchProducts,
  setCartItems,
  setOrders,
};

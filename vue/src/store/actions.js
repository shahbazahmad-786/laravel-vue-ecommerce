import axiosClient from "../axios";

/* -------------------- Auth-Actions -------------------- */

/* Get-Admin-User */
const getAdminUser = ({ commit }, data) => {
  return axiosClient.get("/admin-user", data).then(({ data }) => {
    commit("setUser", data);
    return data;
  });
};

/* Get-Normal-User */
const getNormalUser = ({ commit }, data) => {
  return axiosClient.get("/normal-user", data).then(({ data }) => {
    commit("setUser", data);
    return data;
  });
};

/* Register */
const register = ({ commit }, data) => {
  return axiosClient.post("/register", data).then(({ data }) => {
    commit("setUser", data.user);
    commit("setToken", data.token);
    return data;
  });
};

/* Admin-Login */
const adminLogin = ({ commit }, data) => {
  return axiosClient.post("/admin-login", data).then(({ data }) => {
    commit("setUser", data.user);
    commit("setToken", data.token);
    return data;
  });
};

/* Normal-Login */
const login = ({ commit }, data) => {
  return axiosClient.post("/login", data).then(({ data }) => {
    commit("setUser", data.user);
    commit("setToken", data.token);
    return data;
  });
};

/* Logout */
const adminLogout = ({ commit }) => {
  return axiosClient.post("/admin-logout").then((response) => {
    commit("setToken", null);

    return response;
  });
};

/* Logout */
const logout = ({ commit }) => {
  return axiosClient.post("/logout").then((response) => {
    commit("setToken", null);

    return response;
  });
};

/* --------------------- Users-Actions --------------------- */
/* Get-All-Users */
const getUsers = (
  { commit, state },
  { url = null, search = "", per_page, sort_field, sort_direction } = {}
) => {
  commit("setUsers", [true]);
  url = url || "/users";
  const params = {
    per_page: state.users.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setUsers", [false, response.data]);
    })
    .catch(() => {
      commit("setUsers", [false]);
    });
};

/* Change-User-Roles */
const changeUserRole = ({ commit }, id) => {
  return axiosClient.put(`/users/${id}`);
};

/* Delete-User */
const deleteUser = ({ commit }, id) => {
  return axiosClient.delete(`/users/${id}`);
};

/* ------------------- Products-Actions ------------------- */
/* Get-App-Products */
const getAppProducts = (
  { commit, state },
  { url = null, per_page, sort_field, sort_direction } = {}
) => {
  commit("setProducts", [true]);
  const params = { per_page: state.products.limit };
  url = url || "/app-products";
  return axiosClient
    .get(url, {
      params: {
        ...params,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setProducts", [false, response.data]);
    })
    .catch(() => {
      commit("setProducts", [false]);
    });
};

/* Search-App-Products */
const searchAppProducts = ({ commit, state }, { search = "" } = {}) => {
  commit("setSearchProducts", [true]);
  return axiosClient
    .get("/search-products", {
      params: { search },
    })
    .then((response) => {
      commit("setSearchProducts", [false, response.data]);
    })
    .catch(() => {
      commit("setSearchProducts", [false]);
    });
};

/* Get-Product-Details */
const getProductDetails = ({ commit }, slug) => {
  return axiosClient.get(`/product-details/${slug}`);
};

/* Get-All-Products */
const getProducts = (
  { commit, state },
  { url = null, search = "", per_page, sort_field, sort_direction } = {}
) => {
  commit("setProducts", [true]);
  url = url || "/products";
  const params = { per_page: state.products.limit };

  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setProducts", [false, response.data]);
    })
    .catch(() => {
      commit("setProducts", [false]);
    });
};

/* Get-Single-Product */
const getProduct = ({ commit }, id) => {
  return axiosClient.get(`/products/${id}`);
};

/* Create-Product */
const createProduct = ({ commit }, product) => {
  if (product.image instanceof File) {
    const form = new FormData();
    form.append("title", product.title);
    form.append("image", product.image);
    form.append("description", product.description || "");
    form.append("published", product.published ? 1 : 0);
    form.append("price", product.price);
    product = form;
  }

  return axiosClient.post("/products", product);
};

/* Update-Product */
const updateProduct = ({ commit }, product) => {
  const id = product.id;
  if (product.image instanceof File) {
    const form = new FormData();
    form.append("id", product.id);
    form.append("title", product.title);
    form.append("image", product.image);
    form.append("description", product.description || "");
    form.append("published", product.published ? 1 : 0);
    form.append("price", product.price);
    form.append("_method", "PUT");
    product = form;
  } else {
    product._method = "PUT";
  }
  return axiosClient.post(`/products/${id}`, product);
};

/* Delete-Product */
const deleteProduct = ({ commit }, id) => {
  return axiosClient.delete(`/products/${id}`);
};

/* ------------------ CartItems-Actions ------------------- */
/* Get-CartItems */
const getCartItems = ({ commit }) => {
  commit("setCartItems", [true]);
  return axiosClient
    .get("/cart")
    .then(({ data }) => {
      commit("setCartItems", [
        false,
        data.cartProducts,
        data.cartQuantities,
        data.total,
      ]);
    })
    .catch(() => commit("setCartItems", [false]));
};

/* Add-to-Cart */
const addToCart = ({ commit, state }, cart) => {
  const form = new FormData();
  form.append("user_id", state.user.data.id);
  form.append("product_id", cart.product_id);
  form.append("quantity", cart.quantity);

  cart = form;
  return axiosClient.post("/cart/add", cart);
};

/* Update-to-Cart */
const updateToCart = ({ commit, state }, cart) => {
  const form = new FormData();
  form.append("user_id", state.user.data.id);
  form.append("product_id", cart.product_id);
  form.append("quantity", cart.quantity);

  cart = form;
  return axiosClient.post("/cart/update", cart);
};

/* Remove-to-Cart */
const removeToCart = ({ commit }, id) => {
  return axiosClient.delete(`/cart/remove/${id}`);
};

/* Cart-Count */
const cartCount = ({ state }) => {
  state.cartCount.loading = true;
  return axiosClient.get("/cart/count").then(({ data }) => {
    state.cartCount.count = data.cartCount;
    state.cartCount.loading = false;
  });
};

/* ------------------- Checkout-Actions ------------------- */
/* Checkout */
const checkout = () => {
  return axiosClient.post("/checkout");
};

/* -------------------- Orders-Actions -------------------- */
/* Get-App-Orders */
const getAppOrders = ({ state }) => {
  state.appOrders.loading = true;
  return axiosClient.get("/app-orders").then(({ data }) => {
    state.appOrders.loading = false;
    state.appOrders.data = data.orders;
  });
};

/* Order-Payment */
const orderPayment = ({ commit }, id) => {
  return axiosClient.put(`/app-orders/payment/${id}`);
};

/* Order-Details */
const orderDetails = ({ commit }, id) => {
  return axiosClient.get(`/app-orders/view/${id}`);
};

/* Get-Admin-Orders */
const getOrders = (
  { commit, state },
  { url = null, search = "", per_page, sort_field, sort_direction } = {}
) => {
  commit("setOrders", [true]);
  url = url || "/orders";
  const params = {
    per_page: state.orders.limit,
  };
  return axiosClient
    .get(url, {
      params: {
        ...params,
        search,
        per_page,
        sort_field,
        sort_direction,
      },
    })
    .then((response) => {
      commit("setOrders", [false, response.data]);
    })
    .catch(() => {
      commit("setOrders", [false]);
    });
};

/* Get-Admin-Single-Order */
const getOrder = ({ commit }, id) => {
  return axiosClient.get(`/orders/${id}`);
};

/* Get-Admin-Order-Statuses */
const getOrderStatuses = ({ commit }) => {
  return axiosClient.get(`/orders/statuses`);
};

/* Change-Admin-Order-Status */
const changeOrderStatus = ({ commit }, { orderId, status }) => {
  return axiosClient.post(`/orders/change-status/${orderId}/${status}`);
};

/* ------------------- Export Functions ------------------- */
export {
  getAdminUser,
  getNormalUser,
  register,
  adminLogin,
  login,
  adminLogout,
  logout,
  getUsers,
  changeUserRole,
  deleteUser,
  getAppProducts,
  searchAppProducts,
  getProductDetails,
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addToCart,
  updateToCart,
  getCartItems,
  removeToCart,
  cartCount,
  checkout,
  getAppOrders,
  orderPayment,
  orderDetails,
  getOrders,
  getOrder,
  getOrderStatuses,
  changeOrderStatus,
};

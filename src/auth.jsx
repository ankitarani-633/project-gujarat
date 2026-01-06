
// src/auth.js
export const auth = {
  isAuthenticated: () => !!localStorage.getItem("gmb_token"),
  login: (payload) => {
    // You can validate payload against your API here.
    localStorage.setItem("gmb_token", JSON.stringify(payload));
  },
  logout: () => localStorage.removeItem("gmb_token"),
  getUser: () => {
    try { return JSON.parse(localStorage.getItem("gmb_token")) || null; }
    catch { return null; }
  }
};
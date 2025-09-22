export const getToken = async () => {
  const token = await fetch("http://localhost:7000/api/token");
  const data = await token.json();
  localStorage.setItem("token", data.token);
};

export const fetchLogin = async (obj) => {
  const res = await fetch("http://localhost:7000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};

export const fetchOtp = async (obj) => {
  const resp = await fetch("http://localhost:7000/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return resp.json();
};

export const verifyOtp = async (obj) => {
  const res = await fetch("http://localhost:7000/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};

export const fetchProductDetails = async () => {
  const resp = await fetch("http://localhost:7000/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (resp.status === 401) {
    logout();
  }
  return resp.json();
};

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("phone");
  window.location.href = "/login";
}

export const checkLogin = async (obj) => {
  const res = await fetch("http://localhost:7000/api/checkLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};

export const verifyPassword = async (obj) => {
  const res = await fetch("http://localhost:7000/api/verifyPassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};
export const createUser = async (obj) => {
  const res = await fetch("http://localhost:7000/api/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};
export const fetchMyOrder = async (obj) => {
  const res = await fetch("http://localhost:7000/api/myOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  return res.json();
};
export const fetchOrders = async () => {
  const res = await fetch("http://localhost:7000/api/fetchOrder", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
export const updateOrderStatus = async (orderId, status) => {
  const res = await fetch("http://localhost:7000/api/updateOrderStatus", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderId, status }),
  });
  return await res.json();
};

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

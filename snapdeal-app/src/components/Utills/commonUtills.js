export const getToken = async () => {
  const token = await fetch("http://localhost:7000/api/token");
  const data = await token.json();
  localStorage.setItem("token", data.token);
};

export const fetchLogin = (obj) => {
  return fetch("http://localhost:7000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(obj),
  });
};

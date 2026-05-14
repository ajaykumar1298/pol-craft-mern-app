export const getUserDetails = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const setUserDetails = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserDetails = () => {
  localStorage.removeItem("user");
};

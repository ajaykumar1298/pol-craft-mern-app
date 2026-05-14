export const getUserDetails = () => {
  return JSON.parse(sessionStorage.getItem("user"));
};

export const setUserDetails = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const removeUserDetails = () => {
  sessionStorage.removeItem("user");
};

export const emailValidator = (email) => {
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  if (email === "") return false;
  if (!regexExp.test(email)) return false;

  return true;
};

export const passwordValidator = (password) => {
  if (password === "") return false;
  if (password.length < 6) return false;
  return true;
};

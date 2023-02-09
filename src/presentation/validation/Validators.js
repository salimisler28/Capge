export const emailValidator = (email) => {
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  if (email === "") return { result: false, message: "Mail cannot be empty" };
  if (!regexExp.test(email)) return { result: false, message: "Mail format is not correct" };

  return { result: true, message: null };
};

export const passwordValidator = (password) => {
  if (password === "") return { result: false, message: "Password cannot be empty" };
  if (password.length < 6) return { result: false, message: "Password should be at least 6 characters" };
  return { result: true, message: null };
};

export const passwordRepeatValidator = (password, passwordRepeat) => {
  if (password !== passwordRepeat) return { result: false, message: "Passwords don't match" };
  return { result: true, message: null };
};

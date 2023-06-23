export const emptyAlert = {
  visible: false,
  status: "",
  title: "",
  subtitle: "",
  key: 0,
};

export const badEmailAlert = {
  visible: true,
  status: "Error",
  title: "Invalid username",
  subtitle: "Enter a valid email format",
  key: Math.random(),
};

export const emptyFieldAlert = {
  visible: true,
  status: "Error",
  title: "Empty field",
  subtitle: "One or more fields are empty.",
  key: Math.random(),
};

export const failedForgotPassword = {
  visible: true,
  status: "Error",
  title: "Password reset error",
  subtitle: "Couldn't reset password. Please try again later",
  key: Math.random(),
};

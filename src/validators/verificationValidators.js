import {
  isAlpha,
  isEmail,
  isPassword,
  isEmpty,
  isNumeric,
} from "./validationUtilities";

export function validateVerificationData(verification) {
  const { username, code } = verification;
  let body = {
    error: false,
    status: "",
    title: "",
    subtitle: "",
  };

  body =
    (isEmpty(username) || isEmpty(code)) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Empty field",
          subtitle: "One or more fields are empty.",
          key: Math.random(),
        }
      : body;

  body =
    !isNumeric(code) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Incorrect code",
          subtitle: "Code should only contain numbers",
          key: Math.random(),
        }
      : body;

  return body;
}

export function validateVerificationResponse(response) {
  return response.status === 200;
}

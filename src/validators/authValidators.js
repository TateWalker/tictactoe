import { badEmailAlert, emptyFieldAlert } from "../data/alertData";
import { isAlpha, isEmail, isPassword, isEmpty } from "./validationUtilities";

/*
Pass in an object to validateRegistration with your registration info
Ex: {
     firstName: 'Tate',
     lastName: 'Walker,
     email: 'tate@upinapps.com,
     password: 'bananas',
     confirmPassword: 'bananas'
    }
*/

var defaultBody = {
  error: false,
  status: "",
  title: "",
  subtitle: "",
};

export function validateRegistrationData(registration) {
  const {
    first_name,
    last_name,
    email,
    password,
    confirmPassword,
  } = registration;

  let body = {
    error: false,
    status: "",
    title: "",
    subtitle: "",
  };

  body =
    (isEmpty(first_name) ||
      isEmpty(last_name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(confirmPassword)) &&
    body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Empty field",
          subtitle: "One or more fields are empty.",
          key: Math.random(),
        }
      : body;

  body =
    !isEmail(email) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Incorrect email",
          subtitle: "Enter a valid email format",
          key: Math.random(),
        }
      : body;

  body =
    !isPassword(password) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Invalid Password",
          subtitle: "Password must have more than 6 characters",
          key: Math.random(),
        }
      : body;

  body =
    password !== confirmPassword && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Invalid Password",
          subtitle: "Passwords do not match",
          key: Math.random(),
        }
      : body;
  return body;
}

export function validateRegistrationResponse(response) {
  return response.status === 200;
}
export function validateConfirmPasswordResponse(response) {
  return response.status === 200;
}

export function validateConfirmPasswordData(passwordData) {
  const { code, password, confirmPassword } = passwordData;

  let body = {
    error: false,
    status: "",
    title: "",
    subtitle: "",
  };

  body =
    (isEmpty(code) || isEmpty(password) || isEmpty(confirmPassword)) &&
    body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Empty field",
          subtitle: "One or more fields are empty.",
          key: Math.random(),
        }
      : body;

  body =
    !isPassword(password) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Invalid Password",
          subtitle: "Password must have more than 6 characters",
          key: Math.random(),
        }
      : body;

  body =
    password !== confirmPassword && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Invalid Password",
          subtitle: "Passwords do not match",
          key: Math.random(),
        }
      : body;

  return body;
}

export function validateLoginData(login) {
  const { username, password } = login;

  let body = {
    error: false,
    status: "",
    title: "",
    subtitle: "",
  };

  body =
    (isEmpty(username) || isEmpty(password)) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Empty field",
          subtitle: "One or more fields are empty.",
          key: Math.random(),
        }
      : body;

  body =
    !isEmail(username) && body.error === false
      ? {
          error: true,
          status: "Error",
          title: "Incorrect email",
          subtitle: "Enter a valid email format",
          key: Math.random(),
        }
      : body;
  return body;
}

export function validateLoginResponse(response) {
  return response.status === 200;
}

export function validateForgotPasswordData(forgotPasswordData) {
  const { username } = forgotPasswordData;
  let body = defaultBody;

  /* Could probably make this a function and map the data to isEmpty*/
  body = isEmpty(username) && body.error === false ? emptyFieldAlert : body;

  body = !isEmail(username) && body.error === false ? badEmailAlert : body;

  return body;
}

export function validateForgotPasswordResponse(response) {
  return response.status === 200;
}

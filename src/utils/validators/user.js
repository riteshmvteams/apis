const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const registerValidation = (name, email, password) => {
  let errors = {};

  if (name?.trim()?.length < 3) {
    errors.name = 'Name must be atleast 3 charatcters long';
  } else if (name?.trim()?.length > 20) {
    errors.name = 'Name should not longer than 20 characters';
  } else if (!validateEmail(email)) {
    errors.name = 'Email is Invalid';
  } else if (password?.trim()?.length < 6) {
    errors.password = 'Password must be atleast 6 charatcters long';
  } else {
    errors = {};
  }

  return errors;
};

export { registerValidation };

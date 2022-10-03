import R from 'ramda';

export const validateAdminName = adminName => {
  let valid = true;
  let message = 'adminName Valid';

  if (!R.match(/[a-zA-Z]/, adminName).length) {
    message = 'Invalid character used';
    valid = false;
  } else if (adminName.length < 4) {
    message = 'adminName must be at least four characters';
    valid = false;
  } else if (adminName.length > 20) {
    message = 'adminName must be 20 characters or less';
    valid = false;
  } else if (R.match(/[a-zA-Z]/g, adminName).length < 2) {
    message = 'adminName must include at least two letters';
    valid = false;
  }
  return { valid, message };
};

export const validateEmail = email => {
  let valid = true;
  let message = 'Email Valid';

  if (!R.match(/@/, email).length) {
    message = 'Email must contain @ symbol';
    valid = false;
  }
  return { valid, message };
};

export const validatePassword = (adminName, password) => {
  let valid = true;
  let message = 'Password valid';

  if (password.length < 6) {
    valid = false;
    message = 'Password must be at least six characters';
  } else if (password.length > 16) {
    valid = false;
    message = 'Password must be 16 characters or less';
  } else if (adminName === password) {
    valid = false;
    message = 'Admin Name and Password must be different';
  } else if (!R.match(/[0-9]/, password).length) {
    valid = false;
    message = 'Password must include at least one number';
  }

  return { valid, message };
};

export const validatePhoneNumber = (phoneNumber, password) => {
  let valid = true;
  let message = 'Phone Number valid';

  if (phoneNumber.length < 11) {
    valid = false;
    message = 'Phone Number is Invalid';
  } else if (phoneNumber.length > 11) {
    valid = false;
    message = 'Password must be 11 digits';
  } else if (password === phoneNumber) {
    valid = false;
    message = 'Phone Number and Password must be different';
  } else if (!R.match(/[0-9]/, password).length) {
    valid = false;
    message = 'Password must include at least 9 numbers';
  } else if (R.match(/[a-zA-Z]/g, phoneNumber).length) {
    message = 'Phone Numbers should not include letters';
    valid = false;
  }
  return { valid, message };
};

export const validateName = name => {
  if (name === '') {
    return true;
  }
  if (!R.match(/^[a-zA-ZÀ-ÿ'.\s]+$/, name).length) {
    return false;
  }
  if (name.length > 20) {
    return false;
  }
  return true;
};

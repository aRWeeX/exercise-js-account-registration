// Focus the input under the respective form > label > fieldset when clicking on the label.
const labelEls = document.querySelectorAll("form > label");

labelEls.forEach((el) => {
  el.addEventListener("click", () => {
    const input = el.querySelector("fieldset > input");
    input.focus();
  });
});

/* Enables or disables the "Submit" button based on the values of a collection of input fields.
   Ensures that the password is at least 8 characters long. */
const inputs = document.querySelectorAll("fieldset > input");
const submitBtn = document.querySelector(".submit-button");
const password = document.querySelector("input[name=password]");
const confirmPassword = document.querySelector("input[name=confirm-password]");
const form = document.querySelector("form");

function validatePassword() {
  if (password.value.length < 8) {
    password.classList.add("invalid");
    password.classList.remove("valid");
  } else {
    password.classList.add("valid");
    password.classList.remove("invalid");
  }
}

function validateConfirmPassword() {
  if (confirmPassword.value === password.value) {
    confirmPassword.classList.add("valid");
    confirmPassword.classList.remove("invalid");
  } else {
    confirmPassword.classList.add("invalid");
    confirmPassword.classList.remove("valid");
  }
}

function areInputsValid() {
  return (
    Array.from(inputs).every((input) => input.value.trim() !== "") &&
    password.value.length >= 8 &&
    confirmPassword.value === password.value
  );
}

function toggleSubmitButtonState() {
  const isDisabled = !areInputsValid();
  submitBtn.disabled = isDisabled;

  if (isDisabled) {
    submitBtn.classList.add("disabled");
  } else {
    submitBtn.classList.remove("disabled");
  }
}

function onDOMContentLoaded() {
  toggleSubmitButtonState();
  document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
}

function collectInputValues() {
  if (!areInputsValid()) {
    return null;
  }

  const inputData = {};

  inputs.forEach((input) => {
    const name = input.name;
    const value = input.value.trim();

    if (name) {
      inputData[name] = value;
    }
  });

  return inputData;
}

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input === password) {
      validatePassword();
    } else if (input === confirmPassword) {
      validateConfirmPassword();
    }

    toggleSubmitButtonState();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputData = collectInputValues();

  if (inputData) {
    console.log(inputData);
    form.reset();
  }

  toggleSubmitButtonState();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
} else {
  onDOMContentLoaded();
}

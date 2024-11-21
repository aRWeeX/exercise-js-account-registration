const labelEls = document.querySelectorAll("form > label");
const inputs = document.querySelectorAll("fieldset > input");
const submitBtn = document.querySelector(".submit-button");
const password = document.querySelector("input[name=password]");
const confirmPassword = document.querySelector("input[name=confirm-password]");
const form = document.querySelector("form");

// Focus the input field when clicking on the label.
labelEls.forEach((el) => {
  el.addEventListener("click", () => {
    const input = el.querySelector("fieldset > input");
    input.focus();
  });
});

// Password has to be at least 8 characters long.
function validatePassword() {
  if (password.value.length < 8) {
    password.classList.add("invalid");
    password.classList.remove("valid");
  } else {
    password.classList.add("valid");
    password.classList.remove("invalid");
  }
}

// Password and confirm password has to match.
function validateConfirmPassword() {
  if (confirmPassword.value === password.value) {
    confirmPassword.classList.add("valid");
    confirmPassword.classList.remove("invalid");
  } else {
    confirmPassword.classList.add("invalid");
    confirmPassword.classList.remove("valid");
  }
}

// Check that all input fields are filled in.
function areInputsValid() {
  return (
    Array.from(inputs).every((input) => input.value.trim() !== "") &&
    password.value.length >= 8 &&
    confirmPassword.value === password.value
  );
}

// Enable or disable the "Submit" button based on whether all input fields are filled.
function toggleSubmitButtonState() {
  const isDisabled = !areInputsValid();
  submitBtn.disabled = isDisabled;

  if (isDisabled) {
    submitBtn.classList.add("disabled");
  } else {
    submitBtn.classList.remove("disabled");
  }
}

// Remove the "DOMContentLoaded" event listener after use.
function onDOMContentLoaded() {
  toggleSubmitButtonState();
  document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
}

// Collect all the input fields' values and store them in an object.
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

// Add an "input" event listener to each input field.
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

// Add a "submit" event listener to the form.
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputData = collectInputValues();

  if (inputData) {
    console.log(inputData);
    form.reset();
  }

  toggleSubmitButtonState();
});

// Add a "DOMContentLoaded" event listener based on whether the DOM has loaded or not.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
} else {
  onDOMContentLoaded();
}

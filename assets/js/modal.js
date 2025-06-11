// this is for modal functionality

// JavaScript for form validation
const form = document.getElementById("registrationForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");

// Get the modal instances
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
const successModal = new bootstrap.Modal(
  document.getElementById("successModal")
);

// Function to clear invalid messages and styles
function clearInvalid(input, errorDivId) {
  input.classList.remove("is-invalid");
  document.getElementById(errorDivId).innerHTML = "";
}

// Add event listeners to clear invalid messages on input
[firstName, lastName, email].forEach((input) => {
  input.addEventListener("input", () =>
    clearInvalid(input, `${input.id}Error`)
  );
});

// Reset form when modal is hidden
document
  .getElementById("exampleModal")
  .addEventListener("hidden.bs.modal", function () {
    form.reset(); // Reset the form inputs
    form.classList.remove("was-validated"); // Remove the validation styles
    firstName.classList.remove("is-invalid"); // Remove invalid class from first name
    lastName.classList.remove("is-invalid"); // Remove invalid class from last name
    email.classList.remove("is-invalid"); // Remove invalid class from email
  });

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission for validation

  let isValid = true; // Form validity flag

  // Reset error messages
  document.getElementById("firstNameError").innerHTML = "";
  document.getElementById("lastNameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";

  // Regex patterns for only Georgian or only English
  const georgianPattern = /^[ა-ჰ]{2,}$/;
  const englishPattern = /^[A-Za-z]{2,}$/;

  // Validate first name
  let firstNameIsGeorgian = georgianPattern.test(firstName.value.trim());
  let firstNameIsEnglish = englishPattern.test(firstName.value.trim());

  if (firstName.value.trim() === "") {
    document.getElementById("firstNameError").innerHTML =
      "სახელის ველი ცარიელია";
    firstName.classList.add("is-invalid");
    firstName.classList.remove("is-valid");
    isValid = false;
  } else if (/\d/.test(firstName.value.trim())) {
    document.getElementById("firstNameError").innerHTML =
      "სახელი არ უნდა შეიცავდეს ციფრებს";
    firstName.classList.add("is-invalid");
    firstName.classList.remove("is-valid");
    isValid = false;
  } else if (!firstNameIsGeorgian && !firstNameIsEnglish) {
    document.getElementById("firstNameError").innerHTML =
      "სახელი უნდა იყოს მხოლოდ ქართულად ან მხოლოდ ინგლისურად და არ უნდა შეიცავდეს სიმბოლოებს";
    firstName.classList.add("is-invalid");
    firstName.classList.remove("is-valid");
    isValid = false;
  } else {
    firstName.classList.remove("is-invalid");
    firstName.classList.add("is-valid");
    document.getElementById("firstNameError").innerHTML = "";
  }

  // Validate last name
  let lastNameIsGeorgian = georgianPattern.test(lastName.value.trim());
  let lastNameIsEnglish = englishPattern.test(lastName.value.trim());

  if (lastName.value.trim() === "") {
    document.getElementById("lastNameError").innerHTML = "გვარის ველი ცარიელია";
    lastName.classList.add("is-invalid");
    lastName.classList.remove("is-valid");
    isValid = false;
  } else if (/\d/.test(lastName.value.trim())) {
    document.getElementById("lastNameError").innerHTML =
      "გვარი არ უნდა შეიცავდეს ციფრებს";
    lastName.classList.add("is-invalid");
    lastName.classList.remove("is-valid");
    isValid = false;
  } else if (!lastNameIsGeorgian && !lastNameIsEnglish) {
    document.getElementById("lastNameError").innerHTML =
      "გვარი უნდა იყოს მხოლოდ ქართულად ან მხოლოდ ინგლისურად და არ უნდა შეიცავდეს სიმბოლოებს";
    lastName.classList.add("is-invalid");
    lastName.classList.remove("is-valid");
    isValid = false;
  } else {
    lastName.classList.remove("is-invalid");
    lastName.classList.add("is-valid");
    document.getElementById("lastNameError").innerHTML = "";
  }

  // Cross-field validation: both must be same language
  if (
    firstName.value.trim() !== "" &&
    lastName.value.trim() !== "" &&
    (firstNameIsGeorgian || firstNameIsEnglish) &&
    (lastNameIsGeorgian || lastNameIsEnglish)
  ) {
    if (
      (firstNameIsGeorgian && !lastNameIsGeorgian) ||
      (firstNameIsEnglish && !lastNameIsEnglish)
    ) {
      document.getElementById("firstNameError").innerHTML =
        "სახელი და გვარი უნდა იყოს ერთ ენაზე";
      document.getElementById("lastNameError").innerHTML =
        "სახელი და გვარი უნდა იყოს ერთ ენაზე";
      firstName.classList.add("is-invalid");
      firstName.classList.remove("is-valid");
      lastName.classList.add("is-invalid");
      lastName.classList.remove("is-valid");
      isValid = false;
    }
  }

  if (email.value.trim() === "") {
    document.getElementById("emailError").innerHTML = "ელ-ფოსტის ველი ცარიელია";
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    isValid = false;
  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email.value.trim())
  ) {
    document.getElementById("emailError").innerHTML =
      "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა (მხოლოდ ინგლისური ასოები და ნებადართული სიმბოლოები)";
    email.classList.add("is-invalid");
    email.classList.remove("is-valid");
    isValid = false;
  } else {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
    document.getElementById("emailError").innerHTML = "";
  }

  // Reset form when modal is hidden
  document
    .getElementById("exampleModal")
    .addEventListener("hidden.bs.modal", function () {
      form.reset(); // Reset the form inputs
      form.classList.remove("was-validated"); // Remove the validation styles
      firstName.classList.remove("is-invalid", "is-valid"); // Remove both classes
      lastName.classList.remove("is-invalid", "is-valid");
      email.classList.remove("is-invalid", "is-valid");
      document.getElementById("firstNameError").innerHTML = "";
      document.getElementById("lastNameError").innerHTML = "";
      document.getElementById("emailError").innerHTML = "";
    });

  // If the form is valid, show success modal and close the registration modal
  if (isValid) {
    modal.hide(); // Close the registration modal

    // Delay showing the success modal to ensure smooth transition
    setTimeout(() => {
      successModal.show(); // Open the success modal

      // Remove padding-right and overflow styles from body and header
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
      document.querySelector("header").style.paddingRight = "";
      document.getElementById("successModalLabel").style.paddingRight = "";

      // Automatically close the success modal after 2.8 seconds
      setTimeout(() => {
        successModal.hide();
      }, 2800);
    }, 300); // Adjust the delay as needed
  }

  form.classList.add("was-validated"); // Mark the form as validated
});

// Remove padding-right and overflow styles when success modal is shown
document
  .getElementById("successModal")
  .addEventListener("shown.bs.modal", function () {
    setTimeout(() => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
      document.querySelector("header").style.paddingRight = "";
      document.getElementById("successModalLabel").style.paddingRight = "";
    }, 10); // Slight delay to ensure smooth transition
  });

// Remove padding-right and overflow styles when success modal is hidden
document
  .getElementById("successModal")
  .addEventListener("hidden.bs.modal", function () {
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
    document.querySelector("header").style.paddingRight = "";
    document.getElementById("successModalLabel").style.paddingRight = "";
  });

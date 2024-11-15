// this is for modal functionality

// JavaScript for form validation
const form = document.getElementById("registrationForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");

// Get the modal instance to be able to close it
const modal = new bootstrap.Modal(document.getElementById("exampleModal"));

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

  // Reset error messages
  document.getElementById("firstNameError").innerHTML = "";
  document.getElementById("lastNameError").innerHTML = "";
  document.getElementById("emailError").innerHTML = "";

  // Validate first name
  if (firstName.value === "") {
    document.getElementById("firstNameError").innerHTML =
      "სახელის ველი ცარიელია";
    firstName.classList.add("is-invalid");
  } else if (!/^[A-Za-zა-ჰ]+$/.test(firstName.value)) {
    document.getElementById("firstNameError").innerHTML =
      "სახელი არ უნდა შეიცავდეს ციფრებს";
    firstName.classList.add("is-invalid");
  } else {
    firstName.classList.remove("is-invalid");
  }

  // Validate last name
  if (lastName.value === "") {
    document.getElementById("lastNameError").innerHTML = "გვარის ველი ცარიელია";
    lastName.classList.add("is-invalid");
  } else if (!/^[A-Za-zა-ჰ]+$/.test(lastName.value)) {
    document.getElementById("lastNameError").innerHTML =
      "გვარი არ უნდა შეიცავდეს ციფრებს";
    lastName.classList.add("is-invalid");
  } else {
    lastName.classList.remove("is-invalid");
  }

  // Validate email
  if (email.value === "") {
    document.getElementById("emailError").innerHTML = "ელ-ფოსტის ველი ცარიელია";
    email.classList.add("is-invalid");
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    document.getElementById("emailError").innerHTML =
      "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა";
    email.classList.add("is-invalid");
  } else {
    email.classList.remove("is-invalid");
  }

  // If the form is valid, alert success and close the modal
  if (form.checkValidity()) {
    alert("Form submitted successfully!");

    // Close the modal using Bootstrap's modal API
    modal.hide();

    // You can handle the form submission here, like sending it to a server
  }

  form.classList.add("was-validated"); // Mark the form as validated
});

 document.addEventListener("DOMContentLoaded", function () {
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");
    const usernameField = document.getElementById("username");
    const dobField = document.getElementById("dob");
    const reviewBtn = document.getElementById("reviewBtn");

    // Function to validate passwords
    function validatePassword() {
        let password = passwordField.value;
        let confirmPassword = confirmPasswordField.value;
        let username = usernameField.value.toLowerCase();

        // Password complexity regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()-_+=\/><.,`~])[A-Za-z\d!@#%^&*()-_+=\/><.,`~]{8,30}$/;

        if (!password.match(passwordRegex)) {
            showError(passwordField, "Password must contain 8-30 characters, including an uppercase letter, a number, and a special character.");
            return false;
        } else if (password.toLowerCase().includes(username)) {
            showError(passwordField, "Password cannot contain your username.");
            return false;
        } else {
            clearError(passwordField);
        }

        if (password !== confirmPassword) {
            showError(confirmPasswordField, "Passwords do not match.");
            return false;
        } else {
            clearError(confirmPasswordField);
        }

        return true;
    }

    // Function to validate date of birth
    function validateDOB() {
        let dob = new Date(dobField.value);
        let today = new Date();
        let minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
        let maxAge = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (dob < minAge || dob > maxAge) {
            showError(dobField, "Date of birth must be within the last 120 years and not in the future.");
            return false;
        } else {
            clearError(dobField);
            return true;
        }
    }

    // Function to show error messages
    function showError(input, message) {
        let errorSpan = input.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
            errorSpan = document.createElement("span");
            errorSpan.classList.add("error-message");
            input.parentNode.appendChild(errorSpan);
        }
        errorSpan.textContent = message;
        input.style.border = "2px solid red";
    }

    // Function to clear error messages
    function clearError(input) {
        let errorSpan = input.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains("error-message")) {
            errorSpan.remove();
        }
        input.style.border = "1px solid #ccc";
    }

    // Event listeners for validation
    passwordField.addEventListener("input", validatePassword);
    confirmPasswordField.addEventListener("input", validatePassword);
    dobField.addEventListener("change", validateDOB);

    // Review button event listener
    reviewBtn.addEventListener("click", function () {
        if (validatePassword() && validateDOB()) {
            displayReview();
        }
    });

    // Function to display review section
    function displayReview() {
        let form = document.getElementById("registrationForm");
        let reviewSection = document.getElementById("reviewSection");

        let reviewHTML = "<h2>Review Your Information</h2>";
        reviewHTML += "<p><strong>Name:</strong> " + form.firstName.value + " " + form.middleInitial.value + " " + form.lastName.value + "</p>";
        reviewHTML += "<p><strong>Email:</strong> " + form.email.value + "</p>";
        reviewHTML += "<p><strong>Phone:</strong> " + form.phone.value + "</p>";
        reviewHTML += "<p><strong>Desired Salary:</strong> $" + document.getElementById("salary").value + "</p>";

        reviewSection.innerHTML = reviewHTML;
    }
});

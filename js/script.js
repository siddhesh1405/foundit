function validateForm() {
    const password = document.getElementById("pwd").value;
   
    const passwordError = document.getElementById("passwordError");
   
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (
      minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    ) {
      passwordError.textContent = ""; // Clear error message
      return true; // Allow form submission
    } else {
      passwordError.textContent =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
      return false; // Prevent form submission
    }
}

    function validatepass(){
        const conpassword = document.getElementById("conpwd").value;
        const password = document.getElementById("pwd").value;
        const confirmpasswordError = document.getElementById("confirmpasswordError");
        if (password != conpassword)
            {
              confirmpasswordError.textContent = "Password Doesn't Match";
              return false;
            }
            else{
              confirmpasswordError.textContent = "";
              return true;
            }
              
    }function validateForm() {
        const password = document.getElementById("pwd").value;
        const passwordError = document.getElementById("passwordError");
      
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
        if (
          minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumber &&
          hasSpecialChar
        ) {
          passwordError.textContent = ""; // Clear error message
          return true; // Allow form submission
        } else {
          passwordError.textContent =
            "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
          return false; // Prevent form submission
        }
      }
      
      function validatepass() {
        const conpassword = document.getElementById("conpwd").value;
        const password = document.getElementById("pwd").value;
        const confirmpasswordError = document.getElementById("confirmpasswordError");
        if (password !== conpassword) {
          confirmpasswordError.textContent = "Password Doesn't Match";
          return false;
        } else {
          confirmpasswordError.textContent = "";
          return true;
        }
      }
      
      function validateAll() {
        const isPasswordValid = validateForm();
        const isConfirmPasswordValid = validatepass();
      
        return isPasswordValid && isConfirmPasswordValid;
      }
      
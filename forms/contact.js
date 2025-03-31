document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading indicator and hide previous messages
    const loadingElem = document.querySelector(".loading");
    const errorElem = document.querySelector(".error-message");
    const sentElem = document.querySelector(".sent-message");
    loadingElem.style.display = "block";
    errorElem.style.display = "none";
    sentElem.style.display = "none";

    // Collect form values
    const name = document.getElementById("name-field").value;
    const email = document.getElementById("email-field").value;
    const subject = document.getElementById("subject-field").value;
    const message = document.getElementById("message-field").value;

    // Set up the payload according to the EmailJS REST API requirements
    const payload = {
      service_id: "service_x2qwmnm",      // Replace with your actual Service ID
      template_id: "template_f3n1eki",     // Replace with your actual Template ID
      user_id: "tAb4DNvFqKYllNBG_",      // Replace with your actual Public Key
      template_params: {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      },
    };

    // Make the POST request to EmailJS REST API
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("SUCCESS!", data);
        loadingElem.style.display = "none";
        sentElem.style.display = "block";
        form.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error);
        loadingElem.style.display = "none";
        errorElem.innerHTML = "There was an error sending your message. Please try again later.";
        errorElem.style.display = "block";
      });
  });
});

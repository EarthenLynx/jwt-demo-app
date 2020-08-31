$(document).ready(function () {
  $("#alert").hide();

  $("#signup-button").click(() => {
    const userName = $("#signup-user").val();
    const userPlaintextPassword = $("#signup-password").val();
    const userEmail = $("#signup-email").val();
    const userRole = $("#signup-role").val();

    const payload = { userName, userPlaintextPassword, userEmail, userRole };
    fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        $("#alert").show();
        $("#alert-text").html(data.msg);
      });
  });

  $("#login-button").click(() => {
    const userEmail = $("#login-user").val();
    const userPlaintextPassword = $("#login-password").val();

    const payload = { userEmail, userPlaintextPassword };

    fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        $("#alert").show();
        $("#alert-text").html(data.msg);
        if (data.token) {
          document.cookie = "htaccess=" + data.token;
          setTimeout(() => {
            // Just for the effect
            window.location = "/";
          }, 2000)
        }
      });
  });

  $("#home-delete-jwt-cookie").click(() => {
    document.cookie = "htaccess=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location = "/login";
  });

  $("#alert-close").click(() => $("#alert").hide());
  $("#toast-show").click(() => $("#toast").toast("show"));
});

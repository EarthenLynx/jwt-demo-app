$(document).ready(function () {
  $("#alert").hide();

  $("#signup-button").click(() => {
    const user = $("#signup-user").val();
    const password = $("#signup-password").val();
    const role = $("#signup-role").val();

    const payload = { user, password, role };
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
    const user = $("#login-user").val();
    const password = $("#login-password").val();

    const payload = { user, password };

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
          window.location = "/";
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

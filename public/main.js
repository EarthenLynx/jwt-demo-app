$(document).ready(function () {
  $("#alert").hide();

  $("#signup-button").click(() => {
    const user = $("#signup-user").val();
    const password = $("#signup-password").val();

    const payload = { user, password };
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
        if (data.token) document.cookie = "htaccess=" + data.token;
      });
  });

  $("#alert-close").click(() => $("#alert").hide());
});

(function () {
  var cfg = window.PETSISTER_CONFIG || {};
  var phone = String(cfg.WHATSAPP_E164 || "").replace(/\D/g, "");
  var text = cfg.MENSAGEM_PADRAO || "";
  var email = String(cfg.CONTACT_EMAIL || "").trim();

  function waUrl() {
    if (!phone) return "#contato";
    var u = "https://wa.me/" + phone;
    if (text) u += "?text=" + encodeURIComponent(text);
    return u;
  }

  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.setAttribute("href", waUrl());
    if (phone) {
      el.setAttribute("rel", "noopener noreferrer");
      el.setAttribute("target", "_blank");
    }
  });

  var emailLine = document.getElementById("footer-email-line");
  var emailLink = document.getElementById("footer-email");
  if (emailLine && emailLink && email) {
    emailLink.href = "mailto:" + email;
    emailLink.textContent = email;
    emailLine.hidden = false;
  }

  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }
})();

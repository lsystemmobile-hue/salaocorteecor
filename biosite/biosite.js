(function () {
  "use strict";

  const dialog = document.querySelector("#pix-dialog");
  const openButton = document.querySelector("[data-pix-open]");
  const closeButton = document.querySelector("[data-pix-close]");
  const copyButton = document.querySelector("[data-copy-pix]");
  const keyElement = document.querySelector("#pix-key");
  const statusElement = document.querySelector("#copy-status");
  const pixKey = "+5515997146833";
  let statusTimer = null;

  if (!dialog || !openButton || !closeButton) return;

  const closeDialog = function () {
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    document.body.classList.remove("biosite-dialog-open");
    openButton.focus();
  };

  openButton.addEventListener("click", function () {
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("biosite-dialog-open");
    closeButton.focus();
  });

  closeButton.addEventListener("click", closeDialog);
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", function () {
    document.body.classList.remove("biosite-dialog-open");
    openButton.focus();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dialog.hasAttribute("open") && typeof dialog.close !== "function") closeDialog();
  });

  const setStatus = function (message, isError) {
    if (!statusElement) return;
    window.clearTimeout(statusTimer);
    statusElement.textContent = message;
    statusElement.style.color = isError ? "#a43a3a" : "#23804a";
    statusTimer = window.setTimeout(function () {
      statusElement.textContent = "";
    }, 2600);
  };

  const fallbackCopy = function (value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (error) {
      copied = false;
    }
    textarea.remove();
    return copied;
  };

  if (copyButton && keyElement) {
    copyButton.addEventListener("click", async function () {
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(pixKey);
          copied = true;
        } catch (error) {
          copied = false;
        }
      }
      if (!copied) copied = fallbackCopy(pixKey);
      setStatus(copied ? "Chave Pix copiada." : "Não foi possível copiar. Toque e segure para copiar.", !copied);
    });
  }
})();

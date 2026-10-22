/* The WWPass login bundle inserts mobile controls into #qrcode asynchronously. */
(function () {
  'use strict';

  const qrCode = document.querySelector('.loginPage #qrcode');
  if (!qrCode) return;
  const qrContainer = qrCode.closest('.landingContent__code-container');

  // The shared login bundle replaces #qrtext on mobile. Keep this template's
  // wording and its existing Get started link in both QR states.
  const qrText = document.querySelector('.loginPage #qrtext');
  if (qrText) {
    const originalContent = Array.from(qrText.childNodes);

    function restoreQrText() {
      const currentContent = Array.from(qrText.childNodes);
      if (currentContent.length !== originalContent.length ||
          currentContent.some((node, index) => node !== originalContent[index])) {
        qrText.replaceChildren(...originalContent);
      }
    }

    new MutationObserver(restoreQrText).observe(qrText, { childList: true });
  }

  function updateMobileState() {
    const hasButtons = Boolean(qrCode.querySelector('.wwpassButtonContainer'));
    const hasQrSwitch = Boolean(qrCode.querySelector('#wwp_switch_to_button'));

    qrCode.classList.toggle('xmath-mobile-buttons', hasButtons);
    qrCode.classList.toggle('xmath-mobile-qr', !hasButtons && hasQrSwitch);
    qrContainer.classList.toggle('xmath-mobile-qr', !hasButtons && hasQrSwitch);
  }

  new MutationObserver(updateMobileState).observe(qrCode, {
    childList: true,
    subtree: true,
  });
  updateMobileState();
}());

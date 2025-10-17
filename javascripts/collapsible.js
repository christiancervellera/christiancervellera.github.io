// Smoothly animate details open/close by measuring scrollHeight.
// Attach this script at the bottom of <body> (before scale.fix.js or instead of if you prefer).
document.addEventListener('DOMContentLoaded', function () {
  const details = document.querySelectorAll('details.tab');

  details.forEach(d => {
    const content = d.querySelector('.collapsible-content');
    if (!content) return;

    // Set initial closed state
    if (!d.hasAttribute('open')) {
      content.style.maxHeight = '0px';
      content.style.overflow = 'hidden';
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.overflow = 'hidden';
    }

    d.addEventListener('toggle', function () {
      if (d.open) {
        // opening
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else {
        // closing: set to 0
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      }
    });

    // If content inner images/async content may change height, update maxHeight after images load
    const imgs = content.querySelectorAll('img');
    imgs.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', () => {
          if (d.open) content.style.maxHeight = content.scrollHeight + 'px';
        });
      }
    });
  });
});

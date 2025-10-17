// Smoothly animate details open/close by measuring scrollHeight.
// Attach this script at the bottom of <body>, before scale.fix.js or after — either is fine.
document.addEventListener('DOMContentLoaded', function () {
  const details = document.querySelectorAll('details.tab');

  details.forEach(d => {
    const content = d.querySelector('.collapsible-content');
    if (!content) return;

    // Initialize styles so CSS transition has a starting point
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease';

    if (d.hasAttribute('open')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
    } else {
      content.style.maxHeight = '0px';
      content.style.opacity = '0';
    }

    d.addEventListener('toggle', function () {
      if (d.open) {
        // opening
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';

        // after animation completes, remove max-height so the area can grow naturally
        window.setTimeout(() => {
          if (d.open) content.style.maxHeight = 'none';
        }, 360);
      } else {
        // closing: set fixed maxHeight (from current height) then to 0 to trigger transition
        // ensures smooth collapse even if maxHeight was 'none'
        content.style.maxHeight = content.scrollHeight + 'px';
        // force reflow
        void content.offsetHeight;
        content.style.maxHeight = '0px';
        content.style.opacity = '0';
      }
    });

    // Update max-height when images inside load (to keep animation correct)
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

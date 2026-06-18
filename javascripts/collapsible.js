// Keep native <details> behavior so content can grow naturally.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('details.tab .collapsible-content').forEach(function (content) {
    content.style.paddingTop = '8px';
  });
});

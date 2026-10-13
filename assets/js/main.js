document.documentElement.classList.add('js');
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#main-navigation');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    toggle.textContent = open ? 'Close ×' : 'Menu ☰';
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu ☰';
      document.querySelectorAll('details[open]').forEach(item => item.removeAttribute('open'));
    }
  });
}
const dateInput = document.querySelector('input[type="date"]');
function localDate() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
if (dateInput) dateInput.min = localDate();
document.querySelectorAll('form[data-demo]').forEach(form => {
  const button = form.querySelector('button[type="submit"]');
  button.disabled = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (dateInput && form.contains(dateInput)) {
      dateInput.min = localDate();
      dateInput.setCustomValidity(dateInput.value < dateInput.min ? 'Please choose today or a future date.' : '');
    }
    if (!form.reportValidity()) return;
    const status = form.querySelector('[role="status"]');
    status.textContent = form.dataset.demo === 'reservation'
      ? 'Demo complete! Your reservation form is valid. No table has been booked, and no information has been sent or saved.'
      : 'Demo complete! Your message form is valid. No message has been sent, and no information has been saved.';
    status.focus();
  });
  form.addEventListener('input', () => {
    form.querySelector('[role="status"]').textContent = '';
    if (dateInput) dateInput.setCustomValidity('');
  });
});

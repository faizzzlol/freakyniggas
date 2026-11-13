/* FN Squad legacy-site helper — archival maintenance.
   Sensitive Discord webhook credentials have been removed from current source.
   IMPORTANT: Previously exposed Discord webhooks MUST still be revoked in Discord,
   because Git history and caches may continue to contain the former credential.
   Never include secrets in client-side JavaScript.
*/
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('#theme-toggle');
  if (toggle) {
    let savedTheme = 'light';
    try { savedTheme = localStorage.getItem('theme') || 'light'; } catch (_) {}
    const theme = savedTheme === 'dark' ? 'dark' : 'light';
    document.body.classList.add(theme);
    toggle.checked = theme === 'dark';
    document.body.setAttribute('data-theme', theme);
    toggle.addEventListener('change', () => {
      const next = toggle.checked ? 'dark' : 'light';
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(next);
      document.body.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (_) {}
    });
  }

  const stars = document.querySelectorAll('#star-rating .star');
  const ratingInput = document.getElementById('rating');
  if (stars.length && ratingInput) {
    stars.forEach(star => star.addEventListener('click', () => {
      stars.forEach(item => item.classList.remove('selected'));
      star.classList.add('selected');
      ratingInput.value = star.getAttribute('data-value') || '';
    }));
  }

  const form = document.querySelector('#feedback-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || data.get('user-name') || 'Not provided').trim();
      const rating = String(data.get('rating') || 'Not provided').trim();
      const feedback = String(data.get('feedback') || '').trim();
      if (!feedback) { alert('Please write your feedback.'); return; }
      const body = 'Name: ' + name + '\nRating: ' + rating + '\n\nFeedback:\n' + feedback;
      window.location.href = 'mailto:fnsquadofficial@gmail.com?subject='
        + encodeURIComponent('FN Squad legacy website feedback')
        + '&body=' + encodeURIComponent(body);
      alert('An email draft should open. Feedback is only sent after you send the email yourself.');
    });
  }
});

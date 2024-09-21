// Theme Switcher Logic
const toggleSwitch = document.querySelector('#theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);
toggleSwitch.checked = currentTheme === 'dark';

toggleSwitch.addEventListener('change', () => {
    let theme = toggleSwitch.checked ? 'dark' : 'light';
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
});
        // Toggle theme function
        function toggleTheme() {
            const themeToggle = document.getElementById('theme-toggle');
            const isDarkMode = themeToggle.checked;

            if (isDarkMode) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        }

        // Load theme preference
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme');
            const themeToggle = document.getElementById('theme-toggle');

            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeToggle.checked = true;
            } else {
                document.body.setAttribute('data-theme', 'light');
                themeToggle.checked = false;
            }
        });

        // Star rating system
        const stars = document.querySelectorAll('#star-rating .star');
        const ratingInput = document.getElementById('rating');

        stars.forEach(star => {
            star.addEventListener('click', () => {
                stars.forEach(s => s.classList.remove('selected'));
                star.classList.add('selected');
                ratingInput.value = star.getAttribute('data-value');
            });
        });

        // Form submission with Discord embed
        document.getElementById('feedback-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const userName = document.getElementById('user-name').value;
            const rating = document.getElementById('rating').value;
            const feedback = document.getElementById('feedback').value;

            const embedPayload = {
                username: "Freaky Niggas - Feedback",
                embeds: [{
                    title: "New Feedback Received",
                    color: 3447003, // Discord embed color in hex
                    fields: [
                        {
                            name: "Name",
                            value: userName,
                            inline: true
                        },
                        {
                            name: "Rating",
                            value: `${rating} stars`,
                            inline: true
                        },
                        {
                            name: "Feedback",
                            value: feedback,
                            inline: false
                        }
                    ],
                    footer: {
                        text: "Feedback cannot be edited or deleted once submitted."
                    },
                    timestamp: new Date()
                }]
            };

            fetch('https://discord.com/api/webhooks/1286700191327453205/lGj-kz75VWmSIM4mvWjtjr8FBk8CLVVsr8hOcUnpxTnv9WTGLHnzLgiopZ7UZmPf_8q0', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(embedPayload)
            }).then(() => {
                alert('Thank you for your feedback! Note: You cannot edit or delete your feedback.');
                document.getElementById('feedback-form').reset();
            }).catch(error => {
                console.error('Error:', error);
                alert('There was an issue submitting your feedback.');
            });
        });

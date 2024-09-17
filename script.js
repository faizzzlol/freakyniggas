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

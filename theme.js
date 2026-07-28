(function () {
  const storageKey = 'color-theme';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (_error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_error) {
      // Ignore private browsing or storage-disabled environments.
    }
  }

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme(theme) {
    const useDark = theme === 'dark' || (!theme && prefersDark());
    root.classList.toggle('dark', useDark);
    root.classList.toggle('light', !useDark);
    root.style.colorScheme = useDark ? 'dark' : 'light';
  }

  applyTheme(getStoredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('theme-toggle')) {
      const enrollLink = document.querySelector('nav.glass-nav > div > a[href*="forms.gle"]');
      if (enrollLink) {
        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.type = 'button';
        toggle.className = 'theme-toggle p-2 text-slate-700 hover:text-primary transition-colors flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.innerHTML = '<span class="material-symbols-outlined hidden dark:block" data-icon="light_mode">light_mode</span><span class="material-symbols-outlined dark:hidden" data-icon="dark_mode">dark_mode</span>';
        enrollLink.parentNode.insertBefore(toggle, enrollLink);
      }
    }

    document.querySelectorAll('#theme-toggle, .theme-toggle').forEach(function (button) {
      if (button.dataset.themeBound === 'true') return;
      button.dataset.themeBound = 'true';
      button.setAttribute('aria-label', 'Toggle dark mode');
      button.addEventListener('click', function () {
        const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
        setStoredTheme(nextTheme);
        applyTheme(nextTheme);
      });
    });
  });
})();

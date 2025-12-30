const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var defaultTheme = prefersDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', defaultTheme);
      }
    } catch (e) {}
  })();
`;

export const ThemeScript = () => {
  return (
    <script
      id="theme-script"
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
};
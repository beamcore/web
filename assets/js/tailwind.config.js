tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#4648d4',
        surface: '#f7f9fb',
        'surface-bright': '#f7f9fb',
        'surface-container': '#eceef0',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f2f4f6',
        'on-surface': '#191c1e',
        'on-surface-variant': '#45464d',
        'on-primary': '#ffffff',
        'outline-variant': '#c6c6cd',
        'secondary-fixed': '#e1e0ff',
        'on-secondary-fixed': '#07006c'
      },
      fontFamily: {
        headline: ['Hanken Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        soft: '0 18px 56px rgba(15, 23, 42, 0.08)',
        panel: '0 24px 80px rgba(15, 23, 42, 0.06)'
      }
    }
  }
};

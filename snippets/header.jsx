// Use React from global scope (provided by Mintlify)
const { useState, useEffect } = React;

export const Header = ({
  to,
  children,
  centered,
  stroke,
  right,
  small,
  uppercase,
  light,
  ...props
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect initial dark mode
    const checkDarkMode = () => {
      // Priority: explicit class > media query
      if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
      } else if (document.documentElement.classList.contains('light')) {
        setIsDarkMode(false);
      } else {
        // Only use media query if no explicit class is set
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    checkDarkMode();

    // Listen for dark mode changes via media query
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e) => {
      if (!document.documentElement.classList.contains('dark') && !document.documentElement.classList.contains('light')) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

    // Listen for class changes on documentElement (Mintlify theme toggle)
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      observer.disconnect();
    };
  }, []);

  const headerStyles = {
    fontSize: small ? '20px' : '28px',
    fontWeight: '700',
    margin: '24px 0 16px 0',
    textAlign: centered ? 'center' : (right ? 'right' : 'left'),
    textTransform: uppercase ? 'uppercase' : 'none',
    letterSpacing: uppercase ? '1px' : 'normal',
    color: light
      ? (isDarkMode ? '#d1d5db' : '#9ca3af')
      : (isDarkMode ? '#f9fafb' : '#111827'),
    borderBottom: stroke ? (isDarkMode ? '2px solid #4b5563' : '2px solid #e5e7eb') : 'none',
    paddingBottom: stroke ? '12px' : '0',
    cursor: to ? 'pointer' : 'default',
    textDecoration: 'none',
    display: 'block',
    transition: 'color 0.2s ease',
  };

  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      window.location.href = to;
    }
  };

  if (to) {
    return (
      <a
        href={to}
        onClick={handleClick}
        style={headerStyles}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <div style={headerStyles} {...props}>
      {children}
    </div>
  );
};

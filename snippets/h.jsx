// Use React from global scope (provided by Mintlify)
const { useState, useEffect } = React;

export const H = ({ children, ...props }) => {
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

  const containerStyles = {
    border: isDarkMode ? '2px dashed #4b5563' : '2px dashed #d1d5db',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px 0',
  };

  return (
    <div style={containerStyles} {...props}>
      {children}
    </div>
  );
};

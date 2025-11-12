/*
To use just import the snippet and use the ProgressBar component like this:
<ProgressBar pages={["guides/docgen/index", "guides/docgen/docgen-getting-started", "guides/docgen/mark-template"]} />

Each page reflects a step in the progress bar. The pages are specified in the order they should appear in the progress bar.
*/



// Use React from global scope (provided by Mintlify)
const { useState, useEffect } = React;

// ProgressBar Component - Shows progress through a sequence of pages
export const ProgressBar = ({ pages = [], ...props }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detect dark mode - Mintlify uses 'dark' class on html element
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      console.log('ProgressBar - isDarkMode:', isDark);
      setIsDarkMode(isDark);
    };

    checkDarkMode();

    // Observe changes to the html element's class
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Detect current step from URL path
    if (pages.length > 0) {
      const currentPath = window.location.pathname;

      // Find which page in the array matches the current path
      const stepIndex = pages.findIndex(page => {
        // Remove leading slash if present in the page path
        const pagePath = page.startsWith('/') ? page : `/${page}`;
        return currentPath.endsWith(pagePath) || currentPath.includes(pagePath);
      });

      if (stepIndex !== -1) {
        setCurrentStep(stepIndex + 1); // +1 because steps are 1-indexed
      }
    }
  }, [pages]);

  // If no pages provided, don't render
  if (!pages || pages.length === 0) {
    return null;
  }

  const step = currentStep;
  const total = pages.length;

  console.log('ProgressBar - Rendering with isDarkMode:', isDarkMode);

  const progressBarContainerStyle = {
    width: '100%',
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const stepsContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0
  };

  const progressBarTrackStyle = {
    flex: 1,
    height: '22px',
    backgroundColor: 'rgba(169, 210, 244, 0.06)',
    border: isDarkMode ? '1px solid rgba(230, 241, 247, 0.67)' : '1px solid #e3ecf3',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative'
  };

  const progressBarFillStyle = {
    height: '100%',
    backgroundColor: 'rgba(113, 192, 248, 0.23)',
    width: `${(step / total) * 100}%`,
    transition: 'width 0.3s ease'
  };

  const getStepStyle = (stepNumber, isActive) => {
    // Dark mode styles
    if (isDarkMode) {
      return {
        width: '22px',
        height: '22px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '600',
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s ease',
        backgroundColor: isActive ? 'rgba(113, 192, 248, 0.23)' : 'transparent',
        color: isActive ? '#60a5fa' : '#a0aec0',
        border: isActive ? '1px solid #e3ecf3' : '1px solid #e0e6eb',
        cursor: 'pointer',
        textDecoration: 'none'
      };
    }

    // Light mode styles - active step
    if (isActive) {
      return {
        width: '22px',
        height: '22px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontWeight: '600',
        position: 'relative',
        zIndex: 1,
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(169, 210, 244, 0.32)',
        color: '#374151',
        border: '1px solid #e1eef8',
        cursor: 'pointer',
        textDecoration: 'none'
      };
    }

    // Inactive or completed steps in light mode (no special styling)
    return {
      width: '22px',
      height: '22px',
      borderRadius: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: '600',
      position: 'relative',
      zIndex: 1,
      transition: 'all 0.3s ease',
      backgroundColor: '#fbfbfb',
      color: '#9ca3af',
      border: '1px solid #e3ecf3',
      cursor: 'pointer',
      textDecoration: 'none'
    };
  };

  return (
    <div style={progressBarContainerStyle} {...props}>
      <div style={stepsContainerStyle}>
        {Array.from({ length: total }, (_, index) => {
          const stepNumber = index + 1;
          const pageIndex = index;
          const pagePath = pages[pageIndex];
          const fullPath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`;
          const isActive = stepNumber === step;

          return (
            <a
              key={stepNumber}
              href={fullPath}
              style={getStepStyle(stepNumber, isActive)}
            >
              {stepNumber}
            </a>
          );
        })}
      </div>
      <div style={progressBarTrackStyle}>
        <div style={progressBarFillStyle}></div>
      </div>
    </div>
  );
};

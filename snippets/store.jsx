// Use React from global scope (provided by Mintlify)
const { useState, useEffect } = React;

export const Store = ({
  id,
  children,
  placeholder,
  field,
  pattern,
  disabled,
  inline,
  obscured,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const storageKey = `com.box.developer.${id}`;

  useEffect(() => {
    // Detect initial dark mode
    const checkDarkMode = () => {
      if (document.documentElement.classList.contains('dark')) {
        setIsDarkMode(true);
      } else if (document.documentElement.classList.contains('light')) {
        setIsDarkMode(false);
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    checkDarkMode();

    // Listen for dark mode changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e) => {
      if (!document.documentElement.classList.contains('dark') && !document.documentElement.classList.contains('light')) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleMediaChange);

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

  useEffect(() => {
    // Function to load value from localStorage
    const loadFromStorage = () => {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          if (field) {
            // If field is specified, parse the object and get the field value
            try {
              const obj = JSON.parse(stored);
              const fieldValue = obj && obj[field] ? obj[field] : '';
              setValue(fieldValue);
            } catch (e) {
              // If parsing fails, initialize empty object
              localStorage.setItem(storageKey, JSON.stringify({}));
              setValue('');
            }
          } else {
            setValue(stored);
          }
        } else {
          if (field) {
            // Initialize with empty object if field is specified
            localStorage.setItem(storageKey, JSON.stringify({}));
          }
          setValue('');
        }
      } catch (e) {
        console.error('Error loading from localStorage:', e);
        setValue('');
      }
    };

    // Load initial value
    loadFromStorage();

    // Poll for changes every 500ms
    const interval = setInterval(() => {
      loadFromStorage();
    }, 500);

    return () => clearInterval(interval);
  }, [id, field, storageKey]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Save to localStorage
    try {
      if (field) {
        // If field is specified, update the field in the object
        const stored = localStorage.getItem(storageKey);
        let obj = {};
        if (stored) {
          try {
            obj = JSON.parse(stored);
          } catch (e) {
            obj = {};
          }
        }
        obj[field] = newValue;
        localStorage.setItem(storageKey, JSON.stringify(obj));
      } else {
        localStorage.setItem(storageKey, newValue);
      }
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const getDisplayValue = () => {
    if (obscured && value && !isHovered) {
      return '•'.repeat(value.length);
    }
    return value;
  };

  const hasValue = value && value.length > 0;

  const isValid = () => {
    if (!hasValue) return true; // Empty is considered valid (no validation needed)
    if (pattern) {
      const regex = new RegExp(pattern);
      return regex.test(value);
    }
    return true; // If no pattern, always valid
  };

  const isValidValue = isValid();

  const containerStyles = {
    display: 'block',
    fontSize: '14px',
    marginBottom: inline ? '0.5rem' : '1rem',
    position: 'relative',
    zIndex: 2,
  };

  const labelStyles = {
    border: inline ? (isDarkMode ? '1px dashed #4b5563' : '1px dashed #dde6ed') : 'none',
    borderRight: inline ? 'none' : undefined,
    display: inline ? 'inline-block' : 'block',
    height: inline ? '2.5em' : 'auto',
    padding: inline ? '0.3333333333rem 0.5rem' : '0 0 0.3333333333rem 0',
    textAlign: inline ? 'right' : 'left',
    verticalAlign: inline ? 'top' : undefined,
    width: inline ? '200px' : '100%',
    fontSize: '14px',
    fontWeight: '500',
    color: isDarkMode ? '#f9fafb' : '#374151',
    margin: 0,
    boxSizing: 'border-box',
  };

  // Determine border and color based on state
  const getBorderColor = () => {
    if (disabled) {
      return isDarkMode ? '1px dashed #4b5563' : '1px dashed #dde6ed';
    }
    if (isValidValue && hasValue) {
      return '1px solid #2e8540'; // Green for valid value
    }
    if (!isValidValue && hasValue) {
      return '1px solid #e31c3d'; // Red for invalid value
    }
    // Empty and not disabled = normal solid border
    return isDarkMode ? '1px solid #4b5563' : '1px solid #d1d5db';
  };

  const getTextColor = () => {
    if (disabled) {
      return isDarkMode ? '#9ca3af' : '#607079';
    }
    if (isValidValue && hasValue) {
      return '#2e8540'; // Green for valid value
    }
    if (!isValidValue && hasValue) {
      return '#e31c3d'; // Red for invalid value
    }
    return isDarkMode ? '#f9fafb' : '#111827';
  };

  const getBackgroundColor = () => {
    if (!isValidValue && hasValue) {
      return isDarkMode ? 'rgba(227, 28, 61, 0.1)' : 'rgba(255, 255, 255, 0.2)';
    }
    return isDarkMode ? '#1f2937' : '#fff';
  };

  const inputStyles = {
    display: inline ? 'inline-block' : 'block',
    verticalAlign: inline ? 'top' : undefined,
    width: inline ? 'calc(100% - 200px)' : '100%',
    fontFamily: 'courier new, courier, monospace',
    height: '2.5em',
    margin: 0,
    padding: '0.3333333333rem 0.5rem',
    backgroundColor: getBackgroundColor(),
    border: getBorderColor(),
    color: getTextColor(),
    outline: 'none',
    boxSizing: 'border-box',
  };

  const iconContainerStyles = {
    position: 'absolute',
    right: inline ? '0.7em' : '1em',
    top: inline ? '0.6rem' : '1.8em',
    display: obscured && value ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 10,
  };

  return (
    <span
      style={containerStyles}
      data-obscured={obscured || false}
      data-disabled={disabled || false}
      data-inline={inline || false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children && <label style={labelStyles}>{children}</label>}
      {obscured && value && (
        <div style={iconContainerStyles}>
          <Icon icon={isHovered ? 'eye-slash' : 'eye'} size={16} />
        </div>
      )}
      <input
        type="text"
        value={getDisplayValue()}
        onChange={handleChange}
        placeholder={placeholder}
        pattern={pattern}
        disabled={disabled}
        data-valid={isValidValue}
        data-has-value={hasValue ? 'true' : ''}
        style={inputStyles}
      />
    </span>
  );
};

export const ResetButton = ({ id, children = "Clear credentials", ...props }) => {
  const [isCleared, setIsCleared] = useState(false);

  // Clear data from localStorage
  const clearLocalStorageData = () => {
    const keysToRemove = [];

    try {
      if (id) {
        // If id is provided, clear only those prefixes
        const ids = id.split(",").map((key) => key.trim());

        ids.forEach((idPrefix) => {
          const prefix = `com.box.developer.${idPrefix}`;
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(prefix)) {
              keysToRemove.push(key);
            }
          }
        });
      } else {
        // If no id, clear all com.box.developer. keys
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("com.box.developer.")) {
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("ResetButton: Error clearing localStorage:", error);
    }
  };

  // TODO: This function will be commented out after testing
  const clearCookiesData = () => {
    if (!id) return;

    const keys = id.split(",").map((key) => key.trim());

    keys.forEach((key) => {
      try {
        // Set cookie with past expiration date to delete it
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        // console.log(`ResetButton: Cleared cookie: ${key}`);
      } catch (error) {
        // console.error(`ResetButton: Error clearing cookie ${key}:`, error);
      }
    });
  };

  // Main function to clear all data (localStorage + cookies)
  const clearAllData = () => {
    clearLocalStorageData();
    // TODO: This function will be commented out after testing
    clearCookiesData();

    // Update state to show cleared state
    setIsCleared(true);
    setHasValues(false);

    // Reset to default after 2 seconds
    setTimeout(() => {
      setIsCleared(false);
    }, 2000);
  };

  const handleClick = () => {
    clearAllData();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="flex justify-center my-6">
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={children}
        className={`flex items-center gap-3 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 outline-none cursor-pointer ${
          isCleared
            ? "bg-green-600 hover:bg-green-700 text-white shadow-md"
            : "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
        }`}
        {...props}
      >
        {isCleared ? (
          <>
            <Icon icon="circle-check" color="#ffffff" />
            {/* <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg> */}
            <span>{children}</span>
          </>
        ) : (
          <>
            <Icon icon="shield" color="#ffffff" />
            {/* <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg> */}
            <span>{children}</span>
          </>
        )}
      </button>
    </div>
  );
};

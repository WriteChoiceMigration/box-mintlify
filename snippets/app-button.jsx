// Use React from global scope (provided by Mintlify)
const { useState } = React;

// AppButton Component - Button that opens a modal for app creation
export const AppButton = ({ children, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    // Placeholder for login functionality
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="my-3 inline-flex items-center h-8 bg-[#0a1929] dark:bg-[#1a2332] text-white rounded border-none cursor-pointer text-base font-medium transition-all overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:bg-[#0d2136] dark:hover:bg-[#243447]"
        onClick={handleOpenModal}
        {...props}
      >
        <div className="px-4 flex items-center h-full">{children || "Create an app"}</div>
        <div className="w-px h-full bg-white/20"></div>
        <div className="px-3 flex items-center justify-center text-lg font-light h-full">+</div>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-52"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white dark:bg-[#0E0E10] rounded shadow-lg p-8 w-full max-w-sm min-h-52 relative flex flex-col text-gray-950 dark:text-gray-100 border border-gray-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <h2 className="text-base font-normal tracking-tighter leading-tight mt-0">Create an app</h2>
              <button
                className="bg-none border-none text-xs cursor-pointer text-blue-600 dark:text-blue-400 p-0 leading-none transition-opacity duration-200 font-normal hover:opacity-70"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                close
              </button>
            </div>

            <p className="text-xs leading-6 text-gray-600 dark:text-gray-400 font-normal mb-6 flex-1">
              Let us take care of the hard parts for you. Before we can create an app for you we will need you to log
              in.
            </p>

            <div className="flex justify-end">
              <button
                className="bg-[#0a1929] dark:bg-[#0a1929] text-white rounded border-none p-2.5 text-base font-medium cursor-pointer inline-flex items-center gap-2 transition-all h-8 hover:bg-[#0d2136] dark:hover:bg-[#0d2136]"
                onClick={handleLogin}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

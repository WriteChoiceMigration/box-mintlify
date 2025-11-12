const { useState } = React;

const Postman = ({ env = null, anonymous = false, ...props }) => {
  const [showModal, setShowModal] = useState(false);
  const [showImportingModal, setShowImportingModal] = useState(false);

  // Determine which Postman URL to use based on props
  const collectionId = "8119550-b5ea2aeb-c82a-425d-baff-ed5dfd1d7659";
  const workspaceId = "1a5945ff-a292-42c7-91c5-2cf3cdc68492";
  const referrer = "https%3A%2F%2Fdeveloper.box.com%2Fguides%2Ftooling%2Fpostman%2F%23latest-collection";

  const forkUrl = `https://elements.getpostman.com/view/fork?collection=${collectionId}&workspaceId=${workspaceId}&referrer=${referrer}`;
  const importUrl = `https://www.postman.com/collections/${collectionId}`;

  const handleForkCollection = () => {
    // Open Postman fork URL
    window.open(forkUrl, "_blank");
    setShowModal(false);
  };

  const handleImportCollection = () => {
    // Show importing modal only
    setShowImportingModal(true);
    setShowModal(false);
  };

  return (
    <>
      {/* Run in Postman Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full px-8 py-4 my-4 text-lg font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors flex justify-between items-center"
        {...props}
      >
        Run in Postman
        <span className="text-2xl">›</span>
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowModal(false)}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-2xl mx-4 p-10 bg-white dark:bg-[#0E0E10] rounded-xl shadow-2xl border border-gray-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              title="Close"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-0">Fork collection into your workspace</h2>

            {/* Content */}
            <div className="mb-8">
              <ul className="mb-6 space-y-4 list-none">
                <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex">
                  <span>Work in your own workspace or with your team</span>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex">
                  <span>Stay up to date with the latest changes to the source collection</span>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex">
                  <span>Contribute to the source collection through pull requests</span>
                </li>
              </ul>

              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <a
                  href={`https://elements.getpostman.com/redirect?entityId=default&entityType=collection&workspaceId=1a5945ff-a292-42c7-91c5-2cf3cdc68492`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View collection
                </a>{" "}
                in the workspace first if you'd like to.
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                You can{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImportCollection();
                  }}
                >
                  import a copy
                </a>{" "}
                of the collection too.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-slate-800 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleForkCollection}
                className="px-6 py-2.5 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Fork Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Importing Collection Modal */}
      {showImportingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowImportingModal(false)}
        >
          <div
            className="relative w-full max-w-md mx-4 p-8 bg-white dark:bg-[#0E0E10] rounded-xl shadow-2xl border border-gray-200 dark:border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowImportingModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
              title="Close"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100 mt-0">Importing collection...</h2>

            {/* Content */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Your Postman desktop app should launch now and start importing the collection.
              </p>
              <br />
              <br />
              <p className="text-sm text-black dark:text-gray-300">
                Don't have the Postman desktop app?{" "}
                <a
                  href="https://www.postman.com/downloads/"
                  target="_blank"
                  className="text-orange-600 dark:text-orange-500"
                  rel="noopener noreferrer"
                >
                  Download Desktop App ↗
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Postman };

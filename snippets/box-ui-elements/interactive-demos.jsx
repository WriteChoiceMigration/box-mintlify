export const InteractiveDemos = () => {
  const [activeDemo, setActiveDemo] = useState("explorer");

  const demos = {
    explorer: {
      title: "Content Explorer",
      description:
        "Embed a folder view of content stored in Box in your web applications. Allow users to navigate through the folder hierarchy and rename, delete, or share files.",
      iframeUrl: "https://codepen.io/box-platform/embed/wdWWdN?default-tab=result",
    },
    picker: {
      title: "Content Picker",
      description: "Add support for selecting Box files and folders in your web applications.",
      iframeUrl: "https://codepen.io/box-platform/embed/PWPxBm?default-tab=result",
    },
    preview: {
      title: "Content Preview",
      description: "Embed high quality and interactive previews of over 120 file types.",
      iframeUrl: "https://codepen.io/box-platform/embed/rmZdjm?default-tab=result",
    },
    previewSidebar: {
      title: "Content Preview with Sidebar",
      description:
        "Implement viewing file-related activity, metadata, and details including versions, comments, and tasks.",
      iframeUrl: "https://codepen.io/box-platform/embed/pqBMgM?default-tab=result",
    },
  };

  const demoKeys = Object.keys(demos);
  const currentDemo = demos[activeDemo];

  return (
    <section className="max-w-[1400px] mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Interactive Demos</h2>
      <p className="text-gray-600 dark:text-gray-400 !mb-8">
        Box UI Elements are available both as React components and framework-agnostic JavaScript libraries.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-screen lg:h-auto mt-4">
        {/* Cards List */}
        <div className="flex flex-col gap-4 justify-between">
          {demoKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`p-4 rounded-lg cursor-pointer transition-all text-left ${
                activeDemo === key
                  ? "border border-blue-500 dark:bg-gray-900"
                  : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-blue-500 dark:hover:border-blue-500"
              }`}
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{demos[key].title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{demos[key].description}</p>
            </button>
          ))}
        </div>

        {/* CodePen Iframe */}
        <div className="lg:col-span-3 h-full lg:h-[605px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <iframe
            title={`${currentDemo.title} Demo`}
            src={currentDemo.iframeUrl}
            height="605"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

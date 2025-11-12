const YouTube = ({
  id,
  title = 'YouTube video player',
  width = '100%',
  height = '400',
  ...props
}) => {
  if (!id) {
    return (
      <div style={{
        border: '2px solid #ff4444',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#fff5f5',
        color: '#cc0000'
      }}>
        <h4>⚠️ YouTube Error</h4>
        <p>Missing required prop: <code>id</code></p>
        <p>Usage: &lt;YouTube id="whxT3Bdx3E0" /&gt;</p>
      </div>
    );
  }

  return (
    <iframe
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id}`}
      title={title}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      style={{
        borderRadius: '8px',
        marginBlock: '1rem'
      }}
      {...props}
    />
  );
};

export { YouTube };

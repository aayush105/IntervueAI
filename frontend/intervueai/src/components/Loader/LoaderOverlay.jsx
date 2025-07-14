const LoaderOverlay = () => {
  return (
    <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-30">
      <div className="w-10 h-10 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoaderOverlay;

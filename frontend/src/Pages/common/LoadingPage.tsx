type Props = {
  message?: string;
  className?: string
};
function LoadingPage({ message, className}: Props) {
  return (
    <div className="flex flex-col gap-3 flex-1 items-center justify-center">
      <div className={`h-10 w-10 border-3 rounded-full border-gray-300 border-t-blue-600 animate-spin ${className}`}></div>
      {message && message}
    </div>
  );
}

export default LoadingPage;

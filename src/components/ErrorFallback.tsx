const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="h-screen flex justify-center items-center p-10 space-y-4">
      <p className="text-xl text-center p-4">Something went wrong 🤔.</p>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again !</button>
    </div>
  );
};

export default ErrorFallback;

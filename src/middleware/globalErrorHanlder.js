const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode || 500;
  const stack = err?.stack || '';
  const message = err?.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
    error: stack
  });
};

export default globalErrorHandler;

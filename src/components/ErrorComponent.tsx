import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export const ErrorComponent = () => {
  const error = useRouteError();
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText} ${error.error?.message}`
  } else if (error instanceof Error) {
    errorMessage = `${error.name} ${error.message}`
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="error">
      <p>Error:</p>
      <p>{errorMessage}</p>
    </div>
  );
};

import { Button, Result } from "antd";
import { useNavigate, useRouteError } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  let title = "An Error occurred!";
  let message = "Something went wrong!";
  let status: "404" | "500" | "error" = "error";

  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    const status = error.status as number;

    if (status === 500) {
      message = (error as { message?: string }).message ?? message;
    }

    if (status === 404) {
      title = "Sorry, this page isn't available";
      message =
        "The link you followed may be broken, or the page may have been removed.";
    }
  }

  function handleNavigate() {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col  items-center justify-center gap-4 max-w-[400px] w-full mx-auto p-4">
      <Result
        status={status}
        title={title}
        subTitle={message}
        extra={
          <Button type="primary" onClick={handleNavigate}>
            Back Home
          </Button>
        }
      />
    </div>
  );
}

export default ErrorPage;

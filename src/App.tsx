import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import type { RootState } from "./store";
import { RouterProvider } from "react-router/dom";
import { router } from "./components/routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./constants/query-client.constants";
import { handleTokenExpiry } from "./util/token-expiry-handler";

function App() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  useEffect(() => {
    if (accessToken) {
      handleTokenExpiry(accessToken);
    }
  }, [accessToken]);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#8A38F5",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

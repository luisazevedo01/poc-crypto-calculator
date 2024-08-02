import { createBrowserRouter } from "react-router-dom";
import GeneralError from "./pages/errors/general-error";
import NotFoundError from "./pages/errors/not-found-error";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    lazy: async () => ({
      Component: (await import("./pages/app")).default,
    }),
    errorElement: <GeneralError/>
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "*", Component: NotFoundError },
]);

export default router;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WeatherQuery from "../pages/WeatherQuery";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/WeatherQuery/:cityName",
        element: <WeatherQuery />,
      },
    ],

    errorElement: <h1 className="text-center">404 Not Found</h1>,
  },
]);

export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

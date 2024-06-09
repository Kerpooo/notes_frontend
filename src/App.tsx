import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import NotesPage from "./routes/notes";
import MainLayout from "./layout/main_layout";
import Home from "./routes/home";
import { SingleNote } from "./components/Note";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "/notes",
        element: <NotesPage />,
        children: [{ path: "/notes/:id", element: <SingleNote /> }],
      },
    ],
  },
]);

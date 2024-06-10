import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/main_layout";

// Routes
import Home from "./routes/home";
import Notes from "./routes/notes";

// Pages
import ErrorPage from "./pages/error-page";
import Note from "./pages/note-page";
import NotesPage from "./pages/notes-page";
import AddNote from "./pages/add-note-page";
import CategoriesPage from "./pages/categories-page";
import Categories from "./routes/categories";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "notes",
        element: <Notes />,
        children: [
          { index: true, element: <NotesPage /> },
          { path: ":id", element: <Note /> },
          { path: "add", element: <AddNote /> },
        ],
      },
      {
        path: "categories",
        element: <Categories />,
        children: [
          { index: true, element: <CategoriesPage /> },
          { path: ":id", element: <Note /> },
          { path: "add", element: <AddNote /> },
        ],
      },
    ],
  },
]);

import { useEffect, useState, FormEvent } from "react";
import MultiSelectDropdown from "../components/MultiSelect";
import useCategories from "../hooks/useCategories";
import { useParams, useNavigate } from "react-router-dom";

export default function EditNote() {
  const { id } = useParams<{ id: string }>();
  const { categoriesList } = useCategories();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setSelectedCategories(
            data.categories.map((category: { id: string }) => category.id)
          );
          setActive(data.active);
        } else {
          console.error("Failed to fetch note");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Note deleted successfully");
        // Activar redirección
        navigate(-1);
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = {
      title,
      content,
      active,
      categories: selectedCategories.map((id) => ({ id })),

      userId: "clx6g11k10000s61uzosgo7nv",
    };

    console.log(note);
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Note updated:", data);
        // Activar redirección
        navigate(-1);
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleActive = () => {
    setActive(!active);
  };

  if (loading) {
    return (
      <p className="h-screen flex items-center justify-center text-gray-900 text-2xl title-font font-bold text-center">
        Loading...
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-gray-900 text-4xl title-font font-bold text-center my-3">
        Edit Note
      </h1>
      <button
        className="bg-gray-200 p-2 rounded-md w-max font-bold my-2"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full bg-gray-700 rounded-lg border border-gray-200">
          <div className="flex justify-end items-center py-2 px-3 border-b gap-2">
            <MultiSelectDropdown
              formFieldName="categories"
              categories={categoriesList.map((category) => category)}
              onChange={setSelectedCategories}
              selected={selectedCategories}
            />
            <button
              type="button"
              onClick={toggleActive}
              className=" bg-slate-200 p-2 rounded-md w-max font-bold"
            >
              {active ? "Active" : "Archived"}
            </button>
            <div className="flex justify-center my-4">
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="p-4 bg-white rounded-b-lg">
            <input
              placeholder="Title"
              className="border-none my-2 focus:outline-none w-full font-bold text-xl"
              type="text"
              maxLength={10}
              minLength={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              rows={8}
              className="block px-0 w-full text-gray-800 bg-white border-0 focus:outline-none"
              placeholder="Write content...."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

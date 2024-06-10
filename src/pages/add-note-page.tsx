import { FormEvent, useState } from "react";
import MultiSelectDropdown from "../components/MultiSelect";
import useCategories from "../hooks/useCategories";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const { categoriesList } = useCategories();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const note = {
      title,
      content,
      active: true,
      categories: selectedCategories.map((id) => ({ id })),
      userId: "clx6g11k10000s61uzosgo7nv",
    };

    try {
      const response = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Note created:", data);
        navigate(-1);
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-gray-900 text-4xl title-font font-bold text-center my-3">
        Create New Note
      </h1>
      <button
        className="bg-gray-200 p-2 rounded-md w-max font-bold"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 w-full bg-gray-700 rounded-lg border border-gray-200">
          <div className="flex justify-end items-center py-2 px-3 border-b">
            <MultiSelectDropdown
              formFieldName="categories"
              categories={categoriesList}
              onChange={setSelectedCategories}
              selected={selectedCategories} // Pasar las categorías seleccionadas
            />
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
              required // Asegurar que el título es obligatorio
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

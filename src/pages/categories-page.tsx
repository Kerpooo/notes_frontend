import { FormEvent, useState } from "react";
import { Category } from "../components/Category";
import useCategories from "../hooks/useCategories";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function CategoriesPage() {
  const { categoriesList, loading } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState("");

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/categories/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Category deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete category");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newCategoryName,
          userId: "clx6g11k10000s61uzosgo7nv",
        }),
      });
      if (response.ok) {
        console.log("New category saved successfully");
        setNewCategoryName("");
        window.location.reload();
      } else {
        console.error("Failed to save the new category");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-900 text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-gray-900 text-4xl font-bold text-center my-3">
        Categories
      </h1>
      <button
        className="bg-gray-200 p-2 rounded-md w-max font-bold my-2"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <section className="mb-8">
        <form onSubmit={handleSubmit} className="flex justify-center gap-2">
          <div className="flex flex-row items-center">
            <label htmlFor="name" className="mr-2">
              Name:
            </label>
            <input
              id="name"
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border border-gray-400 px-2 py-1 rounded"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
          >
            Save
          </button>
        </form>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesList.map(({ id, name, userId }) => (
          <div key={id} className="flex flex-row justify-center items-center">
            <Category key={id} id={id} name={name} userId={userId} />
            <MdDelete
              color="red"
              className=" hover:cursor-pointer"
              onClick={() => handleDelete(id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

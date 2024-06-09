import { CategoryProps } from "../components/Category";
import { Note, NoteProps } from "../components/Note";
import { useEffect, useState, useCallback } from "react";

export default function NotesPage() {
  // Define el tipo de state según tus necesidades, por ejemplo: string, number, boolean, etc.
  const [state, setState] = useState<boolean | undefined>(undefined);
  const [categories, setCategories] = useState<string[]>([]);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categoriesList, setCategoriesList] = useState<CategoryProps[]>([]);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);

    console.log(state);

    const activeQuery: string = state != undefined ? `?active=${state}` : ``;
    const categoriesQuery: string = categories.length
      ? `?categories=${categories}`
      : ``;

    try {
      const response = await fetch(
        `http://localhost:5000/notes${activeQuery}${categoriesQuery}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [state, categories]);

  // Función para obtener las categorías
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategoriesList(data);
    } catch (err: any) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "true") {
      setState(true);
    } else if (value === "false") {
      setState(false);
    } else {
      setState(undefined);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  };
  return (
    <div>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5 bg-gray-800 text-white p-4 shadow min-h-full">
          <div className="mt-5">
            <SelectState handleStateChange={handleStateChange}></SelectState>
            <CategorySelector
              categoriesList={categoriesList}
              handleCategoryChange={handleCategoryChange}
              selectedCategories={categories}
            />
          </div>
        </div>
        <div className="col-span-4 row-span-5">
          <div className="flex justify-center items-center ">
            {loading && <p>Loading...</p>}
          </div>
          {error && <p>{error}</p>}
          <div>
            <div className="grid grid-cols-3 grid-rows-5 gap-4 mt-10">
              {notes.map(
                ({
                  id,
                  title,
                  content,
                  createdAt,
                  updatedAt,
                  active,
                  categories,
                }) => {
                  return (
                    <Note
                      key={id}
                      id={id}
                      title={title}
                      content={content}
                      createdAt={createdAt}
                      updatedAt={updatedAt}
                      active={active}
                      categories={categories}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SelectState = ({
  handleStateChange,
}: {
  handleStateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <>
      <label htmlFor="states" className="block mb-2 text-sm font-medium">
        Filter Notes:
      </label>
      <select
        onChange={handleStateChange}
        id="states"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option defaultValue={"undefined"} value="undefined">
          All
        </option>
        <option value="true">Active</option>
        <option value="false">Archived</option>
      </select>
    </>
  );
};

const CategorySelector = ({
  categoriesList,
  handleCategoryChange,
  selectedCategories,
}: {
  categoriesList: CategoryProps[];
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategories: string[];
}) => {
  return (
    <>
      <label htmlFor="categories" className="block mb-2 text-sm font-medium">
        Select Categories:
      </label>
      {categoriesList.map(({ id, name }) => (
        <div key={id} className="flex items-center mb-4">
          <input
            type="checkbox"
            id={id}
            value={name}
            onChange={handleCategoryChange}
            checked={selectedCategories.includes(name)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={name}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {name}
          </label>
        </div>
      ))}
    </>
  );
};

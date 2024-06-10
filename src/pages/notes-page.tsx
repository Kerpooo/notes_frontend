import { Link, Outlet } from "react-router-dom";
import { CategoryProps } from "../components/Category";
import { Note } from "../components/Note";
import { useState } from "react";
import useCategories from "../hooks/useCategories";
import useNotes from "../hooks/useNotes";

export default function NotesPage() {
  const [state, setState] = useState<boolean | undefined>(true);
  const [categories, setCategories] = useState<string[]>([]);

  const {
    categoriesList,
    error: categoriesError,
    loading: categoriesLoading,
  } = useCategories();

  const { notes, error: notesError, loading: notesLoading } = useNotes();

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

  const filteredNotes = notes.filter((note) => {
    const matchesState = state === undefined || note.active === state;
    const matchesCategory =
      categories.length === 0 ||
      note.categories?.some(({ name }) => categories.includes(name));
    return matchesState && matchesCategory;
  });

  return (
    <div className="h-full">
      <Outlet />
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5 bg-gray-800 text-white p-4 shadow min-h-full">
          <div className="mt-5">
            <SelectState handleStateChange={handleStateChange}></SelectState>
            {categoriesLoading && <p>Loading categories...</p>}
            {categoriesError && <p>{categoriesError}</p>}
            <CategorySelector
              categoriesList={categoriesList}
              handleCategoryChange={handleCategoryChange}
              selectedCategories={categories}
            />
          </div>
        </div>
        <div className="col-span-4 row-span-5">
          <h1 className="text-gray-900 text-4xl title-font font-bold text-center my-3">
            Notes
          </h1>

          <div className="flex justify-end gap-4 mx-5">
            <Link to={"add"}>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-md">
                New Note
              </button>
            </Link>

            <Link to={"/categories"}>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-md">
                New Category
              </button>
            </Link>
          </div>
          {notesLoading && (
            <p className="h-screen flex items-center justify-center text-gray-900 text-2xl title-font font-bold text-center">
              Loading...
            </p>
          )}
          {notesError && <p>{notesError}</p>}
          <div>
            <div className="grid grid-cols-3 grid-rows-5 gap-4 mt-10 mx-2">
              {filteredNotes.map(
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
        <option defaultValue={"true"} value="true">
          Active
        </option>
        <option value="false">Archived</option>
        <option value="undefined">All</option>
      </select>
    </>
  );
};

export const CategorySelector = ({
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
      <label htmlFor="categories" className="block my-4 text-sm font-medium">
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

import React, { useState, useEffect } from "react";
import { CategoryProps } from "./Category";

interface MultiSelectDropdownProps {
  formFieldName: string;
  categories: CategoryProps[];
  onChange: (selectedCategories: string[]) => void;
  selected?: string[];
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  formFieldName,
  categories,
  onChange,
  selected = [],
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(selected || []);

  useEffect(() => {
    setSelectedCategories(selected || []);
  }, [selected]);

  const handleCheckboxChange = (id: string) => {
    const updatedCategories = selectedCategories.includes(id)
      ? selectedCategories.filter((categoryId) => categoryId !== id)
      : [...selectedCategories, id];

    setSelectedCategories(updatedCategories);
    onChange(updatedCategories);
  };

  return (
    <label className="relative bg-slate-200 p-2 rounded-md w-max">
      <input type="checkbox" className="hidden peer" />
      <div className="cursor-pointer font-bold">Categories</div>

      <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
        <ul>
          {categories.map(({ id, name }) => (
            <li key={id}>
              <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={formFieldName}
                  value={id}
                  className="cursor-pointer"
                  checked={selectedCategories.includes(id)}
                  onChange={() => handleCheckboxChange(id)}
                />
                <span className="ml-2">{name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};

export default MultiSelectDropdown;

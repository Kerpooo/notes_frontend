export interface CategoryProps {
  id: string;
  name: string;
  userId: string;
}

export const Category = ({ name }: CategoryProps) => {
  return (
    <div className="bg-blue-600 w-20 text-white p-2 rounded mr-2 mb-2 flex items-center">
      {name}
    </div>
  );
};

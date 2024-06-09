import { Category, CategoryProps } from "./Category";
import { CiCircleCheck } from "react-icons/ci";
import { PiArchiveDuotone } from "react-icons/pi";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
  categories?: CategoryProps[];
}

export const Note = ({
  id,
  title,
  content,
  createdAt,
  updatedAt,
  active,
  categories,
}: NoteProps) => {
  return (
    <div className="w-full h-64 flex flex-col justify-between bg-yellow-400 rounded-lg border border-yellow-400 mb-6 py-5 px-4">
      <div>
        <h4 className="text-gray-800 font-bold mb-3">{title}</h4>
        <p className="text-gray-800 text-sm truncate">{content}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <div>
            <p className="text-sm">
              Created at: {createdAt.toString().slice(0, 10)}
            </p>
            {createdAt.toString() != updatedAt.toString() ? (
              <p className="text-sm">
                Updated at: {updatedAt.toString().slice(0, 10)}
              </p>
            ) : null}
          </div>

          <div>
            {active ? (
              <CiCircleCheck size={"30"} />
            ) : (
              <PiArchiveDuotone size={"30"} />
            )}
          </div>
        </div>
        <div className="flex flex-wrap bg-gray-800 p-3 rounded my-3">
          {categories?.map(({ id, name, userId }) => (
            <Category key={id} id={id} name={name} userId={userId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const SingleNote = () => {
  return <h1>Single Note</h1>;
};

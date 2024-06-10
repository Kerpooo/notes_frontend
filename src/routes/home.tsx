import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <main className="bg-gradient-to-r from-rose-100 to-teal-100 w-full h-dvh flex justify-center flex-col items-center">
        <h1 className="text-gray-900 text-6xl title-font font-bold text-center my-3">
          Full Stack Implementation Exercise
        </h1>
        <Link to={"/notes"}>
          <button className="px-4 py-2 bg-gray-900 text-white rounded-md">Go to Notes</button>
        </Link>
      </main>
    </>
  );
}

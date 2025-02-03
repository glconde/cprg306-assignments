import Link from "next/link";
//glc 2025

// tailwind stuff
const topContainer = "flex flex-col items-center gap-4 text-center ";
const headerTag =
  "text-3xl font-semibold text-blue-700 mb-6 border-4 border-blue-700 p-4 m-1";
const linkTag =
  "bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 block w-[400px] text-lg";
const ulTag = "flex flex-col items-center w-full gap-3 list-disc";

export default function Home() {
  return (
    <main className={topContainer}>
      <h1 className={headerTag}>CPRG 306: Web Development 2 - Assignments</h1>
      <ul className={ulTag}>
        <li>
          <Link href="./week-2" className={linkTag}>
            Week - 2
          </Link>
        </li>
        <li>
          <Link href="./week-3" className={linkTag}>
            Week - 3
          </Link>
        </li>
        <li>
          <Link href="./week-4" className={linkTag}>
            Week - 4
          </Link>
        </li>
      </ul>
    </main>
  );
}

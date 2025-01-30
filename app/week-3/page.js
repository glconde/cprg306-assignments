import ItemList from "./item-list.js";

export default function Page() {
  return (
    <main className=" p-4 w-full">
      <h1 className="text-2xl font-semibold mb-2">Shopping List</h1>
      <ItemList />
    </main>
  );
}

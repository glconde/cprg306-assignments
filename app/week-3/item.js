const nameSpan = "text-lg font-semibold text-blue-800";
const quantitySpan = "text-blue-600";
const categorySpan = "bg-blue-100 text-blue-600 px-2 py-1 rounded-md";
const containerTag =
  "flex gap-4 items-center p-4 w-[500px] bg-blue-300 m-1 rounded-md";

export default function Item({ name, quantity, category }) {
  return (
    <div className={containerTag}>
      <span className={nameSpan}>{name}</span>
      <span className={quantitySpan}>x{quantity}</span>
      <span className={categorySpan}>{category}</span>
    </div>
  );
}

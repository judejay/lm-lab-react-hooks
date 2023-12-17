import { useState } from "react";

export function CountCats() {
  const [cats, setCats] = useState(["🐈"]);
  const catsCount = cats.length;

  const addCats = () => {
    setCats([...cats, "🐈"]);
  };

  return (
    <>
      <h2>useState</h2>

      <p>{cats}</p>

      <button onClick={addCats}>{`There ${
        catsCount === 1 ? "is" : "are"
      } ${catsCount} cat${catsCount === 1 ? "" : "s"} 🥳`}</button>
    </>
  );
}

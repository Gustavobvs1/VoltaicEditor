import { useEffect, useState } from "react";

export function App() {
  const [linesCount, setLinesCount] = useState<number[]>([]);

  useEffect(() => {
    if (linesCount.length < 1) setLinesCount([1]);
  });

  function handleInput(event) {
    let lines = 1;
    for (let i = 0; i < event.target.value.length; i++) {
      if (event.target.value[i] === "\n") {
        lines++;
      }
    }
    const array: number[] = [];
    for (let i = 1; i <= lines; i++) {
      array.push(i);
    }
    setLinesCount(array);
  }

  function handleBeforeInput(event) {
    const data = event.target.value;
    if (event.data === "\n") {
      const spaces = data.substring(
        data.substring(0, event.target.selectionStart).lastIndexOf("\n")
      );
      // .substring(data.lastIndexOf("\n"), data.lastIndexOf(" "));
      console.log(spaces);
    }
  }

  return (
    <div className="flex min-h-screen gap-1">
      <div className="text-white/40  p-2 flex-col flex items-end  min-h-screen">
        {linesCount.map((element) => {
          return <span className="font-mono">{element}</span>;
        })}
      </div>
      <textarea
        className="resize-none min-h-full w-full bg-zinc-600 outline-none block font-mono text-white/80 p-2 wh whitespace-nowrap"
        onInput={handleInput}
        onBeforeInput={handleBeforeInput}
      />
    </div>
  );
}


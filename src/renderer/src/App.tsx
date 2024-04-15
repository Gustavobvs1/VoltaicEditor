import { useEffect, useState } from "react";

export function App() {
  const [linesCount, setLinesCount] = useState<number[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (linesCount.length < 1) setLinesCount([1]);
  });

  function getMachingChars(char) {
    switch (char) {
      case "{":
        return "}";
      case "[":
        return "]";
      case "(":
        return ")";
      case "'":
      case '"':
      case "`":
        return char;
      default:
        return "";
    }
  }

  function handleInput(event) {
    setText(event.target.value);
    const lines = event.target.value.split("\n").length;

    setLinesCount(Array.from({ length: lines }, (_, index) => index + 1));

    switch (event.nativeEvent.data) {
      case "{":
        setText((prevText) => {
          return prevText.concat("}");
        });
        break;
      case "[":
        setText((prevText) => {
          return prevText.concat("]");
        });
        break;
      case "(":
        setText((prevText) => {
          return prevText.concat(")");
        });
        break;
      case "'":
      case '"':
      case "`":
        setText((prevText) => {
          return prevText.concat(event.nativeEvent.data);
        });
        break;
      default:
        "";
        break;
    }
  }

  function handleKeyDown(event) {
    const start = event.target.selectionStart;
    const end = event.target.selectionEnd;
    const possibilitiesChars = ["(", "'", '"', "`", "[", "{"];
    if (event.key === "Enter") {
      event.preventDefault();
      const spaces = text
        .substring(text.lastIndexOf("\n", start) + 1, start)
        .match(/^\s*/);

      setText(
        (prevText) =>
          prevText.slice(0, start) + "\n" + spaces + prevText.slice(end)
      );

      setLinesCount((prevLinesCount) => [
        ...prevLinesCount,
        prevLinesCount.length + 1,
      ]);
    } else if (event.key === "Tab") {
      event.preventDefault();
      setText(
        (prevText) => prevText.slice(0, start) + "\t" + prevText.slice(end)
      );
    } else if (
      start !== end &&
      possibilitiesChars.some((element) => element === event.key)
    ) {
      console.log(start, end);
      setText(
        (prevText) =>
          prevText.slice(0, start) +
          event.key +
          event.target.value +
          getMachingChars(event.key) +
          prevText.slice(end)
      );
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
        onKeyDown={handleKeyDown}
        value={text}
      />
    </div>
  );
}


"use client";
import { useEffect, useState } from "react";
const radioSrcs = [
  {
    name: "Sheger 102.1",
    src: "https://stream.zenolive.com/y91n1vtbaw5tv",
  },
  {
    name: "Ethio FM 107.8",
    src: "https://stream.zeno.fm/b8skbyqeqeruv",
  },
  {
    name: "Bisra 101.1FM",
    src: "http://stream.zeno.fm/zvaru17saxquv",
  },
  {
    name: "FM Addis 97.1",
    src: "https://stream.zeno.fm/rb6wbrap7yzuv",
  },
];

export default function Home() {
  const [radioSrc, setRadioSrc] = useState(radioSrcs[0]);

  useEffect(() => {
    //setRadioSrc(radioSrcs[0]);
  });
  return (
    <main className="flex flex-col gap-4 ">
      <div className="card flex flex-col items-center">
        <h2 className="card-title">{radioSrc.name}</h2>
        <audio src={radioSrc.src} controls autoPlay="true"></audio>
      </div>
      <div>
        <ul className="flex flex-col items-center">
          {radioSrcs.map((src) => (
            <li key={src.name}>
              <button
                className="btn"
                onClick={() => {
                  setRadioSrc(src);
                }}
              >
                {src.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

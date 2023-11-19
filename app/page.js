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
  return (
    <main className="flex flex-col gap-4 ">
      <div>
        <ul className="flex flex-col items-center gap-3">
          {radioSrcs.map((src) => (
            <li key={src.name} className="bg-neutral rounded-md">
              <div className="">
                <div className="text-center">{src.name}</div>
                <audio src={src.src} controls></audio>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

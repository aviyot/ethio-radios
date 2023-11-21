import { radioSrcs } from "../data/radio_list";

export async function generateStaticParams() {
  return radioSrcs.map((radio) => ({
    slug: radio.id,
  }));
}

export default function Page({ params }) {
  const { slug } = params;
  const radio = radioSrcs.find((val) => val.id == slug);

  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col">
          <div className="text-center text-lg">{radio.name}</div>
          <audio src={radio.src} controls autoPlay></audio>
        </div>
      </div>
    </>
  );
}

import { radioSrcs } from "../data/radio_list";

import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams() {
  return radioSrcs.map((radio) => ({
    slug: radio.id,
  }));
}

export async function generateMetadata({ params }) {
  const radio = radioSrcs.find((val) => val.id == params.slug);

  return {
    title: radio.name,
  };
}

export default function Page({ params }) {
  const { slug } = params;
  const radio = radioSrcs.find((val) => val.id == slug);

  return (
    <>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col">
          <div className="flex justify-center gap-3">
            <span className="text-lg">{radio.name}</span>
            <a className="rounded border p-1" href={radio.contact}>
              info
            </a>
          </div>
          <audio src={radio.src} controls autoPlay></audio>
        </div>
      </div>
    </>
  );
}

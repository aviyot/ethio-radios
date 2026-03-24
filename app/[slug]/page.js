import { notFound } from "next/navigation";

import { radioSrcs } from "../data/radio_list";

export async function generateStaticParams() {
  return radioSrcs.map((radio) => ({
    slug: radio.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const radio = radioSrcs.find((val) => val.id === slug);

  if (!radio) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: radio.name,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const radio = radioSrcs.find((val) => val.id === slug);

  if (!radio) {
    notFound();
  }

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

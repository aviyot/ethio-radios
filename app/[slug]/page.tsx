import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AudioPlayer from "../components/AudioPlayer";
import { radioSrcs } from "../data/radio_list";
import { PageParams } from "../types";

export async function generateStaticParams() {
  return radioSrcs.map((radio) => ({
    slug: radio.id,
  }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
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

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const radio = radioSrcs.find((val) => val.id === slug);

  if (!radio) {
    notFound();
  }

  return <AudioPlayer name={radio.name} src={radio.src} contact={radio.contact} />;
}

export interface Radio {
  id: string;
  name: string;
  src: string;
  contact: string;
}

export interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

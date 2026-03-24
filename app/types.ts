export interface Radio {
  id: string;
  name: string;
  src: string;
  contact: string;
  icon?: string;
}

export interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

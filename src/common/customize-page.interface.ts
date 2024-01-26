export interface IMissionPageData {
  id: string;
  images: File[];
  index: number;
  title: string;
  text: string;
  buttonName: string;
  buttonLink: string
}

export interface IBannerHomepageData {
  id: string;
  image: string;
  type: number;
  createdAt: Date;
  updatedAt: Date;
}
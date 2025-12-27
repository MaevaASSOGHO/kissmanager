import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kissmanager.com",
      lastModified: new Date(),
    }
  ];
}

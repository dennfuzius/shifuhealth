import HomeContent from "@/components/HomeContent";
import BlogPreview from "@/components/BlogPreview";

export const revalidate = 60;

export default function HomePage() {
  return <HomeContent blogPreview={<BlogPreview />} />;
}

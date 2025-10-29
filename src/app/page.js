
import Blog from "@/components/Blog";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <div className="container mx-auto w-full h-full">
    <Navbar />
   <HeroSection />
   <Blog/>
   </div>
   </>
  );
}

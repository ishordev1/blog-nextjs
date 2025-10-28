
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <div className="container mx-auto border w-full">
    <Navbar />
   <HeroSection />
   </div>
   </>
  );
}

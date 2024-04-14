"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/nft');
  }); 

  return (
    <div className="flex flex-col items-center justify-center h-screen">
  <div className="mb-8 space-y-4">
    <h2 className="text-2xl md:text-4xl font-bold text-center">
      Explore the power of AI
    </h2>
    <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
      Ask-Me
    </p>
  </div>
  <div className="px-4 md:px-20 lg:px-32 space-y-4">
    <h3>@Itz-Amethyst</h3>
  </div>
</div>
  );
}

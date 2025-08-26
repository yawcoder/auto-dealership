'use client';

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  // Mockup car images - these will be replaced with Firebase data later
  const mockupCarImages = [
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&h=600&fit=crop&crop=center"
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section with Image Carousel */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
          {/* Image Carousel */}
          <div className="w-full sm:max-w-4xl sm:mx-auto">
            <Carousel 
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
            >
              <CarouselContent>
                {mockupCarImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Featured Vehicle ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
          <div className="text-center mt-8 mb-8 px-4 sm:px-0">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Welcome to Our Showroom
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our carefully curated selection of compact cars and sedans.
            </p>
          </div>
          
        </div>
      </section>

      {/* Additional content sections can be added here */}
      <section className="w-full py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
        </div>
      </section>
    </main>
  );
}

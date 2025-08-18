import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (api) {
      setCurrent(api.selectedScrollSnap() + 1);
    }
  }, []);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="mb-8">
      <Carousel setApi={setApi} className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Image
                  src={image || "/placeholder.svg"}
                  width={900}
                  height={600}
                  alt={`${title} screenshot ${index + 1}`}
                  className="rounded-lg object-cover w-full h-[300px] md:h-[450px] lg:h-[600px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        {count > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index + 1 === current
                    ? "bg-accent-primary"
                    : "bg-muted-foreground hover:bg-foreground"
                }`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
    </div>
  );
}

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Car {
  id: string;
  name: string;
  year: number;
  category: string;
  price: number;
  image: string;
}

interface CarCardProps {
  car: Car;
  onViewDetails?: (carId: string) => void;
}

export default function CarCard({ car, onViewDetails }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(car.id);
    } else {
      // Default behavior
      console.log('View details for car:', car.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={car.image}
          alt={`${car.name} ${car.year}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {car.name}
        </h3>
        <p className="text-muted-foreground mb-4">
          {car.year} • {car.category}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(car.price)}
          </span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}

export type { Car };

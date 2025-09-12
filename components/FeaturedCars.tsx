"use client";

import CarCard, { Car } from "@/components/CarCard";

interface FeaturedCarsProps {
  cars?: Car[];
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  // Default cars data if none provided
  const defaultCars: Car[] = [
    {
      id: "1",
      name: "Toyota Camry",
      year: 2023,
      category: "Sedan",
      price: 28500,
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "2",
      name: "Honda CR-V",
      year: 2023,
      category: "SUV",
      price: 32750,
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "3",
      name: "BMW 3 Series",
      year: 2023,
      category: "Sedan",
      price: 45900,
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "4",
      name: "Audi A4",
      year: 2023,
      category: "Sedan",
      price: 42500,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "5",
      name: "Mercedes C-Class",
      year: 2023,
      category: "Sedan",
      price: 48300,
      image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: "6",
      name: "Tesla Model 3",
      year: 2023,
      category: "Electric",
      price: 39990,
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop&crop=center"
    }
  ];

  const carsToDisplay = cars || defaultCars;

  const handleViewDetails = (carId: string) => {
    // TODO: Navigate to car details page
    console.log('View details for car:', carId);
  };

  return (
    <section className="w-full py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Cars
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium vehicles
          </p>
        </div>

        {/* Car Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {carsToDisplay.map((car) => (
            <CarCard 
              key={car.id}
              car={car}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

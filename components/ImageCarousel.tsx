'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  carName: string;
}

export default function ImageCarousel({ images, carName }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState<{ [key: number]: boolean }>({});

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextImage();
          break;
        case 'Escape':
          event.preventDefault();
          setIsModalOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Handle image load errors
  const handleImageError = (index: number) => {
    setImageLoadError(prev => ({ ...prev, [index]: true }));
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 md:h-96 bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative mb-4">
        <div 
          className="w-full h-64 md:h-96 bg-muted rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsModalOpen(true);
            }
          }}
          aria-label={`View ${carName} image ${currentImageIndex + 1} of ${images.length} in full screen`}
        >
          {imageLoadError[currentImageIndex] ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">Image failed to load</p>
            </div>
          ) : (
            <Image
              src={images[currentImageIndex]}
              alt={`${carName} - Image ${currentImageIndex + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentImageIndex === 0}
              onError={() => handleImageError(currentImageIndex)}
            />
          )}
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white border-none backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white border-none backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 justify-center overflow-x-auto pb-2" role="tablist" aria-label="Image thumbnails">
          {images.map((image, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-md overflow-hidden border-2 transition-all p-0 ${
                index === currentImageIndex 
                  ? 'border-primary opacity-100' 
                  : 'border-border opacity-70 hover:opacity-100'
              }`}
              role="tab"
              aria-selected={index === currentImageIndex}
              aria-label={`View image ${index + 1} of ${carName}`}
            >
              {imageLoadError[index] ? (
                <div className="w-full h-full flex items-center justify-center bg-muted text-xs">
                  Error
                </div>
              ) : (
                <Image
                  src={image}
                  alt={`${carName} thumbnail ${index + 1}`}
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
              )}
            </Button>
          ))}
        </div>
      )}

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${carName} image gallery`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-white hover:bg-white/20 z-10"
              aria-label="Close image gallery"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Main Modal Image */}
            {imageLoadError[currentImageIndex] ? (
              <div className="max-w-4xl max-h-full bg-muted rounded-lg flex items-center justify-center p-8">
                <p className="text-muted-foreground">Image failed to load</p>
              </div>
            ) : (
              <div className="relative max-w-4xl max-h-full">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${carName} - Full size image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  onError={() => handleImageError(currentImageIndex)}
                />
              </div>
            )}

            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white hover:bg-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-white hover:bg-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}

            {/* Modal Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
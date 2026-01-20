"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { apiFetch } from "@/lib/apiClient";

interface SliderImage {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  order: number;
}

interface ImageSliderProps {
  readonly className?: string;
  readonly autoPlay?: boolean;
  readonly interval?: number;
  readonly showControls?: boolean;
  readonly showIndicators?: boolean;
}

export default function ImageSlider({
  className = "",
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
}: ImageSliderProps) {
  const [slides, setSlides] = useState<SliderImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [error, setError] = useState<string | null>(null);

  // Fetch slides from API
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await apiFetch("/api/sliders");
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "Failed to fetch slides");
        setSlides(data.sliders || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to load slides");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSlides();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, slides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  if (isLoading) {
    return (
      <div className={`relative w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400">Loading slides...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative w-full h-full bg-gray-200 dark:bg-gray-800 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-500 dark:text-red-400 text-center px-4">
            <div className="font-semibold">Error loading slides</div>
            <div className="text-sm mt-1">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className={`relative w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500 dark:text-gray-400 text-center px-4">
            <div className="text-6xl mb-4">🖼️</div>
            <div className="font-semibold">No slides available</div>
            <div className="text-sm mt-1">Admin can add slides to display here</div>
          </div>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  // Check if image URL is valid (not a redirect or invalid URL)
  const isValidImageUrl = (url: string) => {
    if (!url) return false;
    // Allow data URLs (uploaded images)
    if (url.startsWith('data:')) return true;
    // Allow common image hosting domains
    const validDomains = ['unsplash.com', 'picsum.photos', 'pexels.com', 'pixabay.com', 'imgur.com', 'placeholder.com'];
    try {
      const urlObj = new URL(url);
      return validDomains.some(domain => urlObj.hostname.includes(domain)) || url.startsWith('/');
    } catch {
      return false;
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Main slide image */}
      <div className="relative w-full h-full bg-black">
        {isValidImageUrl(currentSlide.imageUrl) ? (
          <Image
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            fill
            className="object-contain"
            sizes="100vw"
            priority={currentIndex === 0}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%23e5e7eb'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='sans-serif' font-size='24'%3EImage not available%3C/text%3E%3C/svg%3E";
            }}
            unoptimized={currentSlide.imageUrl.startsWith('data:')}
            style={{
              objectPosition: 'center',
              padding: '0'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🖼️</div>
              <div className="text-gray-600 dark:text-gray-400">
                <div className="font-semibold">Invalid Image URL</div>
                <div className="text-sm mt-1">Please update the slider with a valid image</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Slide content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12 text-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
            {currentSlide.title}
          </h2>
          {currentSlide.description && (
            <p className="text-sm md:text-base lg:text-lg opacity-90 max-w-3xl drop-shadow-md">
              {currentSlide.description}
            </p>
          )}
        </div>
      </div>

      {/* Navigation controls */}
      {showControls && slides.length > 1 && (
        <>
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="absolute right-4 bottom-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
        </>
      )}

      {/* Slide indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((slide) => (
            <button
              key={slide._id}
              onClick={() => goToSlide(slides.indexOf(slide))}
              className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                slides.indexOf(slide) === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${slides.indexOf(slide) + 1}`}
            />
          ))}
        </div>
      )}

      {/* Keyboard navigation */}
      <div className="sr-only">
        <p>Use arrow keys to navigate slides</p>
      </div>
    </div>
  );
}

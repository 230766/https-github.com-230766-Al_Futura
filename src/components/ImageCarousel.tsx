import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageCarouselProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  title
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Reset current index when images change
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [images, initialIndex]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigatePrev();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const navigateNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const navigatePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  
  // Handle background click to close the carousel
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking directly on the background (not on the image or controls)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
      onClick={handleBackgroundClick}
    >
      {/* Close button (top-right corner) */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 focus:outline-none"
        aria-label="Close"
      >
        <X className="h-8 w-8" />
      </button>
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex justify-start items-center p-4 text-white z-10">
        <div className="text-lg font-medium">
          {title && <span>{title}</span>}
          <span className="ml-2 text-sm opacity-70">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>
      
      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center p-10">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={navigatePrev}
          className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 ml-4"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      </div>
      
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={navigateNext}
          className="h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 mr-4"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
      
      {/* Thumbnails */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 bg-black/50">
        <div className="flex space-x-2 overflow-x-auto max-w-full pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-blue-500 scale-110' : 'border-transparent opacity-70'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      
      {/* Close instructions */}
      <div className="absolute bottom-24 left-0 right-0 text-center text-white/70 text-sm">
        Press ESC or click outside to close
      </div>
    </div>
  );
};

export default ImageCarousel; 
import ImageCarousel from '../components/ImageCarousel';

export default function CarouselDemo() {
  // Sample car images for demo
  const sampleImages = [
    'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Car+Front+View',
    'https://via.placeholder.com/800x600/50C878/FFFFFF?text=Car+Side+View',
    'https://via.placeholder.com/800x600/FF6B6B/FFFFFF?text=Car+Interior',
    'https://via.placeholder.com/800x600/FFD93D/FFFFFF?text=Car+Engine',
    'https://via.placeholder.com/800x600/6C5CE7/FFFFFF?text=Car+Back+View'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Task #11: Image Carousel/Gallery Demo
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">2023 Toyota Camry</h2>
          
          {/* Your Image Carousel Component */}
          <ImageCarousel 
            images={sampleImages} 
            carName="2023 Toyota Camry" 
          />
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Carousel Features:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✅ Navigation arrows (left/right)</li>
              <li>✅ Thumbnail strip with click navigation</li>
              <li>✅ Image counter (1/5, 2/5, etc.)</li>
              <li>✅ Click main image for full-screen modal</li>
              <li>✅ Full-screen navigation</li>
              <li>✅ Responsive design</li>
              <li>✅ Hover effects and smooth transitions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { X } from 'lucide-react';
import { useCMS } from '../cms/CMSContext';

// Import all gallery images (1-28)
import gallery1 from '../../assets/images/gallery/gallery-1.jpeg';
import gallery2 from '../../assets/images/gallery/gallery-2.jpeg';
import gallery3 from '../../assets/images/gallery/gallery-3.jpeg';
import gallery4 from '../../assets/images/gallery/gallery-4.JPG';
import gallery5 from '../../assets/images/gallery/gallery-5.JPG';
import gallery6 from '../../assets/images/gallery/gallery-6.JPG';
import gallery7 from '../../assets/images/gallery/gallery-7.JPG';
import gallery8 from '../../assets/images/gallery/gallery-8.JPG';
import gallery9 from '../../assets/images/gallery/gallery-9.JPG';
import gallery10 from '../../assets/images/gallery/gallery-10.JPG';
import gallery11 from '../../assets/images/gallery/gallery-11.JPG';
import gallery12 from '../../assets/images/gallery/gallery-12.JPG';
import gallery13 from '../../assets/images/gallery/gallery-13.JPG';
import gallery14 from '../../assets/images/gallery/gallery-14.JPG';
import gallery15 from '../../assets/images/gallery/gallery-15.JPG';
import gallery16 from '../../assets/images/gallery/gallery-16.JPG';
import gallery17 from '../../assets/images/gallery/gallery-17.JPG';
import gallery18 from '../../assets/images/gallery/gallery-18.JPG';
import gallery19 from '../../assets/images/gallery/gallery-19.JPG';
import gallery20 from '../../assets/images/gallery/gallery-20.JPG';
import gallery21 from '../../assets/images/gallery/gallery-21.JPG';
import gallery22 from '../../assets/images/gallery/gallery-22.JPG';
import gallery23 from '../../assets/images/gallery/gallery-23.JPG';
import gallery24 from '../../assets/images/gallery/gallery-24.JPG';
import gallery25 from '../../assets/images/gallery/gallery-25.JPG';
import gallery26 from '../../assets/images/gallery/gallery-26.JPG';
import gallery27 from '../../assets/images/gallery/gallery-27.jpeg';
import gallery28 from '../../assets/images/gallery/gallery-28.jpeg';
import banner3 from '../../assets/images/banner/banner-3.jpeg';
import { useLanguage } from '../context/LanguageContext';

const galleryImages = [
  gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7,
  gallery8, gallery9, gallery10, gallery11, gallery12, gallery13, gallery14,
  gallery15, gallery16, gallery17, gallery18, gallery19, gallery20, gallery21,
  gallery22, gallery23, gallery24, gallery25, gallery26, gallery27, gallery28,
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { t } = useLanguage();
  const { data } = useCMS();

  const displayImages: string[] =
    data.gallery.length > 0
      ? data.gallery.map((g) => g.image)
      : (galleryImages as string[]);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % displayImages.length);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + displayImages.length) % displayImages.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Hero Section */}
            <div className="relative h-[400px] overflow-hidden">
              <ImageWithFallback
                src={banner3}
                alt="Our services"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl md:text-5xl text-white mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {t('gallery.title')}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-xl mb-6"
                    style={{ fontFamily: 'var(--font-subheading)', color: 'var(--gold)' }}
                  >
                    {t('gallery.subtitle')}
                  </motion.p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100px' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="h-1 mx-auto"
                    style={{ backgroundColor: 'var(--gold)' }}
                  />
                </div>
              </div>
            </div>
        </motion.div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displayImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-xl shadow-md cursor-pointer group"
            >
              <ImageWithFallback
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                draggable={false}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span
                  className="text-white text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  View Image
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 z-50"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 z-50"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 z-50"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Image */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={displayImages[selectedImage]}
              alt={`Gallery image ${selectedImage + 1}`}
              className="w-full h-full object-contain rounded-lg"
              draggable={false}
            />
          </motion.div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span
              className="text-white text-sm"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {selectedImage + 1} / {displayImages.length}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

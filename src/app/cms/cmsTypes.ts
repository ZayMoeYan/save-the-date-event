export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Testimonial {
  id: string;
  image: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  statsExperience: string;
  statsEvents: string;
  statsClients: string;
  servicesTitle: string;
  servicesSubtitle: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  testimonialsTitle: string;
  testimonialsSubtitle: string;
}

export interface AboutContent {
  bannerTitle: string;
  bannerSubtitle: string;
  storyTitle: string;
  storyText: string;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  teamTitle: string;
  teamText: string;
}

export interface Service {
  id: string;
  image: string;
  title: string;
  description: string;
  features: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  location: string;
  phone: string;
  email: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  googleMap: string;
}

export interface CMSData {
  banners: Banner[];
  home: HomeContent;
  testimonials: Testimonial[];
  contact: ContactInfo;
  about: AboutContent;
  services: Service[];
  gallery: GalleryItem[];
  faqs: FAQ[];
}

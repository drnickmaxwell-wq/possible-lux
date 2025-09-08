import { Metadata } from 'next';
import JsonLd from '@/components/seo/json-ld';
import OriginalHeroSection from '@/components/hero/original-hero-section';
import InteractiveDentalVisualization from '@/components/features/interactive-dental-visualization';
import LuxuryChatbot from '@/components/ai/luxury-chatbot';
import { FloatingGeometry } from '@/components/effects/micro-interactions';

export const metadata: Metadata = {
  title: "St Mary's House Dental Care | Luxury Coastal Dentistry in Shoreham-by-Sea",
  description: "Experience luxury coastal dental care at St Mary's House in Shoreham-by-Sea. We specialize in 3D digital dentistry, porcelain veneers, dental implants, and anxiety-free treatments.",
  keywords: ["dentist Shoreham-by-Sea", "luxury dentistry", "3D dentistry", "dental implants", "porcelain veneers", "emergency dentist", "anxiety-free dentistry"],
  openGraph: {
    title: "St Mary's House Dental Care | Luxury Coastal Dentistry",
    description: "Discover a new standard of dental care in our luxury coastal practice.",
    url: "https://www.stmaryshousedental.co.uk",
    siteName: "St Mary's House Dental Care",
    images: [
      {
        url: 'https://www.stmaryshousedental.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "St Mary's House Dental Care | Luxury Coastal Dentistry",
    description: "Experience advanced, anxiety-free dentistry in a stunning coastal setting.",
    images: ['https://www.stmaryshousedental.co.uk/twitter-image.jpg'],
  },
};

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "St Mary's House Dental Care",
    "description": "Luxury coastal dental practice in Shoreham-by-Sea, specializing in 3D digital dentistry, porcelain veneers, and dental implants.",
    "url": "https://www.stmaryshousedental.co.uk",
    "logo": "https://www.stmaryshousedental.co.uk/logo.png",
    "image": "https://www.stmaryshousedental.co.uk/hero-poster.jpg",
    "telephone": "+441273123456",
    "email": "info@stmaryshousedental.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1 St Mary's House",
      "addressLocality": "Shoreham-by-Sea",
      "addressRegion": "West Sussex",
      "postalCode": "BN43 5ZA",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "09:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "09:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/stmaryshousedental",
      "https://www.instagram.com/stmaryshousedental"
    ],
    "medicalSpecialty": "Dentistry",
    "priceRange": "£££",
    "currenciesAccepted": "GBP",
    "paymentAccepted": "Cash, Credit Card, Finance",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "50.8333",
        "longitude": "-0.2667"
      },
      "geoRadius": "30"
    }
  };

  return (
    <main className="min-h-screen overflow-hidden relative">
      <JsonLd data={organizationSchema} />
      
      {/* Floating Geometry Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <FloatingGeometry 
          shape="circle" 
          size="sm" 
          color="magenta" 
          animation="float"
          className="absolute top-20 left-10 opacity-30"
        />
        <FloatingGeometry 
          shape="hexagon" 
          size="md" 
          color="turquoise" 
          animation="rotate"
          className="absolute top-40 right-20 opacity-20"
        />
        <FloatingGeometry 
          shape="square" 
          size="sm" 
          color="gold" 
          animation="pulse"
          className="absolute bottom-40 left-20 opacity-25"
        />
        <FloatingGeometry 
          shape="circle" 
          size="lg" 
          color="turquoise" 
          animation="orbit"
          className="absolute bottom-20 right-10 opacity-15"
        />
      </div>
      
      {/* Original Hero Section with Flowing Waves */}
      <OriginalHeroSection />
      
      {/* Interactive Dental Visualization Section */}
      <InteractiveDentalVisualization />
      
      {/* Luxury AI Chatbot */}
      <LuxuryChatbot />
    </main>
  );
}


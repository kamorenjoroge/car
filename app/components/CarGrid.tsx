import { FaCheckCircle, FaCar } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const carCategories = [
  {
    title: "Safari 4x4 Vehicles",
    description: "Rugged off-road vehicles perfect for Kenyan terrain",
    image: "/suv-prado.jpg",
    priceFrom: "12,000",
    features: [
      "4WD capability",
      "High ground clearance",
      "Spacious for gear",
      "Experienced safari drivers"
    ],
    popular: true
  },
  {
    title: "Economy Cars",
    description: "Fuel-efficient options for city driving",
    image: "/sedan-corolla.jpg",
    priceFrom: "4,500",
    features: [
      "Great fuel economy",
      "Compact size",
      "AC & modern features",
      "Ideal for 1-3 passengers"
    ]
  },
  {
    title: "Luxury Sedans",
    description: "Premium comfort for business or leisure",
    image: "/sedan-corolla.jpg",
    priceFrom: "15,000",
    features: [
      "Leather interiors",
      "Premium sound system",
      "Executive class",
      "Chauffeur available"
    ]
  },
  {
    title: "Family SUVs",
    description: "Spacious vehicles for family trips",
    image: "/suv-prado.jpg",
    priceFrom: "8,000",
    features: [
      "7-8 passenger capacity",
      "Child seat options",
      "Ample luggage space",
      "Comfortable for long drives"
    ]
  },
  {
    title: "VIP Luxury",
    description: "Top-tier vehicles for special occasions",
    image: "/luxury-mercedes.jpg",
    priceFrom: "25,000",
    features: [
      "Latest model luxury cars",
      "Privacy features",
      "Professional chauffeur",
      "Airport transfers"
    ]
  },
  {
    title: "Minibuses",
    description: "For group travel and tours",
    image: "/hero-cars.jpg",
    priceFrom: "10,000",
    features: [
      "12-25 passenger capacity",
      "Tour guide compatible",
      "Luggage trailers available",
      "Custom safari packages"
    ]
  }
];

const CarGrid = () => {
  return (
    <section className="py-20 px-4 bg-secondary/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-earth mb-4">
            Choose Your Perfect Ride
          </h2>
          <p className="text-xl text-earth/80 max-w-2xl mx-auto">
            From rugged safari 4x4s to luxurious executive vehicles, 
            find the perfect car for your Kenyan adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carCategories.map((category) => (
            <div 
              key={category.title} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100"
            >
              <div className="relative">
                {category.popular && (
                  <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                )}
                <div className="h-48 overflow-hidden">
                  <Image
                  width={500}
                  height={500}
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-earth mb-2">
                    {category.title}
                  </h3>
                  <p className="text-earth/70 text-sm">
                    {category.description}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary">
                    KES {category.priceFrom}
                    <span className="text-sm font-normal text-earth/70">/day</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {category.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <FaCheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-earth/70">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/cars?category=${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <FaCar className="h-4 w-4" />
                  View {category.title.split(' ')[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarGrid;
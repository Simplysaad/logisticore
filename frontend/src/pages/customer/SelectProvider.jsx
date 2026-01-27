import React, { useState } from "react";
import { 
  Bike, Building2, MapPin, Clock, DollarSign, Star, ChevronLeft, ChevronRight, 
  Shield, TrendingUp, Users, Filter, Search 
} from "lucide-react";
import RiderCard from "../../components/RiderCard";
import CompanyCard from "../../components/CompanyCard";

const nearbyRiders =  [
  {
    _id: "rider_1",
    personalInfo: {
      firstName: "Ahmed",
      lastName: "Ibrahim",
      phoneNumber: "+2348123456789",
      email: "ahmed.ibrahim@gmail.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
    },
    vehicle: {
      type: "bike",
      plateNumber: "ABC123AA",
      model: "Yamaha XMAX",
      color: "Red",
      year: 2024
    },
    location: {
      currentLat: 6.5244,
      currentLng: 3.3792,
      serviceAreas: ["Ikeja", "VI", "Allen"],
      address: "21 Allen Ave, Ikeja"
    },
    verification: {
      ninNumber: "NIN12345678901",
      driversLicense: { number: "DL001", expiryDate: "2027-01-15" },
      verificationStatus: "approved",
      verifiedAt: new Date("2026-01-10")
    },
    availability: {
      isOnline: true,
      isAvailable: true,
      lastSeen: new Date()
    },
    pricingRule: {
      baseFare: 1200,
      perKmRate: 250,
      minimumFare: 1500,
      peakHourMultiplier: 1.3
    },
    performance: {
      totalRides: 847,
      totalEarnings: 2450000,
      averageRating: 4.8,
      completionRate: 98,
      onTimeRate: 96
    },
    ratings: {
      totalReviews: 247,
      ratingsBreakdown: { fiveStar: 189, fourStar: 45, threeStar: 8, twoStar: 3, oneStar: 2 }
    }
  },
  {
    _id: "rider_2",
    personalInfo: {
      firstName: "Fatima",
      lastName: "Abdullahi",
      phoneNumber: "+2348098765432",
      email: "fatima.abdullahi@gmail.com"
    },
    vehicle: {
      type: "car",
      plateNumber: "KJA456BB",
      model: "Toyota Corolla",
      color: "White",
      year: 2023
    },
    location: {
      currentLat: 6.5276,
      currentLng: 3.3884,
      serviceAreas: ["VI", "Ikoyi", "Lekki"],
      address: "12 Adeola Odeku, VI"
    },
    verification: { ninNumber: "NIN98765432109", verificationStatus: "approved" },
    availability: { isOnline: true, isAvailable: true },
    pricingRule: {
      baseFare: 1800,
      perKmRate: 400,
      minimumFare: 2000
    },
    performance: {
      totalRides: 423,
      averageRating: 4.6,
      completionRate: 95,
      onTimeRate: 92
    },
    ratings: { totalReviews: 156 }
  },
  {
    _id: "rider_3",
    personalInfo: {
      firstName: "Chinedu",
      lastName: "Okeke",
      phoneNumber: "+2347087654321",
      email: "chinedu.okeke@gmail.com"
    },
    vehicle: {
      type: "bike",
      plateNumber: "LAG789CC",
      model: "Honda CB125",
      color: "Black"
    },
    location: {
      currentLat: 6.5184,
      currentLng: 3.3840,
      serviceAreas: ["Ikeja", "Oshodi", "Agege"]
    },
    verification: { ninNumber: "NIN45678912345", verificationStatus: "approved" },
    availability: { isOnline: true, isAvailable: false }, // Busy
    pricingRule: {
      baseFare: 1000,
      perKmRate: 200,
      minimumFare: 1300
    },
    performance: {
      totalRides: 1567,
      averageRating: 4.9,
      completionRate: 99,
      onTimeRate: 98
    },
    ratings: { totalReviews: 489 }
  },
  {
    _id: "rider_4",
    personalInfo: {
      firstName: "Aisha",
      lastName: "Muhammad",
      phoneNumber: "+2348012345678"
    },
    vehicle: {
      type: "van",
      plateNumber: "MUS234DD",
      model: "Toyota HiAce",
      color: "Blue"
    },
    location: {
      currentLat: 6.5308,
      currentLng: 3.3952,
      serviceAreas: ["Lekki", "Ajah", "VI"]
    },
    verification: { ninNumber: "NIN32165498701", verificationStatus: "approved" },
    availability: { isOnline: true, isAvailable: true },
    pricingRule: {
      baseFare: 2500,
      perKmRate: 350,
      minimumFare: 2800
    },
    performance: {
      totalRides: 234,
      averageRating: 4.7,
      completionRate: 97
    }
  }
];

const ProviderSelectionPage = ({ 
  orderDetails, 
  onSelectProvider,
  // nearbyRiders = [],
  nearbyCompanies = [],
  loading = false 
}) => {
  const [activeTab, setActiveTab] = useState("riders");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState();

  const filteredRiders = nearbyRiders.filter(rider =>
    rider.personalInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.personalInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = nearbyCompanies.filter(company =>
    company.companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortProviders = (providers) => {
    return providers.sort((a, b) => {
      switch(sortBy) {
        case "price": return a.estimatedFare - b.estimatedFare;
        case "rating": return b.performance.averageRating - a.performance.averageRating;
        case "distance": return a.distanceKm - b.distanceKm;
        case "eta": return parseInt(a.eta) - parseInt(b.eta);
        default: return 0;
      }
    });
  };

  const sortedRiders = sortProviders(filteredRiders);
  const sortedCompanies = sortProviders(filteredCompanies);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Order Summary */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl border border-emerald-200">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Bike className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-emerald-900 bg-clip-text text-transparent">
                  Select Provider
                </h1>
                <p className="text-sm text-gray-600">
                  {orderDetails?.pickupAddress?.slice(0, 30)}... → {orderDetails?.dropoffAddress?.slice(0, 30)}...
                </p>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span>📦 {orderDetails?.weight || "2kg"}</span>
                  <span>📏 {orderDetails?.distance || "3.2km"}</span>
                </div>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search riders or companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-3 focus:ring-emerald-500 focus:border-transparent shadow-sm"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span>Sort</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
                >
                  <option value="distance">Nearest First</option>
                  <option value="price">Lowest Price</option>
                  <option value="rating">Highest Rated</option>
                  <option value="eta">Fastest ETA</option>
                </select>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-emerald-100 shadow-lg mt-4 animate-in slide-in-from-top-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="bikes" className="w-4 h-4 rounded" />
                  <label>Bikes (Fastest)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="cars" className="w-4 h-4 rounded" />
                  <label>Cars (Reliable)</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="companies" className="w-4 h-4 rounded" />
                  <label>Companies</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-col lg:flex-row gap-2 mb-12 sticky top-[140px] lg:top-[100px] z-40 bg-white/90 backdrop-blur-md rounded-3xl p-1 shadow-xl border border-emerald-100">
          <button
            onClick={() => setActiveTab("riders")}
            className={`
              flex-1 lg:flex-none px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 justify-center
              ${activeTab === "riders"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/25"
                : "text-gray-700 hover:text-gray-900 hover:shadow-lg bg-white/50 backdrop-blur-xl border border-gray-200 hover:border-green-300"
              }
            `}
          >
            <Bike className="w-6 h-6" />
            Individual Riders
            <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
              {sortedRiders.length}
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab("companies")}
            className={`
              flex-1 lg:flex-none px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center gap-3 justify-center
              ${activeTab === "companies"
                ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl shadow-emerald-500/25"
                : "text-gray-700 hover:text-gray-900 hover:shadow-lg bg-white/50 backdrop-blur-xl border border-gray-200 hover:border-emerald-300"
              }
            `}
          >
            <Building2 className="w-6 h-6" />
            Delivery Companies
            <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
              {sortedCompanies.length}
            </span>
          </button>
        </div>

        {/* Providers Grid */}
        <div className="space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
                  <div className="h-32 bg-gray-200 rounded-2xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-20 bg-gray-200 rounded-xl"></div>
                      <div className="h-20 bg-gray-200 rounded-xl"></div>
                      <div className="h-20 bg-gray-200 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === "riders" && sortedRiders.length === 0 ? (
            <EmptyState 
              title="No Riders Nearby" 
              subtitle="Riders will appear here when you set your pickup location"
              icon={Bike}
            />
          ) : activeTab === "companies" && sortedCompanies.length === 0 ? (
            <EmptyState 
              title="No Companies Available" 
              subtitle="Companies serving your area will appear here"
              icon={Building2}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {activeTab === "riders" ? sortedRiders.map((rider, idx) => (
                <RiderCard
                  key={rider._id}
                  rider={rider}
                  distance={`${rider.distanceKm?.toFixed(1) || 2.4} km`}
                  eta={`${rider.etaMinutes || 18} mins`}
                  estimatedFare={rider.estimatedFare || 2800}
                  position={idx + 1}
                  isSelected={selectedProvider?._id === rider._id}
                  onSelect={(id) => onSelectProvider({ type: "rider", data: rider })}
                />
              )) : sortedCompanies.map((company, idx) => (
                <CompanyCard
                  key={company._id}
                  company={company}
                  distance={`${company.serviceDistance || 3.2} km`}
                  eta={`${company.avgResponseTime || 25} mins`}
                  estimatedFare={company.estimatedFare || 3200}
                  position={idx + 1}
                  riderCount={company.activeRiders || 12}
                  isSelected={selectedProvider?._id === company._id}
                  onSelect={(id) => onSelectProvider({ type: "company", data: company })}
                />
              ))}
            </div>
          )}

          {/* Summary Card */}
          {selectedProvider && (
            <div className="sticky bottom-6 lg:static bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-emerald-200 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {selectedProvider.type === "rider" ? (
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Bike className="w-8 h-8 text-white" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg overflow-hidden">
                      <img src={selectedProvider.data.companyInfo.logo} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 truncate">
                      {selectedProvider.data.personalInfo?.firstName 
                        ? `${selectedProvider.data.personalInfo.firstName} ${selectedProvider.data.personalInfo.lastName}`
                        : selectedProvider.data.companyInfo.name
                      }
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <span>{selectedProvider.type === "rider" ? "Individual Rider" : "Delivery Company"}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{selectedProvider.data.performance.averageRating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:flex-shrink-0">
                  <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                    <div className="text-3xl font-bold text-green-600">₦{selectedProvider.data.estimatedFare?.toLocaleString()}</div>
                    <div className="text-sm text-green-700 font-medium">Total Fare</div>
                  </div>
                  <button className="flex-1 lg:flex-none bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg">
                    Confirm & Pay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = ({ title, subtitle, icon: Icon }) => (
  <div className="text-center py-32 max-w-md mx-auto">
    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
      <Icon className="w-20 h-20 text-gray-400" />
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
    <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
      Refresh Location
    </button>
  </div>
);

export default ProviderSelectionPage;

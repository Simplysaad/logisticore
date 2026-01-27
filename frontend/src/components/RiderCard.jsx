import React from "react";
import { Star, MapPin, Clock, Bike, Truck,DollarSign, CarFront, Shield, TrendingUp } from "lucide-react";

const RiderCard = ({ 
  rider, 
  distance, 
  eta, 
  estimatedFare, 
  isSelected, 
  onSelect,
  position 
}) => {
  const vehicleIcon = {
    bike: Bike,
    car: CarFront,
    van: Truck,
    truck: Truck,
  }[rider.vehicle.type] || Bike;

  const VehicleIcon = vehicleIcon;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          className={`w-4 h-4 transition-colors ${
            i < Math.floor(rating) 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-300"
          }`} 
        />
      );
    }
    return stars;
  };

  return (
    <div 
      className={`
        bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl 
        border-2 transition-all duration-300 group hover:-translate-y-2
        hover:border-green-300 cursor-pointer overflow-hidden
        ${isSelected 
          ? "ring-4 ring-green-500 ring-opacity-30 border-green-400 shadow-2xl scale-[1.02]" 
          : "border-transparent hover:border-green-200"
        }
      `}
      onClick={() => onSelect(rider._id)}
    >
      {/* Header: Rider Avatar + Name */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          {/* Rider Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
              {rider.personalInfo.profileImage ? (
                <img 
                  src={rider.personalInfo.profileImage} 
                  alt={`${rider.personalInfo.firstName} ${rider.personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {rider.personalInfo.firstName[0]}{rider.personalInfo.lastName[0]}
                  </span>
                </div>
              )}
              {/* Online Status */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Rider Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate mb-1">
              {rider.personalInfo.firstName} {rider.personalInfo.lastName}
            </h3>
            <div className="flex items-center gap-4 text-sm mb-2">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {renderStars(rider.performance.averageRating)}
                <span className="font-semibold text-gray-900">
                  {rider.performance.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-500">({rider.ratings?.totalReviews})</span>
              </div>
              {/* Verification Badge */}
              {rider.verification.verificationStatus === "approved" && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                  <Shield className="w-3 h-3" />
                  Verified
                </div>
              )}
            </div>
            {/* Vehicle */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <VehicleIcon className="w-5 h-5 text-emerald-600" />
              <span>{rider.vehicle.type.toUpperCase()}</span>
              <span className="font-mono">{rider.vehicle.plateNumber}</span>
            </div>
          </div>

          {/* Position Indicator */}
          {position && (
            <div className="flex-shrink-0 text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              #{position}
            </div>
          )}
        </div>
      </div>

      {/* Metrics Section */}
      <div className="p-6 grid grid-cols-3 gap-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50">
        {/* Distance */}
        <div className="text-center">
          <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{distance}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Away</div>
        </div>

        {/* ETA */}
        <div className="text-center">
          <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{eta}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">ETA</div>
        </div>

        {/* Fare */}
        <div className="text-center">
          <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">₦{estimatedFare.toLocaleString()}</div>
          <div className="text-xs text-gray-600 uppercase tracking-wide">Total Fare</div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-4 text-xs">
        <div className="flex items-center gap-2 p-3 bg-gray-50/50 rounded-2xl">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span>{rider.performance.completionRate}% Completion</span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-gray-50/50 rounded-2xl">
          <Clock className="w-4 h-4 text-emerald-600" />
          <span>{rider.performance.onTimeRate}% On-time</span>
        </div>
      </div>

      {/* Select Button */}
      <div className="px-6 pb-6 pt-2">
        <button className={`
          w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3
          ${isSelected
            ? "bg-green-600 text-white shadow-green-500/50 hover:shadow-green-500/75 hover:scale-[1.02]"
            : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:shadow-green-500/50"
          }
        `}>
          {isSelected ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Selected Rider</span>
            </>
          ) : (
            <>
              <Truck className="w-5 h-5" />
              <span>Select Rider</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RiderCard;

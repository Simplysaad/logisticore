// import React, { useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axiosInstance from "../utils/axios.util";
// import { CreditCard, Keyboard, Monitor, Star } from "lucide-react";

// // {
// //   logo, name, rating, price, deliveryTime, features, payment;
// // }

// const CompanyCard = ({ company, orderPrice, booked }) => {
//   const [isLoading, setisLoading] = useState(false);
//   const { orderId } = useParams();

//   if (!company) {
//     console.log("company is not provided");
//   }

//   const {
//     logo,
//     name = "Lorem Ipsum",
//     rating = 0,
//     price = orderPrice,
//     _id: companyId,
//     paymentMethods
//   } = company || {};
//   const handleConfirm = async (companyId) => {
//     try {
//       setisLoading(true);
//       const { data: response } = await axiosInstance.post(
//         `/orders/${orderId}/confirm`,
//         {
//           companyId,
//           paymentMethod: "pay_now"
//         }
//       );
//       console.log("Order confirmed:", response);

//       if (response?.success && response.data?.authorizationUrl) {
//         window.location.href = `${response.data?.authorizationUrl}`;
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setisLoading(false);
//     }
//   };
//   return (
//     <div className="border p-4 rounded  shadow  ">
//       <div id="companyInfo" className="flex gap-2 items-start">
//         <div className="company-image overflow-hidden bg-gray-500 size-12 rounded-full  mask-circle">
//           {/* <img src={logo} alt="" /> */}
//           <img src="/test.jpg" alt="" />
//         </div>
//         <div className="company-info  flex flex-col">
//           <p className="text-xl font-semibold text-green-950 p-0 m-0 capitalize">
//             {name}
//           </p>
//           <span className="flex gap-2 text-[.8rem] text-green-900/70">
//             <span className="flex gap-1 items-center">
//               <Star size={12} />
//               <span>{rating !== 0 ? rating?.toFixed(1) : "5.0"}</span>
//             </span>
//             <span>{Math.ceil(rating * 10)} Reviews</span>
//           </span>
//         </div>
//       </div>
//       <div className="card-body mt-4 flex flex-wrap  gap-4">
//         <div className="flex flex-col justify-start gap-0">
//           <span className="text-[0.7rem] text-green-700 p-0">Price</span>
//           <span className="text-[1.2rem] font-semibold text-green-900 p-0">
//             {"$" + price?.toLocaleString()}
//           </span>
//         </div>
//         {!booked && (
//           <div className="flex flex-col justify-start gap-0">
//             <span className="text-[0.7rem] text-green-700 p-0">
//               Payment Methods
//             </span>
//             <span className="text-[1.2rem] flex gap-2 capitalize font-semibold text-green-900 p-0">
//               {paymentMethods?.map((method) =>
//                 method === "pay now" ? (
//                   <CreditCard size={22} />
//                 ) : (
//                   <Keyboard size={22} />
//                 )
//               )}

//             </span>
//           </div>
//         )}
//         {/* <div className="flex flex-col justify-start gap-0">
//           <span className="text-[0.7rem] text-green-700 p-0">
//             Est. delivery time
//           </span>
//           <span className="text-[1.2rem] font-semibold text-green-900 p-0">
//             4 hours
//           </span>
//         </div> */}
//         {/* <div className="flex flex-col justify-start gap-0">
//           <span className="text-[0.7rem] text-green-700 p-0">Price</span>
//           <span className="text-[1.2rem] font-semibold text-green-900 p-0">
//             $3,500
//           </span>
//         </div>
//         <div className="flex flex-col justify-start gap-0">
//           <span className="text-[0.7rem] text-green-700 p-0">Price</span>
//           <span className="text-[1.2rem] font-semibold text-green-900 p-0">
//             $3,500
//           </span>
//         </div>
//         <div className="flex flex-col justify-start gap-0">
//           <span className="text-[0.7rem] text-green-700 p-0">Price</span>
//           <span className="text-[1.2rem] font-semibold text-green-900 p-0">
//             $3,500
//           </span>
//         </div> */}
//       </div>
//       <div className="cta  my-6">
//         {!booked && (
//           <button
//             onClick={() => handleConfirm(companyId)}
//             disabled={isLoading}
//             className={`0 hover:bg-green-500   text-white px-4 py-2 rounded shadow  ${
//               isLoading ? "bg-green-500" : "bg-green-700"
//             } `}
//           >
//             {` ${isLoading ? "Processing..." : "Book Now"}`}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyCard;

import React from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios.util";
import {
  CreditCard,
  Star,
  Clock,
  MapPin,
  Truck,
  CheckCircle,
  Shield,
  Smartphone,
  Zap,
  PackageCheck,
  DollarSign
} from "lucide-react";

const CompanyCard = ({
  company,
  orderPrice,
  booked = false,
  showDeliveryTime = true,
  showFeatures = true,
  onBook,
  variant = "selection", // "selection", "tracking", "profile"
  className = "",
  loading = false
}) => {
  const { orderId } = useParams();
  const [isBooking, setIsBooking] = React.useState(false);

  if (!company) {
    return null;
  }

  const {
    logo = "/default-logo.png",
    name = "Delivery Company",
    rating = 0,
    price,
    deliveryTime,
    features = [],
    paymentMethods = [],
    // serviceAreas = [],
    _id: companyId
  } = company;

  const handleBook = async () => {
    if (!onBook && !orderId) return;

    setIsBooking(true);
    try {
      if (onBook) {
        await onBook(companyId);
      } else {
        const { data: response } = await axiosInstance.post(
          `/orders/${orderId}/confirm`,
          { companyId, paymentMethod: "pay_now" }
        );

        if (response?.success && response.data?.authorizationUrl) {
          window.location.href = response.data.authorizationUrl;
        }
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsBooking(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "tracking":
        return "ring-2 ring-blue-200 bg-blue-50/50 hover:shadow -blue-200";
      case "profile":
        return "ring-2 ring-gray-200 bg-gradient-to-br from-slate-50 to-gray-50";
      default:
        return "hover:shadow -xl hover:-translate-y-1 hover:ring-green-200 ring-1 ring-transparent";
    }
  };

  const formatPrice = (price) => {
    return `₦${(price || orderPrice || 0).toLocaleString()}`;
  };

  return (
    <div
      className={`
      bg-white/80 backdrop-blur-sm rounded shadow -lg border border-white/50 transition-all duration-300
      ${getVariantStyles()} ${className}
    `}
    >
      {/* Company Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex not-md:flex-col items-start justify-between gap-4">
          <div className="flex  items-center gap-4 flex-1">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow -lg flex items-center justify-center text-2xl">
                {logo && logo !== "/test.jpg" ? (
                  <img
                    src={logo}
                    alt={name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                ) : (
                  <span className="font-bold text-white">{name.charAt(0)}</span>
                )}
              </div>
            </div>
            <div className="flex-1 not-md:flex-col min-w-0">
              <h3 className="text-xl font-bold text-gray-900 truncate">
                {name}
              </h3>
              <div className="flex not-md:flex-col items-start gap-2 mt-1">
                <div className="flex gap-0.5">{renderStars(rating)}</div>
                <span className="text-sm text-gray-600">
                  {rating?.toFixed(1) || "5.0"} (
                  {Math.ceil(rating * 10) || "100"} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge for booked/tracking */}
          {booked && (
            <div className="flex-shrink-0">
              <div className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                Booked
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6">
        {/* Price & Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="group p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl hover:shadow -md transition-all">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide mb-1 flex items-center">
              <DollarSign className="w-3 h-3 mr-1" />
              Estimated Price
            </p>
            <p className="text-2xl font-bold text-green-900">
              {formatPrice(price)}
            </p>
          </div>

          {showDeliveryTime && deliveryTime && (
            <div className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow -md transition-all">
              <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-1 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Delivery Time
              </p>
              <p className="text-xl font-bold text-blue-900">{deliveryTime}</p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        {showFeatures && features.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm uppercase tracking-wide">
              Key Features
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.slice(0, 6).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="truncate">{feature}</span>
                </div>
              ))}
              {features.length > 6 && (
                <div className="col-span-full text-center py-3 px-4 bg-gray-100 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors cursor-default">
                  +{features.length - 6} more features
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {!booked && paymentMethods?.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm uppercase tracking-wide">
              Payment Options
            </h4>
            <div className="flex gap-2 flex-wrap">
              {paymentMethods.map((method, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-xl"
                >
                  {method === "pay now" ? (
                    <CreditCard className="w-4 h-4" />
                  ) : (
                    <Smartphone className="w-4 h-4" />
                  )}
                  <span className="capitalize">{method.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      {!booked && (
        <div className="p-6 pt-0 g-green-50 rounded-b-3xl">
          <button
            onClick={handleBook}
            disabled={isBooking || loading}
            className={`
              w-full flex items-center justify-center gap-2 py-4 px-6 rounded font-bold text-lg shadow  -lg transition-all duration-300
              ${
                isBooking || loading
                  // ? "bg-green-400 cursor-not-allowed shadow"
                  ? "bg-green-400 cursor-not-allowed shadow"
                  // : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow -xl hover:-translate-y-0.5 text-white shadow -xl"
                  : "bg-green-600 border hover:bg-emerald-700 hover:shadow hover:-translate-y-0.5 text-white shadow"
              }
            `}
          >
            {isBooking ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Truck className="w-5 h-5" />
                <span>
                  {variant === "tracking" ? "View Details" : "Book Now"}
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;





// import React from "react";
// import { 
//   Star, MapPin, Clock, Building, Shield, TrendingUp, Award, Users, Truck 
// } from "lucide-react";

// const CompanyCard = ({ 
//   company, 
//   distance, 
//   eta, 
//   estimatedFare, 
//   isSelected, 
//   onSelect,
//   position,
//   riderCount 
// }) => {
//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       stars.push(
//         <Star 
//           key={i} 
//           className={`w-4 h-4 transition-colors ${
//             i < Math.floor(rating) 
//               ? "text-yellow-400 fill-yellow-400" 
//               : "text-gray-300"
//           }`} 
//         />
//       );
//     }
//     return stars;
//   };

//   const getTierBadge = (tier) => {
//     const badges = {
//       basic: { color: "bg-gray-100 text-gray-800", icon: "●" },
//       premium: { color: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white", icon: "★" },
//       enterprise: { color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white", icon: "◆" },
//     };
//     return badges[tier] || badges.basic;
//   };

//   return (
//     <div 
//       className={`
//         bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl 
//         border-2 transition-all duration-300 group hover:-translate-y-2
//         hover:border-emerald-300 cursor-pointer overflow-hidden
//         ${isSelected 
//           ? "ring-4 ring-emerald-500 ring-opacity-30 border-emerald-400 shadow-2xl scale-[1.02]" 
//           : "border-transparent hover:border-emerald-200"
//         }
//       `}
//       onClick={() => onSelect(company._id)}
//     >
//       {/* Header: Company Logo + Name */}
//       <div className="p-6 border-b border-gray-100">
//         <div className="flex items-start justify-between gap-4">
//           {/* Company Logo */}
//           <div className="relative flex-shrink-0">
//             <div className="w-20 h-20 rounded-2xl bg-gradient-to-br overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
//               {company.companyInfo.logo ? (
//                 <img 
//                   src={company.companyInfo.logo} 
//                   alt={company.companyInfo.name}
//                   className="w-full h-full object-contain bg-white p-3"
//                 />
//               ) : (
//                 <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
//                   <span className="text-xl font-bold text-white">
//                     {company.companyInfo.name.slice(0, 2).toUpperCase()}
//                   </span>
//                 </div>
//               )}
//               {/* Featured Badge */}
//               {company.account.isFeatured && (
//                 <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
//                   Featured
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Company Info */}
//           <div className="flex-1 min-w-0">
//             <div className="flex items-center gap-2 mb-2">
//               <h3 className="text-xl font-bold text-gray-900 truncate flex-1">
//                 {company.companyInfo.name}
//               </h3>
//               {/* Tier Badge */}
//               <div className={`px-2 py-1 rounded-full text-xs font-bold ${getTierBadge(company.account.tier).color}`}>
//                 {getTierBadge(company.account.tier).icon}
//               </div>
//             </div>
            
//             <div className="flex items-center gap-4 text-sm mb-3">
//               {/* Rating */}
//               <div className="flex items-center gap-1">
//                 {renderStars(company.performance.averageRating)}
//                 <span className="font-semibold text-gray-900">
//                   {company.performance.averageRating.toFixed(1)}
//                 </span>
//                 <span className="text-gray-500">({company.ratings.totalReviews})</span>
//               </div>
//               {/* Verification */}
//               {company.verification.verificationStatus === "approved" && (
//                 <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-medium">
//                   <Shield className="w-3 h-3" />
//                   Verified
//                 </div>
//               )}
//             </div>

//             {/* Fleet Info */}
//             <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
//               <Truck className="w-4 h-4 text-emerald-600" />
//               <span>{company.operations.fleetSize || "50+"} vehicles</span>
//               {riderCount && (
//                 <span>• {riderCount} active riders</span>
//               )}
//             </div>
//           </div>

//           {/* Position */}
//           {position && (
//             <div className="flex-shrink-0 text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
//               #{position}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Metrics Section */}
//       <div className="p-6 grid grid-cols-3 gap-6 bg-gradient-to-r from-emerald-50/50 to-green-50/50">
//         {/* Distance */}
//         <div className="text-center">
//           <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-gray-900">{distance}</div>
//           <div className="text-xs text-gray-600 uppercase tracking-wide">Service Area</div>
//         </div>

//         {/* ETA */}
//         <div className="text-center">
//           <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-gray-900">{eta}</div>
//           <div className="text-xs text-gray-600 uppercase tracking-wide">Avg Response</div>
//         </div>

//         {/* Fare */}
//         <div className="text-center">
//           <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-green-600">₦{estimatedFare.toLocaleString()}</div>
//           <div className="text-xs text-gray-600 uppercase tracking-wide">Starting Fare</div>
//         </div>
//       </div>

//       {/* Performance Stats */}
//       <div className="p-6 pt-0 grid grid-cols-2 gap-4 text-xs">
//         <div className="flex items-center gap-2 p-3 bg-gray-50/50 rounded-2xl">
//           <TrendingUp className="w-4 h-4 text-emerald-600" />
//           <span>{company.performance.completionRate}% Success</span>
//         </div>
//         <div className="flex items-center gap-2 p-3 bg-gray-50/50 rounded-2xl">
//           <Clock className="w-4 h-4 text-green-600" />
//           <span>{company.performance.avgDeliveryTime || "25"} min avg</span>
//         </div>
//       </div>

//       {/* Select Button */}
//       <div className="px-6 pb-6 pt-2">
//         <button className={`
//           w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3
//           ${isSelected
//             ? "bg-emerald-600 text-white shadow-emerald-500/50 hover:shadow-emerald-500/75 hover:scale-[1.02]"
//             : "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:shadow-emerald-500/50"
//           }
//         `}>
//           {isSelected ? (
//             <>
//               <Building className="w-5 h-5" />
//               <span>Selected Company</span>
//             </>
//           ) : (
//             <>
//               <Truck className="w-5 h-5" />
//               <span>Select Company</span>
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CompanyCard;

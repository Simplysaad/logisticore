import React, { useState, useEffect } from "react";
import MessageLoader from "../../components/messageLoader";
import { Motorbike } from "lucide-react";
// import { format } from "date-fns";

const RiderMatched = () => {
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(0);

  // Simulated rider data - replace with API call
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setRider({
        id: "RDR001",
        name: "Chinedu Okeke",
        phone: "+234 813 456 7890",
        vehicle: "Honda ACE Motorcycle (Red)",
        rating: 4.8,
        eta: "15 mins", // From pickup location
        distance: "2.4 km away",
        profileImage: "/api/placeholder/80/80"
      });
      setLoading(false);
      setCountdown(15 * 60); // 15 minutes in seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // ETA Countdown
  useEffect(() => {
    if (!rider || countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rider, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 px-2 flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          {/* <p className="text-gray-600 font-medium">Finding your rider...</p> */}
          <MessageLoader interval={1500}/>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-8 px-2">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Rider Matched!
          </h1>
          <p className="text-gray-600">Your delivery is on its way</p>
        </div>

        {/* Rider Card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-6 mb-8 border border-white/50">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={rider.profileImage}
              alt={rider.name}
              className="w-16 h-16 rounded-2xl object-cover border-4 border-emerald-100"
            />
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-xl text-gray-900 mb-1">
                {rider.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(rider.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>({rider.rating})</span>
                </div>
              </div>
              <div className="rider-vehicle flex gap-1">
                <Motorbike/>
                <p className="text-sm text-gray-500">{rider.vehicle}</p>
              </div>
            </div>
          </div>

          {/* Contact & ETA */}
          <div className="grid  grid-cols-1 md:grid-cols-2  gap-4 mb-6">
            <button className="flex hover:border-emerald-200 items-center justify-center gap-2 px-4 py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Rider
            </button>
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl text-center shadow-lg">
              <div className="text-2xl font-bold mb-1">
                {formatTime(countdown)}
              </div>
              <div className="text-xs opacity-90 uppercase tracking-wide">
                ETA
              </div>
              <p className="text-xs mt-1 opacity-75">{rider.distance}</p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Phone</span>
              <a
                href={`tel:${rider.phone}`}
                className="font-medium text-gray-900 hover:text-emerald-600 transition-colors"
              >
                {rider.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Track Button */}
        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 mb-6">
          Track Live Location
        </button>

        {/* Cancel Option */}
        <button className="w-full border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-200 hover:bg-gray-50">
          Cancel Delivery
        </button>
      </div>
    </div>
  );
};

export default RiderMatched;

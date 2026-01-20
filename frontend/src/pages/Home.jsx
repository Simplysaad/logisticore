import React, { useState } from "react";
import {
  Package,
  MapPin,
  Clock,
  Smartphone,
  Truck,
  Star,
  Users,
  DollarSign,
  CheckCircle,
  Bike,
  CarFront,
  Shield,
  Award,
  Play
} from "lucide-react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("customer");

  const stats = [
    // { label: "Lightning Fast", value: "18 min avg delivery", icon: Clock },
    { label: "Verified Riders", value: "5,000+", icon: Users },
    { label: "Success Rate", value: "98.7%", icon: CheckCircle },
    { label: "Trusted Businesses", value: "500+", icon: Award }
  ];

  const audienceSections = {
    customer: {
      title: "Send Packages in Minutes",
      subtitle: "Reliable delivery at your fingertips",
      features: [
        "Nearest rider matched instantly",
        "Live GPS tracking",
        "Paystack or cash on delivery",
        "18 min average delivery time"
      ]
    },
    rider: {
      title: "Earn Money Delivering",
      subtitle: "Flexible work on your schedule",
      features: [
        "Earn ₦2,000-₦5,000 per day",
        "Weekly bank payouts",
        "Real-time ride requests",
        "No vehicle rental fees"
      ]
    },
    business: {
      title: "Scale Your E-commerce",
      subtitle: "Enterprise delivery for businesses",
      features: [
        "Bulk order management",
        "API integration available",
        "Real-time delivery analytics",
        "Priority rider matching"
      ]
    }
  };

  const currentAudience = audienceSections[activeTab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-20">
            {/* Hero Content */}
            <div className="lg:pt-8 xl:pt-0 space-y-8">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-green-900">
                  LIVE IN LAGOS
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-green-900 bg-clip-text text-transparent leading-tight">
                  Nigeria's Uber
                  <br />
                  <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    for Deliveries
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-lg">
                  Skip the 3-hour wait. Get your package delivered in
                  <span className="font-bold text-green-600">
                    {" "}
                    18 minutes
                  </span>{" "}
                  by the nearest verified rider.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/orders"
                  className="group relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-6 px-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg flex items-center gap-3"
                >
                  <Package className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Send Package Now
                </a>
                <a
                  href="#watch-demo"
                  className="flex items-center gap-3 px-8 py-6 border-2 border-white/50 bg-white/80 backdrop-blur-xl hover:bg-white hover:shadow-2xl rounded-3xl font-semibold text-gray-900 transition-all duration-300"
                >
                  <Play className="w-6 h-6" />
                  Watch Live Demo
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>Paystack Secured</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={idx}
                        className="group text-center p-6 rounded-2xl hover:bg-white/50 transition-all"
                      >
                        <Icon className="w-12 h-12 mx-auto mb-3 text-green-600 group-hover:scale-110 transition-transform" />
                        <p className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Phone Mockup */}
              <div className="absolute -bottom-4 -right-4 lg:-right-12 w-64 lg:w-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 p-4 rounded-3xl shadow-2xl border border-white/30">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-2xl flex items-center justify-center">
                        <Bike className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Ahmed</p>
                        <p className="text-xs text-green-600">2.4km away</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full w-3/4 animate-pulse" />
                    </div>
                    <p className="text-sm font-bold text-green-600">₦2,800</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Selector */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent mb-6">
            Perfect for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're sending packages, delivering for cash, or scaling
            your business.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16 lg:mb-20">
          {[
            { id: "customer", label: "Send Package", icon: Package },
            { id: "rider", label: "Become Rider", icon: Bike },
            { id: "business", label: "Business", icon: Truck }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-3xl font-semibold transition-all duration-300 shadow-lg ${
                activeTab === id
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl hover:shadow-3xl"
                  : "bg-white/80 backdrop-blur-xl hover:bg-white hover:shadow-xl border border-gray-200 hover:-translate-y-1"
              }`}
            >
              <Icon className="w-6 h-6" />
              {label}
            </button>
          ))}
        </div>

        {/* Audience Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">
                {currentAudience.title}
              </h3>
              <p className="text-xl text-gray-600 mb-8 lg:mb-12">
                {currentAudience.subtitle}
              </p>
            </div>

            <ul className="space-y-4 text-lg">
              {currentAudience.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white font-bold text-sm">
                      {idx + 1}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-8">
              <a
                href={`#${activeTab}`}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg"
              >
                {activeTab === "customer"
                  ? "Send Package Now"
                  : activeTab === "rider"
                  ? "Start Earning"
                  : "Get Business API"}
                <Truck className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <Package className="w-12 h-12 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Customer
                  </h4>
                  <p className="text-gray-600">Track every delivery live</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <Bike className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Rider
                  </h4>
                  <p className="text-gray-600">Cash out weekly</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/50 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                    <Truck className="w-12 h-12 text-green-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    Business
                  </h4>
                  <p className="text-gray-600">API + Analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent mb-6">
            Why Choose Logisticore?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built for Nigeria's chaotic roads, powered by smart technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: MapPin,
              title: "Smart Matching",
              desc: "Nearest rider within 5km matched instantly"
            },
            {
              icon: Clock,
              title: "Lightning Fast",
              desc: "18 minute average delivery time"
            },
            {
              icon: Smartphone,
              title: "Live Tracking",
              desc: "Watch your rider arrive in real-time"
            },
            {
              icon: DollarSign,
              title: "Transparent Pricing",
              desc: "No hidden fees. Paystack secured"
            }
          ].map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="group relative p-10 rounded-3xl bg-white/70 backdrop-blur-xl hover:bg-white hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-white/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hackathon Badge */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-xl rounded-3xl mb-8">
            {/* <Award className="w-6 h-6" />
            <span className="text-xl font-bold">MTS 2.0 Hackathon Finalist</span> */}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Built Live for Nigeria
          </h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
            From hackathon MVP to Lagos streets. Join Nigeria's fastest delivery
            revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#demo"
              className="bg-white text-green-600 font-bold py-4 px-12 rounded-3xl hover:bg-gray-50 transition-all shadow-xl"
            >
              Live Demo
            </a>
            <a
              href="#github"
              className="border-2 border-white/50 text-white font-bold py-4 px-12 rounded-3xl hover:bg-white/10 backdrop-blur-xl transition-all"
            >
              View Code
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-slate-900/50 to-transparent backdrop-blur-xl pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                Logisticore
              </h4>
              <p className="text-gray-400 mb-6">
                Nigeria's fastest delivery platform. 18 minutes or less.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <Package className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Customers</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Send Package
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Riders</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Earnings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Requirements
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-white mb-6">Company</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-12 text-center text-gray-500 text-sm">
            <p>
              &copy; {new Date().getFullYear()} Logisticore. Built in Nigeria
              for Nigerians.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;

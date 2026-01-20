const Footer = ({ minimal = true }) => (
  <>
    {minimal ? (
      <footer className="bg-green-500 relative bottom-0 w-full text-white py-3 mt-8 shadow-inner">
        <div className="container mx-auto px-4 text-center text-sm">
          © 2025 Logisticore All rights reserved.
        </div>
      </footer>
    ) : (
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
    )}
  </>
);

export default Footer;

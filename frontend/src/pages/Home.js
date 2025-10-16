import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-100 mb-8">
              <span className="text-blue-600 text-sm font-medium">🚀 Trusted by 10,000+ professionals</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              The modern way to
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                work with talent
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl lg:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with verified professionals. Streamline projects. Get work done faster with our all-in-one platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {user ? (
                <Link to="/dashboard" className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg">
                    Start for free
                  </Link>
                  <Link to="/login" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors">
                    Book a demo
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">24h</div>
                <div className="text-gray-500 text-sm">Avg. response time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
                <div className="text-gray-500 text-sm">Client rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-1">100+</div>
                <div className="text-gray-500 text-sm">Skills available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything you need to scale
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From finding talent to managing projects and payments - we've got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart matching</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI finds the perfect talent for your project based on skills, availability, and budget.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get matched with professionals in hours, not weeks. Start your project tomorrow.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure payments</h3>
                <p className="text-gray-600 leading-relaxed">
                  Escrow protection, milestone payments, and secure transactions for peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who trust GigConnect for their projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link to="/dashboard" className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors inline-block">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/register" className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors inline-block">
                    Create free account
                  </Link>
                  <Link to="/login" className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors inline-block">
                    Contact sales
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-500">
              &copy; 2024 GigConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
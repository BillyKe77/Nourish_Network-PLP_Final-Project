export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Updated Colors */}
      <section className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 text-white py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-4xl">🤝</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nourish Network
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting surplus food with those in need. Together, we're fighting hunger and reducing waste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/food"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg shadow-lg hover:bg-orange-50 font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                🍽️ Browse Donations
              </a>
              <a 
                href="/register"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-orange-600 font-semibold text-lg transition-all duration-300"
              >
                🤝 Join Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We are the effective link between food donors and deserving recipients. We are actively contributing to the attainment of <span className="font-semibold text-orange-600">SDG 12</span> by reducing food waste and promoting responsible consumption.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              The spirit of <span className="font-semibold text-orange-600">Ubuntu</span> powers us to support the vulnerable by ensuring that surplus food reaches those in need.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Donors */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">For Donors</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Post surplus food easily
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Connect with local recipients
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Reduce food waste
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Make a real impact
                </li>
              </ul>
            </div>

            {/* For Recipients */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">For Recipients</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Browse available food
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Claim food easily
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Coordinate pickup
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Access nutritious meals
                </li>
              </ul>
            </div>

            {/* Impact */}
            <div className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Our Impact</h3>
              <ul className="text-gray-600 space-y-2 text-left">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Reduce food waste
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Fight hunger locally
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Build community
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-2">✓</span>
                  Support SDG 12
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SDG 12 Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4">Supporting SDG 12</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl mb-6 leading-relaxed">
              We are committed to <span className="font-bold">Sustainable Development Goal 12</span> - ensuring sustainable consumption and production patterns.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-orange-500 p-6 rounded-lg">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Target 12.3</h3>
                <p>By 2030, halve per capita global food waste at the retail and consumer levels and reduce food losses along production and supply chains.</p>
              </div>
              <div className="bg-orange-500 p-6 rounded-lg">
                <div className="text-4xl mb-4">💚</div>
                <h3 className="text-xl font-bold mb-3">Our Contribution</h3>
                <p>We directly address food waste by connecting surplus food with those who need it most, creating a circular food economy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join our community of donors and recipients working together to reduce food waste and fight hunger.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/register?role=donor"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 font-semibold text-lg transition-colors duration-300"
            >
              Become a Donor
            </a>
            <a 
              href="/register?role=recipient"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-800 font-semibold text-lg transition-all duration-300"
            >
              Join as Recipient
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-600">100+</div>
              <div className="text-gray-600">Meals Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">50+</div>
              <div className="text-gray-600">Active Donors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">30+</div>
              <div className="text-gray-600">Communities Served</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">1T+</div>
              <div className="text-gray-600">Food Saved</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
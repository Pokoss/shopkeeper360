import React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export default function ReservationsScreen() {
  return (
    <div>
<Navbar/>
    
    <div className="pt-20 pb-24 font-sans bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-700">Reserve a Table</h1>
          <p className="text-gray-600 mt-4">
            Planning a special dinner or just craving your favorite dish? Book your table below.
          </p>
        </div>

        {/* Form */}
        <form className="bg-white shadow-xl rounded-xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="+256 700 000000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Number of Guests</label>
              <input
                type="number"
                min="1"
                placeholder="2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Special Requests (Optional)</label>
            <textarea
              rows="4"
              placeholder="Let us know if you have any special requests..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

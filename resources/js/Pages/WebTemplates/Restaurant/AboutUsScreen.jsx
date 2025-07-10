import React from "react";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

const team = [
  {
    name: "Chef Moses",
    role: "Head Chef",
    image: "/images/products/olive-oil-spray-coconut-small-20250303054331959-hvl3uiye9wnmnxbj.jpg",
  },
  {
    name: "Sarah K.",
    role: "Restaurant Manager",
    image: "/images/products/olive-oil-spray-coconut-small-20250303054331959-hvl3uiye9wnmnxbj.jpg",
  },
  {
    name: "Alex T.",
    role: "Pastry Chef",
    image: "/images/products/olive-oil-spray-coconut-small-20250303054331959-hvl3uiye9wnmnxbj.jpg",
  },
];

export default function AboutUsScreen() {
  return (
    <div>
<Navbar/>
    
    <div className="pt-20 font-sans text-gray-800">
      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">Who We Are</h2>
            <p className="text-lg mb-4">
              At <strong>Flavor Haven</strong>, we believe food is more than just taste — it’s about experience, culture, and connection.
            </p>
            <p className="text-md">
              Whether you're dining in, ordering out, or celebrating something special, we ensure every dish is served with warmth and creativity.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/images/products/olive-oil-spray-coconut-small-20250303054331959-hvl3uiye9wnmnxbj.jpg"
              alt="Kitchen Team"
              className="rounded-xl shadow-lg object-cover w-full h-80"
            />
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-orange-50 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-4 text-orange-700">Our Mission</h3>
          <p className="text-lg text-gray-700">
            To bring people together through authentic cuisine, heartfelt service, and unforgettable flavors.
          </p>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Meet the Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition p-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-60 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-orange-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Form */}
      <section className="bg-gray-100 py-20" id="contact">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-orange-700">Contact Us</h2>
          <form className="bg-white shadow-xl rounded-lg p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700 transition"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-orange-600 text-white py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Want to experience it yourself?</h3>
          <p className="mb-6">Come dine with us or book your special event — we’ll make it unforgettable.</p>
          <a
            href="/#menu"
            className="inline-block bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            View Our Menu
          </a>
        </div>
      </section>
      </div>
      <Footer/>
    </div>
  );
}
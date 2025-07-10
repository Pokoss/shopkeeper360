import { Carousel } from '@material-tailwind/react';
import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';



function HomeScreen() {
    return (
        <div>
            <Navbar />
            <div className="bg-white text-gray-800">
                {/* Hero Carousel */}
                <div className="relative">
                    <Carousel
                        autoPlay
                        infiniteLoop
                        interval={5000}
                        className="h-[80vh]"
                    >
                        <div className="h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(http://127.0.0.1:8000/images/products/olive-oil-spray-coconut-small-20250303054331959-hvl3uiye9wnmnxbj.jpg)' }}>
                            <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="text-center text-white px-4">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Experience Taste Like Never Before</h1>
                                    <p className="text-lg md:text-xl">Delicious meals made with love and fresh ingredients.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="h-[80vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1543357480-c60d09fbd232)' }}>
                            <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="text-center text-white px-4">
                                    <h1 className="text-4xl md:text-6xl font-bold mb-4">A Culinary Journey Awaits</h1>
                                    <p className="text-lg md:text-xl">Explore our menu and taste the difference today.</p>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>

                {/* About Section */}
                <section className="py-16 px-6 md:px-20 text-center">
                    <h2 className="text-3xl font-bold mb-4">Welcome to Our Restaurant</h2>
                    <p className="text-lg max-w-2xl mx-auto">
                        Our restaurant blends authentic flavors, locally sourced ingredients, and a cozy atmosphere to bring you an unforgettable dining experience. Whether you're stopping by for a casual lunch or a romantic dinner, we’ve got something for everyone.
                    </p>
                </section>

                   {/* Call to Action */}
                <section className="py-16 px-6 md:px-20 text-center bg-orange-600 text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
                    <p className="text-lg mb-6">Reserve a table or place your order online with ease.</p>
                    <button className="bg-white text-orange-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                        View Full Menu
                    </button>
                </section>

                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
                            <p className="text-gray-600 text-lg">Delicious dishes crafted with love, using the freshest ingredients.</p>
                        </div>

                        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: 'Grilled Chicken',
                                    price: 'UGX 25,000',
                                    description: 'Juicy marinated chicken grilled to perfection, served with seasonal vegetables.',
                                    image: '/images/food.jpg'
                                },
                                {
                                    name: 'Classic Cheeseburger',
                                    price: 'UGX 18,000',
                                    description: 'A tasty beef patty with melted cheese, fresh lettuce, tomato, and our signature sauce.',
                                    image: '/images/food.jpg'
                                },
                                {
                                    name: 'Spaghetti Carbonara',
                                    price: 'UGX 22,000',
                                    description: 'Creamy pasta tossed with bacon, parmesan, and cracked black pepper.',
                                    image: '/images/food.jpg'
                                },
                                {
                                    name: 'Ugandan Rolex',
                                    price: 'UGX 10,000',
                                    description: 'A local favorite! Chapati rolled with eggs, tomatoes, and onions.',
                                    image: '/images/food.jpg'
                                },
                                {
                                    name: 'Tilapia Fillet',
                                    price: 'UGX 28,000',
                                    description: 'Fresh lake tilapia fillet fried and served with fries and salad.',
                                    image: '/images/food.jpg'
                                },
                                {
                                    name: 'Fruit Platter Primaveran Treasure With a hint of colon',
                                    price: 'UGX 12,000',
                                    description: 'A colorful selection of seasonal fruits, perfect to refresh your day.',
                                    image: '/images/food.jpg'
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                                            <span className="text-primary font-bold">{item.price}</span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                

                {/* Featured Dishes */}
                <section className="bg-gray-100 py-16 px-6 md:px-20">
                    <h2 className="text-3xl font-bold text-center mb-12">Chef's Specials</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((dish) => (
                            <div key={dish} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                                <img
                                    src={`http://127.0.0.1:8000/images/products/olive-oil-spray-coconut-small-20250303054331959-hvl3uiye9wnmnxbj.jpg`}
                                    alt="Dish"
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Delicious Dish #{dish}</h3>
                                    <p className="text-gray-600">A perfect blend of taste and creativity, prepared fresh by our top chefs.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 px-6 md:px-20 text-center">
                    <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                    <p className="text-lg">123 Food Street, Kampala, UG | +256 700 000000 | info@restaurant.com</p>
                    <p className="mt-2">Open: Mon - Sun | 9AM - 10PM</p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default HomeScreen;
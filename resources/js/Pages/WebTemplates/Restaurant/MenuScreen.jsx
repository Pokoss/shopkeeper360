import React from 'react'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'

function MenuScreen() {
  return (
    <div>
        <Navbar/>
        <section className="py-6 bg-white">
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
<Footer/>
    </div>
  )
}

export default MenuScreen
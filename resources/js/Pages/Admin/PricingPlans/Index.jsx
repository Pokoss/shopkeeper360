import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, router } from '@inertiajs/react';

function PricingPlansIndex({ auth, plans }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        price: '',
        currency: 'UGX',
        badge: '',
        features: [''],
        color: '#6366f1',
        is_highlighted: false,
        is_active: true,
        sort_order: 0
    });
    const [errors, setErrors] = useState({});

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const openAddModal = () => {
        setFormData({
            name: '',
            slug: '',
            price: '',
            currency: 'UGX',
            badge: '',
            features: [''],
            color: '#6366f1',
            is_highlighted: false,
            is_active: true,
            sort_order: 0
        });
        setErrors({});
        setIsAddModalOpen(true);
    };

    const openEditModal = (plan) => {
        setEditingPlan(plan);
        setFormData({
            name: plan.name,
            slug: plan.slug,
            price: plan.price,
            currency: plan.currency,
            badge: plan.badge || '',
            features: plan.features || [''],
            color: plan.color,
            is_highlighted: plan.is_highlighted,
            is_active: plan.is_active,
            sort_order: plan.sort_order
        });
        setErrors({});
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditingPlan(null);
        setFormData({
            name: '',
            slug: '',
            price: '',
            currency: 'UGX',
            badge: '',
            features: [''],
            color: '#6366f1',
            is_highlighted: false,
            is_active: true,
            sort_order: 0
        });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const removeFeature = (index) => {
        if (formData.features.length > 1) {
            const newFeatures = formData.features.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, features: newFeatures }));
        }
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        router.post('/admin/pricing-plans', formData, {
            onSuccess: () => {
                closeModals();
            },
            onError: (errors) => {
                setErrors(errors);
            }
        });
    };

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        router.put(`/admin/pricing-plans/${editingPlan.id}`, formData, {
            onSuccess: () => {
                closeModals();
            },
            onError: (errors) => {
                setErrors(errors);
            }
        });
    };

    const handleDelete = (plan) => {
        if (confirm(`Are you sure you want to delete the "${plan.name}" pricing plan?`)) {
            router.delete(`/admin/pricing-plans/${plan.id}`);
        }
    };

    const filteredPlans = plans.filter(plan =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout auth={auth}>
            <Head title="Pricing Plans" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Pricing Plans</h1>
                        <p className="text-gray-600 mt-1">Manage subscription pricing plans</p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Pricing Plan
                    </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search pricing plans..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`bg-white rounded-lg shadow-md overflow-hidden ${
                                plan.is_highlighted ? 'ring-2 ring-purple-500' : ''
                            }`}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-2xl font-bold" style={{ color: plan.color }}>
                                        {plan.name}
                                    </h3>
                                    {plan.badge && (
                                        <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold rounded-full">
                                            {plan.badge}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-gray-900">
                                        {plan.currency} {Number(plan.price).toLocaleString()}
                                    </span>
                                    <span className="text-gray-600">/month</span>
                                </div>

                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-2">Features:</h4>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-600">
                                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className={`px-2 py-1 text-xs rounded ${
                                        plan.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {plan.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        Sort: {plan.sort_order}
                                    </span>
                                </div>

                                <div className="flex gap-2 pt-4 border-t">
                                    <button
                                        onClick={() => openEditModal(plan)}
                                        className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(plan)}
                                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPlans.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No pricing plans found</p>
                    </div>
                )}

                {/* Add/Edit Modal */}
                {(isAddModalOpen || isEditModalOpen) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-4">
                                    {isAddModalOpen ? 'Add Pricing Plan' : 'Edit Pricing Plan'}
                                </h2>
                                
                                <form onSubmit={isAddModalOpen ? handleSubmitAdd : handleSubmitEdit}>
                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Slug *
                                            </label>
                                            <input
                                                type="text"
                                                name="slug"
                                                value={formData.slug}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
                                        </div>

                                        {/* Price & Currency */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Price *
                                                </label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleInputChange}
                                                    step="0.01"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    required
                                                />
                                                {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Currency *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="currency"
                                                    value={formData.currency}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                    required
                                                />
                                                {errors.currency && <p className="text-red-600 text-sm mt-1">{errors.currency}</p>}
                                            </div>
                                        </div>

                                        {/* Badge & Color */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Badge
                                                </label>
                                                <input
                                                    type="text"
                                                    name="badge"
                                                    value={formData.badge}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., Most Popular"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                                {errors.badge && <p className="text-red-600 text-sm mt-1">{errors.badge}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Color
                                                </label>
                                                <input
                                                    type="color"
                                                    name="color"
                                                    value={formData.color}
                                                    onChange={handleInputChange}
                                                    className="w-full h-10 px-1 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                />
                                                {errors.color && <p className="text-red-600 text-sm mt-1">{errors.color}</p>}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Features *
                                            </label>
                                            {formData.features.map((feature, index) => (
                                                <div key={index} className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={feature}
                                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                        placeholder={`Feature ${index + 1}`}
                                                        required
                                                    />
                                                    {formData.features.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFeature(index)}
                                                            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addFeature}
                                                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Add Feature
                                            </button>
                                            {errors.features && <p className="text-red-600 text-sm mt-1">{errors.features}</p>}
                                        </div>

                                        {/* Sort Order */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Sort Order
                                            </label>
                                            <input
                                                type="number"
                                                name="sort_order"
                                                value={formData.sort_order}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                            {errors.sort_order && <p className="text-red-600 text-sm mt-1">{errors.sort_order}</p>}
                                        </div>

                                        {/* Checkboxes */}
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="is_highlighted"
                                                    checked={formData.is_highlighted}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Highlighted</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="is_active"
                                                    checked={formData.is_active}
                                                    onChange={handleInputChange}
                                                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Active</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={closeModals}
                                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                                        >
                                            {isAddModalOpen ? 'Add Plan' : 'Update Plan'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default PricingPlansIndex;

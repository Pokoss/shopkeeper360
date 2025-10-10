import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, router } from '@inertiajs/react';

function MeasurementsIndex({ auth, measurements }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMeasurement, setEditingMeasurement] = useState(null);
    const [formData, setFormData] = useState({ name: '', abbriviation: '' });
    const [errors, setErrors] = useState({});

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const openAddModal = () => {
        setFormData({ name: '', abbriviation: '' });
        setErrors({});
        setIsAddModalOpen(true);
    };

    const openEditModal = (measurement) => {
        setEditingMeasurement(measurement);
        setFormData({ name: measurement.name, abbriviation: measurement.abbriviation });
        setErrors({});
        setIsEditModalOpen(true);
    };

    const closeModals = () => {
        setIsAddModalOpen(false);
        setIsEditModalOpen(false);
        setEditingMeasurement(null);
        setFormData({ name: '', abbriviation: '' });
        setErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmitAdd = (e) => {
        e.preventDefault();
        router.post('/admin/measurements', formData, {
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
        router.put(`/admin/measurements/${editingMeasurement.id}`, formData, {
            onSuccess: () => {
                closeModals();
            },
            onError: (errors) => {
                setErrors(errors);
            }
        });
    };

    const filteredMeasurements = measurements.filter(measurement =>
        measurement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        measurement.abbriviation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout auth={auth}>
            <Head title="Measurements" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Measurements</h1>
                        <p className="text-gray-600 mt-1">Manage product measurement units</p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Measurement
                    </button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search measurements..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Measurements Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-purple-600 to-indigo-600">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Abbreviation
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Created At
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredMeasurements.length > 0 ? (
                                filteredMeasurements.map((measurement) => (
                                    <tr key={measurement.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {measurement.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{measurement.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                                                {measurement.abbriviation}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(measurement.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => openEditModal(measurement)}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        No measurements found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 rounded-t-lg">
                            <h3 className="text-xl font-bold text-white">Add Measurement Unit</h3>
                        </div>
                        <form onSubmit={handleSubmitAdd} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Measurement Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="e.g., Kilogram, Liter, Piece"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Abbreviation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="abbriviation"
                                        value={formData.abbriviation}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.abbriviation ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="e.g., kg, L, pcs"
                                        required
                                    />
                                    {errors.abbriviation && <p className="text-red-500 text-xs mt-1">{errors.abbriviation}</p>}
                                    <p className="text-xs text-gray-500 mt-1">Short form of the measurement unit</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                                >
                                    Add Measurement
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 rounded-t-lg">
                            <h3 className="text-xl font-bold text-white">Edit Measurement Unit</h3>
                        </div>
                        <form onSubmit={handleSubmitEdit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Measurement Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="e.g., Kilogram, Liter, Piece"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Abbreviation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="abbriviation"
                                        value={formData.abbriviation}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent ${errors.abbriviation ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="e.g., kg, L, pcs"
                                        required
                                    />
                                    {errors.abbriviation && <p className="text-red-500 text-xs mt-1">{errors.abbriviation}</p>}
                                    <p className="text-xs text-gray-500 mt-1">Short form of the measurement unit</p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                                >
                                    Update Measurement
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModals}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

export default MeasurementsIndex;

import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/components/admin/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

function AdminUsers({ auth, adminUsers }) {
    const [editingUser, setEditingUser] = useState(null);
    const [adminLevel, setAdminLevel] = useState(0);

    const handleUpdateAdminLevel = (userId) => {
        router.post(`/admin/users/${userId}/admin-level`, {
            admin_level: adminLevel
        }, {
            onSuccess: () => {
                setEditingUser(null);
                alert('Admin level updated successfully');
            },
            onError: () => {
                alert('Error updating admin level');
            }
        });
    };

    const startEditing = (user) => {
        setEditingUser(user.id);
        setAdminLevel(user.admin);
    };

    return (
        <AdminLayout auth={auth}>
            <Head title="Admin Users" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Users</h1>
                        <p className="text-gray-600 mt-1">Manage users with administrative privileges</p>
                    </div>
                    <Link href="/admin/users" className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        All Users
                    </Link>
                </div>

                {/* Admin Level Info */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-semibold text-purple-900 mb-2">Admin Level Permissions</h3>
                    <ul className="text-sm text-purple-800 space-y-1">
                        <li><strong>Level 1:</strong> Basic admin - Can view users, companies, and analytics</li>
                        <li><strong>Level 2+:</strong> Super admin - Can modify admin levels, access system settings</li>
                        <li><strong>Level 3+:</strong> Custom permissions (define as needed)</li>
                    </ul>
                </div>

                {/* Admin Users Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Admin Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Login</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Member Since</th>
                                    {auth.user.admin >= 2 && (
                                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {adminUsers.data && adminUsers.data.length > 0 ? (
                                    adminUsers.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-purple-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                            {user.name}
                                                            {user.id === auth.user.id && (
                                                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold">You</span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{user.email}</div>
                                                {user.phone && <div className="text-sm text-gray-500">{user.phone}</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {editingUser === user.id && auth.user.admin >= 2 ? (
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="10"
                                                            value={adminLevel}
                                                            onChange={(e) => setAdminLevel(parseInt(e.target.value))}
                                                            className="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-600"
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateAdminLevel(user.id)}
                                                            className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingUser(null)}
                                                            className="px-2 py-1 bg-gray-600 text-white text-xs rounded hover:bg-gray-700"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                                                        user.admin >= 2 
                                                            ? 'bg-purple-100 text-purple-800' 
                                                            : 'bg-indigo-100 text-indigo-800'
                                                    }`}>
                                                        Level {user.admin}
                                                        {user.admin >= 2 && ' (Super Admin)'}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.last_login_at ? (
                                                    <div>
                                                        <div>{new Date(user.last_login_at).toLocaleDateString()}</div>
                                                        <div className="text-xs text-gray-400">{new Date(user.last_login_at).toLocaleTimeString()}</div>
                                                    </div>
                                                ) : (
                                                    'Never'
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            {auth.user.admin >= 2 && (
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {user.id !== auth.user.id && (
                                                        <button
                                                            onClick={() => startEditing(user)}
                                                            className="text-purple-600 hover:text-purple-900 font-medium"
                                                        >
                                                            Edit Level
                                                        </button>
                                                    )}
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No admin users found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {adminUsers.links && adminUsers.links.length > 3 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                {adminUsers.prev_page_url && (
                                    <Link href={adminUsers.prev_page_url} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Previous
                                    </Link>
                                )}
                                {adminUsers.next_page_url && (
                                    <Link href={adminUsers.next_page_url} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Next
                                    </Link>
                                )}
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{adminUsers.from}</span> to <span className="font-medium">{adminUsers.to}</span> of{' '}
                                        <span className="font-medium">{adminUsers.total}</span> results
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        {adminUsers.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${index === adminUsers.links.length - 1 ? 'rounded-r-md' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Warning for non-super admins */}
                {auth.user.admin < 2 && (
                    <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-800">
                            <strong>Note:</strong> You need Super Admin privileges (Level 2+) to modify admin levels.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

export default AdminUsers;

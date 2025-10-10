import React, {useState} from 'react'
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

function AdminLayout({children, auth}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="font-oswald flex h-screen">

        {/* Admin Sidebar */}
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} auth={auth}/>

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

          {/*  Admin header */}
          <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} auth={auth}/>

            {/* Main content */}
            <main className='h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-200'>
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    </div>
    )
}

export default AdminLayout

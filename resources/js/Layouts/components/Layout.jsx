import React, {useState} from 'react'
import Sidebar from './Sidebar';
import Header from './header/Header';



function Layout({children,props}) {

    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
    <div className="font-oswald flex h-screen ">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} props={props}/>

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} props={props}/>

            {/* Main content */}
            <main className='h-screen w-full scrollbar-thumb-rounded overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200'>
                <div className="w-full">
                    {children}
                </div>
            </main>
        </div>
    </div>
    )
}

export default Layout

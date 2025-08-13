import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function Mainlayout() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64">
                <Sidebar />
            </aside>
            <main className="flex-1 px-8 pt-0">
                <Outlet />
            </main>
        </div>
    )
}

export default Mainlayout

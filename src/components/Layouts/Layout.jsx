import { Outlet } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Sidebar/Sidebar"
export const Layout = () => {
    return (
        <main className="flex flex-col h-screen bg-gray-100">
            <Navbar />
            <div className="flex-1 flex">
                <SideBar />
                <Outlet />
            </div>
        </main>
    )
}

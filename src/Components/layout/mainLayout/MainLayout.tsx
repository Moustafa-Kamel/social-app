import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router'
import Navbar from '../Navbar/Navbar'
import ScrollToTop from '../../ui/ScrollToTop/ScrollToTop'

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-[#f0f2f5]">
            <Navbar />
            <div className="mx-auto max-w-7xl px-3 py-3.5">
                <main className="min-w-0">
                    <Outlet />
                </main>
            </div>
            <Toaster />
            <ScrollToTop />
        </div>
    )
}

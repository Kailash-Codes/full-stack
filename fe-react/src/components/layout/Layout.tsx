import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = () => {
    return (
        <div className="min-h-[100vh]  bg-slate-50">
            <Header />

            <main>

                <Outlet />
            </main>
        </div>
    )
}

export default Layout
import { Link, NavLink } from "react-router-dom"

const Header = () => {
    return (
        <div className="navbar min-h-[60px] justify-between px-2  bg-white border shadow-red-700 flex items-center">


            <h5 className="font-semibold">Header</h5>
            <div className="links">
                <ul className="flex gap-3">
                    <li><NavLink to="/" className={(e) => e.isActive ? "underline" : "hover:text-blue-700"} > Home</NavLink></li>
                    <li><NavLink to="/about" className={(e) => e.isActive ? "underline" : "hover:text-blue-700"} > About</NavLink></li>
                </ul>
            </div>
        </div >
    )
}

export default Header
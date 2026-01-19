import "./SideBar.css"
import { Link, NavLink } from "react-router-dom"
import AppLayout from "../../layout/AppLayout/AppLayout";

function SideBar() {
    return (
        <div className="sidebar">
            <h1 id="main-title">StockTracker</h1>
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/Inventory">Inventory</NavLink>
            {/* <NavLink to="/OrderHistory">Order History</NavLink> */}
        </div>
    )
}

export default SideBar;
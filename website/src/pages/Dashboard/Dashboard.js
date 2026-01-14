import "./Dashboard.css"
import { Link, NavLink } from "react-router-dom"
import Dropdown from "../../components/Dropdown/Dropdown.js"
import { useState } from "react";

function Dashboard() {
    const [timeRange, setTimeRange] = useState("30d");

    return (
        <div className="top-widget">
            <div className="inventory-summary">
                <h3>Inventory Summary</h3>
                <table className="stock-table">
                    <tbody>
                        <tr className="warning-item">
                            <td >
                                <NavLink to="/">Low Stock items</NavLink>
                            </td>
                            <td >
                                <NavLink to="/">3</NavLink>
                            </td>
                        </tr>
                        <tr className="warning-item">
                            <td>
                                <NavLink to="/">Out of Stock</NavLink>
                            </td>
                            <td>
                                <NavLink to="/">4</NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <NavLink to="/Inventory">All items</NavLink>
                            </td>
                            <td>
                                <NavLink to="/Inventory">9</NavLink>
                            </td>
                        </tr>
                </tbody>
                </table>
            </div>
            <div className="inventory-summary">
                <div className="box-header">
                    <h3>Most Used Items</h3>
                    <Dropdown value={timeRange} onChange={setTimeRange} />
                </div>
                <table className="usage-table">
                    <tbody>
                        <tr>
                            <td>
                                PN1
                            </td>
                            <td>
                                PN2
                            </td>
                            <td>
                                PN3
                            </td>
                        </tr>
                        <tr>
                            <td>
                                price1
                            </td>
                            <td>
                                price2
                            </td>
                            <td>
                                price3
                            </td>
                        </tr>
                        <tr>
                            <td>
                                q1
                            </td>
                            <td>
                                q2
                            </td>
                            <td>
                                q3
                            </td>
                        </tr>
                    </tbody>
                </table>
                    
            </div>
        </div>
    );
}

export default Dashboard;
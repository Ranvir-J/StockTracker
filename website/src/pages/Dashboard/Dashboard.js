import "./Dashboard.css"
import { Link, NavLink } from "react-router-dom"

function Dashboard() {
    return (
        <div className="top-widget">
            <div className="inventory-summary">
                <h3>Inventory Summary</h3>
                <table className="stock-table">
                    <tbody>
                    <tr className="warning-item">
                        <td >
                            <NavLink to="/" className="warning-item">Low Stock items</NavLink>
                        </td>
                        <td >
                            3
                        </td>
                    </tr>
                    <tr className="warning-item">
                        <td>
                            <NavLink to="/" className="warning-item">Out of Stock</NavLink>
                        </td>
                        <td>
                            4
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <NavLink to="/Inventory">All items</NavLink>
                        </td>
                        <td>
                            9
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div className="inventory-summary">
                <h3>Inventory Summary</h3>
                <p>This content is unique to the Dashboard page.</p>
            </div>
        </div>
    );
}

export default Dashboard;
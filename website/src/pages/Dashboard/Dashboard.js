import "./Dashboard.css"
import { Link, NavLink } from "react-router-dom"
import Dropdown from "../../components/Dropdown/Dropdown.js"
import { useState } from "react";

function Dashboard() {
    const [timeRange, setTimeRange] = useState("30d");
    const [inventorySummary, setInventorySummary] = useState({
    lowStock: 7,
    outOfStock: 6,
    totalItems: 50
    });

    const [usageData, setUsageData] = useState([
        { partNumber: "2CAM0352", cost: 110.08, quantity: 71 },
        { partNumber: "2CRK0306", cost: 46.05, quantity: 54 },
        { partNumber: "CA12089", cost: 23.22, quantity: 36 }]);

    return (
        <div className="top-widget">
            <div className="inventory-summary">
                <h3>Inventory Summary</h3>
                <table className="stock-table">
                    <tbody>
                        <tr className="warning-item">
                            <td ><NavLink to="/">Low Stock</NavLink></td>
                            <td ><NavLink to="/">{inventorySummary.lowStock}</NavLink></td>
                        </tr>
                        <tr className="warning-item">
                            <td><NavLink to="/">Out of Stock</NavLink></td>
                            <td><NavLink to="/">{inventorySummary.outOfStock}</NavLink></td>
                        </tr>
                        <tr>
                            <td><NavLink to="/Inventory">All Items</NavLink></td>
                            <td><NavLink to="/Inventory">{inventorySummary.totalItems}</NavLink></td>
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
                            {usageData.map(item => (
                                <td key={item.partNumber}>{item.partNumber}</td>
                            ))}
                        </tr>
                        <tr>
                            {usageData.map(item => (
                                <td key={item.partNumber}>${item.cost.toFixed(2)}</td>
                            ))}
                        </tr>
                        <tr>
                            {usageData.map(item => (
                                <td key={item.partNumber}>{item.quantity} items</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
    );
}



export default Dashboard;
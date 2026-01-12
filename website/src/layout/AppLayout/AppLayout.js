import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar/SideBar.js";
import TopBar from "../../components/TopBar/TopBar.js";
import "./AppLayout.css"

function AppLayout() {
  return (
    <div className="app-layout">
        <TopBar />
        <div className="main-area">
            <Sidebar />
            <div className="content-area">
                <Outlet />
            </div>
        </div>
        </div>
  );
}

export default AppLayout;
import '../../App.css';
import SideBar from "../SideBar/SideBar.js"
import TopBar from "../TopBar/TopBar.js"
import AppLayout from "../../layout/AppLayout/AppLayout.js"

function App() {
  return (
    <div className="App">
      <TopBar />
      <SideBar />
    </div>
  );
}

export default App;

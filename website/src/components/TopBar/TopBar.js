import Search from "../Search/Search.js"
import "./TopBar"

function TopBar() {
    return (
        <div className="topbar">
            <Search />
            <button><img src="https://cdn-icons-png.flaticon.com/128/3524/3524636.png"/></button>
            <button><img src="https://cdn-icons-png.flaticon.com/128/3602/3602145.png"/></button>
            <button><img src="https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/thumbnails/image/blanksquare.jpg" id="profile-picture"/></button>
        </div>
    )
}

export default TopBar;
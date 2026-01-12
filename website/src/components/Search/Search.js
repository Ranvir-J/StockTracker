import "./Search.css";

function Search() {
    return (
        <form>
            <div className="search">
                <img src="https://cdn-icons-png.flaticon.com/128/3031/3031293.png" className="search-icon" />
                <input type="text" placeholder="Search" id="search-input"  />
            </div>
        </form>
    )
}

export default Search;
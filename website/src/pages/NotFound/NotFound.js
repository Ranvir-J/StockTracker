import { Link } from "react-router-dom"

function NotFound() {
    return (
        <div className="page-not-found">404 not found
            <Link to="/">Home</Link>
        </div>
    );
}

export default NotFound;
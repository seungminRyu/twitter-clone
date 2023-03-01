import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/profile">profile</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;

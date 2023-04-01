import { Link } from "react-router-dom";

function Navigation(props) {
    const { user } = props;
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                <li>
                    <Link to="/profile">{user.displayName}의 프로필</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navigation;

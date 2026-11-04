import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-gray-900 text-white shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">
          👩‍💻 Dev Tinder
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={() => {/* logout logic */}}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
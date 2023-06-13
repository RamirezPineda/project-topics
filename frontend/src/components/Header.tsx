import { memo } from "react";

import sczLogo from "../assets/escudo.png";

function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          <img src={sczLogo} alt="" width={25} />{" "}
          <h1 className="text-4xl">
            SC<span className="text-green-500">Z</span>
          </h1>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a className="bg-green-500 text-green-800">Login</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(Header);

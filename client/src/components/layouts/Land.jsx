import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const Land = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {user && (
        <>
          <nav>
            <ul>
              <li><Link to="">cp1</Link></li>
              <li><Link to="cp2">cp1</Link></li>
            </ul>
          </nav>
          <div>Land</div>
        </>
      )}
      <Outlet />
    </Fragment>
  );
};

export default Land;

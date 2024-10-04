import React from 'react'
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      {/* add things like Navbar */}
      {/* <h1>home layout</h1> */}
      {/* <div>HomeLayout</div> */}
      {/* <nav>NavBar</nav> */}
      <Outlet />

    </>
  );
};
export default HomeLayout;
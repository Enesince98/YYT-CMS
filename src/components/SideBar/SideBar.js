import React from "react";
import { FaTh, FaUserAlt, FaRegChartBar, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

function SideBar({ children }) {
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaTh />,
    },
    {
      path: "/content-type-builder",
      name: "Content Type Builder",
      icon: <FaUserAlt />,
    },
    {
      path: "/content-type-manager",
      name: "Content Type Manager",
      icon: <FaRegChartBar />,
    },
  ];
  return (
    <div className="SideBarcontainer">
      <div className="sidebar">
        <div className="top_section">
          <h1 className="logo">YYT CMS</h1>
          <div className="bars"></div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="SideBarLink"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default SideBar;

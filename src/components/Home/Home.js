import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header.jsx";
import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import "../../App.css"
import './Home.css'
const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <div><Header/>
    <div className='container mt-5'>
        <div className="row">
          <div className="col-md-12">
            <div className="card ">
                <div className="card-body">
                <h1 className="card-title">Admin Page</h1>
                    <p className="card-text">You can go to content type builder page to create a content</p>
                    <div className="home-links">
                        <Link className="home-link" to="/content-type-builder">Content Type Builder</Link> 
                        <Link className="home-link" to="/content-type-manager">Content Type Manager</Link> 
                        <Link className="home-link" to="/user-manager">User Manager</Link> 
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div></div>
  );
};

export default Home;

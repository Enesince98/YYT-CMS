import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header.jsx";
import "../../App.css";
import "./Home.css";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../SideBar/SideBar";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();
  console.log(theme);

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <div
      className={`${
        theme === "dark" ? "homeContainerDark" : "homeContainerLight"
      }`}
    >
      <Header />
      <div
        className={`${
          theme === "dark" ? "HomeContainerBoxDark" : "HomeContainerBoxLight"
        }`}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="Homecard ">
              <div className="card-body">
                <h1
                  className={`${
                    theme === "dark"
                      ? "Home-Card-Title-Dark"
                      : "Home-Card-Title-Light"
                  }`}
                >
                  Admin Page
                </h1>
                <p
                  className={`${
                    theme === "dark"
                      ? "Home-Card-Text-Dark"
                      : "Home-Card-Text-Light"
                  }`}
                >
                  You can go to content type builder page to create a content
                </p>
                <div className="home-links">
                  <Link className="home-link" to="/content-type-builder">
                    Content Type Builder
                  </Link>
                  <Link className="home-link" to="/content-type-manager">
                    Content Type Manager
                  </Link>
                  {/*<Link className="home-link" to="/user-manager">User Manager</Link>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./Login.module.css";
const LOGIN_URL = "/api/Auth/login";
//const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.data?.accessToken;
      //const roles = response?.data?.data?.roles;
      setAuth({ user, pwd, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Wrong Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.brandLogo}></div>
        <div className={styles.brandTitle}>YYT CMS LOGIN</div>
        <form className={styles.inputs} onSubmit={handleSubmit}>
          <label className={styles.loginLabel}>USERNAME</label>
          {errMsg ? <p style={{color: "red"}}>{errMsg}</p> : <p> </p>} 
          <input
            className={styles.loginInput}
            type="text"
            required
            id="username"
            name="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <label className={styles.loginLabel}>PASSWORD</label>
          <input
            className={styles.loginInput}
            required
            name="password"
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            placeholder="Enter your password"
          />
          <button type="submit" className={styles.loginBtn}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

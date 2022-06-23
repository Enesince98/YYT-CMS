import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header.jsx"
import "../../App.css";
import "./User.css";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../SideBar/SideBar";
  

const User = () => {
    
    return (
            
       <div >
        <Header/>
        <form class = "container a shadow-lg p-3 mb-5 bg-white rounded" >

                <div class="form-group ">
                    <label for="exampleInputEmail1">User Name</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                    {/* { <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> } */}
                </div>
 
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Password Again</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>




                
                <button type="submit" class="btn btn-primary size ">Submit</button>
        </form>
       </div>
        
    )
}

export default User
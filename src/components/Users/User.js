import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Header from "../Header/Header.jsx"
import "../../App.css";
import "./User.css";
import { useTheme } from "../../context/ThemeContext";
import SideBar from "../SideBar/SideBar";
  

const User = () => {
function saveuser  (e)  {
    e.preventDefault();

    document.getElementById("emailHelp").innerHTML =  "";
    document.getElementById("passwordHelp1").innerHTML =  "";
    document.getElementById("passwordHelp2").innerHTML =  "";

    let email_regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

    let email = document.getElementById("exampleInputEmail1").value;

    let password = document.getElementById("exampleInputPassword1").value;

    let password_again = document.getElementById("exampleInputPassword2").value;


    let email_result = email.match(email_regex);

    if(email_result != null){
        document.getElementById("emailHelp").innerHTML =  "<span style='color: green;'>Email is valid!</span>";
    }else{
        document.getElementById("emailHelp").innerHTML =  "<span style='color: red;'>Correct format: youremailadress@hotmail.com</span>";
    }

    if(password !== password_again){
        document.getElementById("passwordHelp2").innerHTML =  "<span style='color: red;'>Passwords do not match.</span>";
    }
    else if(password.length < 8){
        document.getElementById("passwordHelp1").innerHTML =  "<span style='color: red;'>Password must contain at least 8 characters.</span>";
    }
    else if(password.match(/[A-Z]/) == null){
        document.getElementById("passwordHelp1").innerHTML =  "<span style='color: red;'>Password must contain at least one capital letter.</span>";
    }
    else if(password.match(/[a-z]/) == null){
        document.getElementById("passwordHelp1").innerHTML =  "<span style='color: red;'>Password must contain at least one lowercase letter.</span>";
    }
    else if(password.match(/[@#$%^&+=_]/) == null){
        document.getElementById("passwordHelp1").innerHTML =  "<span style='color: red;'>Password must contain at least one special character.(@#$%^&+=_)</span>";
    }
    else{
        document.getElementById("passwordHelp1").innerHTML =  "<span style='color: green;'>Password is valid!</span>";
    }

}
    return (
            
       <div >
        <Header/>
        <form class = "container a shadow-lg p-3 mb-5 bg-white rounded" >

                <div class="form-group">
                    <label for="exampleInputEmail1">User Name</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <small id="emailHelp" class="form-text text-muted" ></small>
 
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <small id="passwordHelp1" class="form-text text-muted" ></small>

                <div class="form-group">
                    <label for="exampleInputPassword2">Password Again</label>
                    <input type="password" class="form-control" id="exampleInputPassword2" placeholder="Password"/>
                </div>
                <small id="passwordHelp2" class="form-text text-muted" ></small>
  
                <button onClick={saveuser} class="btn btn-primary size ">Submit</button>
        </form>
       </div>
        
    )
}

export default User
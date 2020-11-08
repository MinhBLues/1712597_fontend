import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import "./assets/css/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/image/123.png";
import SignIn from "../component/Login";
import SignUp from "../component/SignUp";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(3, 0, 2),
    width:'fit-content',
    float: 'right',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [title, setTitle] = useState("SignUp");
  const [hide, setHide] = useState(true);
  
  const handelSwitch = () => {  
    !hide ? setTitle("SignUp") : setTitle("Login")
    setHide(!hide)
    console.log(hide);
  };

  return (
    <div className="container home register">
      <div className="row">
        <div className="col-md-4 register-left">
          <img src={logo} alt="" style={{ width: "100%" }} />
          <h3>Welcome</h3>
          {/* <p>You are 30 seconds away from earning your own money!</p> */}
          {/* <input type="submit" name="" value="Login" /><br /> */}
        </div>
        <div className="col-md-7 register-right">
          <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handelSwitch()}
              style = {{width:"120px"}}
              className={classes.button}
            >
             {title}
          </Button>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
              <div className="row register-form">
                {hide? <SignIn/> : <SignUp/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

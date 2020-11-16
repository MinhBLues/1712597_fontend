import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect, useHistory } from "react-router-dom";
import Auth from "../../../services/AuthRepository";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import FacebookIcon from "@material-ui/icons/Facebook";
import { ReactComponent as GoogleIcon } from "../../../assets/image/google.svg";
import GoogleLogin from 'react-google-login';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [open, setOpen] = useState(false);

  async function handleButton() {
    await Auth.login(email, password).then(
      () => {
        window.history.state && window.history.state.state
          ? history.push(window.history.state.state.referer.pathname)
          : history.push("/home");
      },
      (error) => {
        setOpen(true);
      }
    );
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const responseGoogle = async (response) => {
    var res = response.profileObj;

    if (res) {
      await Auth.googleLogin(res.email, res.googleId).then(
        () => {
          window.history.state && window.history.state.state
            ? history.push(window.history.state.state.referer.pathname)
            : history.push("/home");
        },
        (error) => {
          history.push({
            pathname: '/google/changePassword',
            state: { props: res , pathBack: window.history.state && window.history.state.state ? window.history.state.state.referer.pathname: '/home'}
          })
        }
      );
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          ,
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            style={{ float: "left" }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember password"
          />
          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleButton()}
            className={classes.submit}
          >
            Login
          </Button>

          <GoogleLogin
            clientId="428605288080-uiihvkeo4o1jvofnrtj3l44no0rk97fo.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle} ></GoogleLogin>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            Login failed!!!
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}

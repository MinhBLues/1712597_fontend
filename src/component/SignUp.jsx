import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "../services/AuthRepository";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repeat_password, setRepeatPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [open, setOpen] = useState(false);
  const [ status, setStatus ] = useState();
  const history = useHistory();

  function handelPassword() {
    if (password !== repeat_password) {
        setStatus('Mật khẩu không trùng khớp');
      return false;
    }
    return true;
  }

  async function handleButton() {
    if (handelPassword()) {
      await Auth.register((firstName+ " " + lastName).trim(), username, password).then(
        () => {
          Auth.login(username, password)
            .then((ee) => {
              history.push("/home");
              window.location.reload();
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
              }
            });
        },
        (error) => {
          setStatus(error.response.data.message.length > 0 ? error.response.data.message : error.response.data.message[0] );
          setOpen(true);
        }
      );
    } else setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Họ"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Tên"
                name="lastName"
                value={lastName}
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repeat_password"
                label="Nhập lại mật khẩu"
                type="password"
                id="repeat_password"
                autoComplete="current-reapeat-password"
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleButton()}
            className={classes.submit}
          >
            Đăng kí
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="Login" variant="body2">
                Đã có tài khoản? Đăng nhập
              </Link>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            {status}
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}

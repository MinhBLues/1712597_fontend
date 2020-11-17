import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "../services/AuthRepository";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import CustomizedBreadcrumbs from "../component/Breadcrumb";
import AuthRepository from "../services/AuthRepository";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(1),
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
  root: {
    height: 180,
  },
  container: {
    display: "flex",
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [checked, setChecked] = React.useState(false);
  const [user, setUser] = useState(Auth.getCurrentUser());
  const [success, setSuccess] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function handelPassword() {
    if (password !== repeat_password && checked) {
      setStatus("Mật khẩu không trùng khớp");
      return false;
    }
    if (password === old_password && checked) {
      setStatus("Mật khẩu moi trung mat khau cu");
      return false;
    }
    if (!checked) {
      setOldPassword("");
      setPassword("");
    }
    return true;
  }

  async function handleButton() {
    if (handelPassword()) {
      await Auth.update(display_name.trim(), old_password, password).then(
        () => {
          setSuccess(true);
          setStatus("Update success");
          setOpen(true);
        },
        (error) => {
          setStatus(
            error.response.data.message.length > 0
              ? error.response.data.message
              : error.response.data.message[0]
          );
          setSuccess(false);
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

  useEffect(() => {
    async function getUser() {
      await AuthRepository.getUser().then((response) => {
        setUsername(response.data.username);
        setDisplayName(response.data.display_name);
      });
    }
    getUser();
  }, []);

  return (
    <>
      <CustomizedBreadcrumbs name="Profile" />
      <Container component="main" maxWidth="xs" style={{ marginTop: "5%" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  autoComplete="display_name"
                  name="display_name"
                  variant="outlined"
                  fullWidth
                  id="display_name"
                  label="Full name"
                  autoFocus
                  value={display_name}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={user.user.username}
                />
              </Grid>
              <Grid item style={{ textAlign: "left" }}>
                <FormControlLabel
                  control={<Switch checked={checked} onChange={handleChange} />}
                  label="Change password"
                />
                <div className={classes.container}>
                  <Collapse in={checked}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      style={{ marginBottom: "15px" }}
                      name="old_password"
                      label="Old password"
                      type="password"
                      id="old_password"
                      autoComplete="old-password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      style={{ marginBottom: "15px" }}
                      name="new_password"
                      label="New Password"
                      type="password"
                      id="new_password"
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="repeat_password"
                      label="Repeat password"
                      type="password"
                      id="repeat_password"
                      autoComplete="current-reapeat-password"
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </Collapse>
                </div>
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
              Update
            </Button>
          </form>
          <Snackbar
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={success ? "success" : "error"}
            >
              {status}
            </Alert>
          </Snackbar>
        </div>
      </Container>
    </>
  );
}

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Auth from "../services/AuthRepository";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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
  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [repeat_password, setRepeatPassword] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState();
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function handelPassword() {
    if (password !== repeat_password && checked) {
      setStatus("Mật khẩu không trùng khớp");
      return false;
    }
    return true;
  }

  async function handleButton() {
    if (handelPassword()) {
      await Auth.update(display_name.trim(), username, password).then(() => {},
        (error) => {
          setStatus(
            error.response.data.message.length > 0
              ? error.response.data.message[0]
              : error.response.data.message
          );
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
        <Typography component="h1" variant="h5">
          Thông tin cá nhân
        </Typography>
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
                label="Họ và tên"
                autoFocus
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
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item style ={{textAlign: 'left'}}> 
              <FormControlLabel 
                control={<Switch checked={checked} onChange={handleChange} />}
                label="Reset password"
              />
              <div className={classes.container}>
                <Collapse in={checked}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    style={{ marginBottom: "15px" }}
                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
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
            Cập nhật
          </Button>
        </form>
        <Snackbar
          open={open}
          autoHideDuration={2000}
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

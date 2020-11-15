import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import dateFormat from "dateformat";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    minWidth: 300,
    margin: "10px",
    color: "black",
    border: "1px solid blue",
    float: "left",
    borderRadius: 3,
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  media: {
    height: 0,
  },
  description: {
    color: "black",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
  },
  divider: {
    height: 1,
    backgroundColor: "blue",
  },
}));

export default function Board(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const date = dateFormat(props.board.date, "dd mmmm");

  async function handleDelete() {
    setOpen(false);
    props.onClick()
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  function handelCard() {
    history.push(`/board/${props.board.id}`);
  }

  function handelShare(id){
    navigator.clipboard.writeText(window.location.origin+ `/share/board/${id}`)
  }

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          style={{ textAlign: "left" }}
          title={props.board.title}
          onClick={handelCard}
        />
        <CardContent onClick={handelCard}>
          <Typography
            style={{ textAlign: "left" }}
            className={classes.description}
          >
            <AccessTimeIcon
              style={{ margin: "0px 0px 2px 2px", fontSize: "1.2rem" }}
            />{" "}
            {date}
          </Typography>
        </CardContent>
        <Divider light />
        <CardActions disableSpacing>
          <IconButton aria-label="share" onClick={() => handelShare(props.board.id)}>
            <ShareIcon style={{ color: "blue" }} />
          </IconButton>
          <IconButton
            className={classes.expand}
            aria-expanded={expanded}
            aria-label="show more"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon style={{ color: red[500] }} />
          </IconButton>
        </CardActions>
      </Card>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity="error">
          Are you sure you want to delete?
          <Button
            color="inherit"
            size="small"
            onClick={() => handleDelete()}
          >
            Yes
          </Button>
          <Button color="inherit" size="small" onClick={handleClose}>
            Cancel
          </Button>
        </Alert>
      </Snackbar>
    </>
  );
}

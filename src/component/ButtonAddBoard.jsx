import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import BoardReponsitory from '../services/BoardReponsitory';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    background: 0,
    border: "2px dashed #ccc",
    boxShadow: "none",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "2px",
    height: "100px",
  },

  home: {
    marginTop: "20px",
  },
}));

export default function AddBoard(props) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState();
  const classes = useStyles();
  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleCreate() {
    await BoardReponsitory.create(title).then((response) => {
      history.push(`/board/task/${response.data.id}`);
    });
    setOpen(false);
  }

  return (
    <div className={props.className}>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
      >
        Create Board 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Went Well - To Improve - Action Items
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

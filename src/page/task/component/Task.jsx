import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import "../../assets/css/task.css";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import TaskReponsitory from "../../../services/TaskReponsitory";
import DeleteIcon from "@material-ui/icons/Delete";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginBottom: "15px",
    border: "1px solid blue",
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Task(props) {
  const classes = useStyles();
  const id = props.task.id;
  const [description, setDescript] = useState(props.task.description);
  const [flag, setFlag] = useState(true);
  const [status, setStatus] = useState(props.task.status);
  const [num_like, setNumLike] = useState(props.task.num_like);

  async function handelEdit() {
    if(!flag){
      await TaskReponsitory.update(id, description, status, num_like);
    }

    setFlag(!flag);
  }

  return (
    <>
      {console.log(props)}
      <Draggable
        key={id.toString()}
        draggableId={id.toString()}
        index={props.index}
      >
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <InputBase
              className={classes.input}
              disabled={flag}
              value={description}
              style={{ color: "black" }}
              onChange={(e) => setDescript(e.target.value)}
              onClick={() => setFlag(false)}
            />
            <IconButton
              type="button"
              color="primary"
              className={classes.iconButton}
              aria-label="search"
              onClick={() => handelEdit()}
              // disabled={!flag}
            >
              {flag? <CreateIcon />: <DoneIcon /> }
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="secondary"
              className={classes.iconButton}
              aria-label="directions"
              disabled={!flag}
              onClick={props.onClick}
            >
              <DeleteIcon />
            </IconButton>
          </li>
        )}
      </Draggable>
    </>
  );
}

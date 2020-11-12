import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import "../../assets/css/task.css";
import { makeStyles } from "@material-ui/core/styles";
import { Draggable } from "react-beautiful-dnd";
import TaskReponsitory from "../../../services/TaskReponsitory";
import ClearIcon from "@material-ui/icons/Clear";
import Auth from "../../../services/AuthRepository";
// import Auth from "./services/AuthRepository";

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

export default function NewTask(props) {
  const classes = useStyles();
  const [description, setDescript] = useState();
  // const [flag, setFlag] = useState(props.flag);
  const flag = props.flag;
  const id = props.status;
  const auth = Auth.getCurrentUser();

  async function handelCreate() {
    if (!flag) {
      await TaskReponsitory.create(
        auth.user.id,
        description,
        props.boardId,
        props.status
      ).then((reponse) => {
        setDescript('');
        props.onClick(reponse.data);
      });
    }
  }
  return (
    <>
      <Draggable
        key={id.toString()}
        draggableId={id.toString()}
        index={props.status}
      >
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              visibility: flag ? "hidden" : "visible",
              display: flag ? "none" : "flex",
            }}
          >
            <InputBase
              className={classes.input}
              value={description}
              style={{ color: "black" }}
              onChange={(e) => setDescript(e.target.value)}
            />
            <IconButton
              type="button"
              color="primary"
              className={classes.iconButton}
              aria-label="search"
              onClick={() => handelCreate()}
            >
              <DoneIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton
              color="secondary"
              className={classes.iconButton}
              aria-label="directions"
              onClick={props.handelCancel}
            >
              <ClearIcon />
            </IconButton>
          </li>
        )}
      </Draggable>
    </>
  );
}

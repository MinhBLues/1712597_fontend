import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardReponsitory from "../../services/BoardReponsitory";
import { useParams } from "react-router";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import "../assets/css/task.css";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedBreadcrumbs from "../../component/Breadcrumb";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Task from "./component/Task";
import TaskReponsitory from "../../services/TaskReponsitory";
import NewTask from "./component/NewTask";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    marginBottom: "15px",
    border: "1px solid blue",
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  cardblue: {
    marginBottom: "15px",
    border: "1px solid blue",
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
  cardred: {
    marginBottom: "15px",
    border: "1px solid red",
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(255, 99, 71, 1)",
    },
  },
  cardgreen: {
    marginBottom: "15px",
    border: "1px solid green",
    "&:hover": {
      boxShadow: "0 0 0 0.2rem rgba(55, 144, 52, 1)",
    },
  },
  cardHeader: {
    float: "left",
    textAlign: "left",
    fontSize: "19px",
    padding: "9px",
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

const grid = 8;

export default function ListTask() {
  const classes = useStyles();
  const { id } = useParams();
  const [board, setBoards] = useState([]);
  const [disBtn, setDisBtn] = useState(true);
  const [title, setTitle] = useState("");

  const [wellItems, setWellItems] = useState([]);
  const [improveItems, setImproveItems] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  const [flag1, setFlag1] = useState(true);
  const [flag2, setFlag2] = useState(true);
  const [flag3, setFlag3] = useState(true);

  const getList = (id) => {
    switch (id) {
      case "characters1":
        return wellItems;
      case "characters2":
        return improveItems;
      case "characters3":
        return actionItems;
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      if (source.droppableId === "characters1") {
        setWellItems(null);
        setWellItems(items);
      } else if (source.droppableId === "characters2") {
        setImproveItems([]);
        setImproveItems(items);
      } else if (source.droppableId === "characters3") {
        setActionItems([]);
        setActionItems(items);
      }
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      let status = 0;
      if (result.characters1) {
        setWellItems(result.characters1);
      }
      if (result.characters2) {
        setImproveItems(result.characters2);
      }
      if (result.characters3) {
        setActionItems(result.characters3);
      }

      switch (destination.droppableId) {
        case "characters1":
          status = 1;
          break;
        case "characters2":
          status = 2;
          break;
        case "characters3":
          status = 3;
          break;
      }

      await TaskReponsitory.updateStatus(draggableId, status);
    }
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const result = {};

    const destClone = Array.from(destination);
    if (destination) {
      destClone.splice(droppableDestination.index, 0, removed);
      result[droppableDestination.droppableId] = destClone;
    }

    result[droppableSource.droppableId] = sourceClone;

    return result;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function handelEdit() {
    setDisBtn(false);
  }

  async function handelSave() {
    setDisBtn(true);
    await BoardReponsitory.updateTitle(id, title);
  }

  async function handelDeleteTask(items) {
    await TaskReponsitory.delete(items.id).then(() => {
      switch (items.status) {
        case 1: {
          let item = wellItems.filter((value) => value !== items);
          setWellItems(item);
          break;
        }
        case 2: {
          let item = improveItems.filter((value) => value !== items);
          setImproveItems(item);
          break;
        }
        case 3: {
          let item = actionItems.filter((value) => value !== items);
          setActionItems(item);
          break;
        }
      }
    });
  }

  function handelCreate(item) {
    switch (item.status) {
      case 1:
        setWellItems((oldArray) => [...oldArray, item]);
        setFlag1(!flag1);
        break;
      case 2:
        setImproveItems((oldArray) => [...oldArray, item]);
        setFlag2(!flag2);

        break;
      case 3:
        setActionItems((oldArray) => [...oldArray, item]);
        setFlag3(!flag3);
        break;
    }
  }

  useEffect(() => {
    async function getBoardById() {
      const response = await BoardReponsitory.getBoardById(id);
      let body = response.data;
      setBoards(body);
      setTitle(body.title);
      if (response.data.tasks) {
        response.data.tasks.map((item) => {
          switch (item.status) {
            case 1:
              setWellItems((oldArray) => [...oldArray, item]);
              break;
            case 2:
              setImproveItems((oldArray) => [...oldArray, item]);
              break;
            case 3:
              setActionItems((oldArray) => [...oldArray, item]);
              break;
          }
        });
      }
    }
    getBoardById();
  }, []);

  return (
    <>
      <CustomizedBreadcrumbs name="Task" />
      <div className="task">
        <div className="container" style={{ marginTop: "1%" }}>
          <header>
            <Paper component="form" className={classes.root}>
              <InputBase
                className={classes.input}
                disabled={disBtn}
                value={title}
                style={{ color: "black" }}
                onChange={(e) => setTitle(e.target.value)}
                onClick={() => setDisBtn(false)}
              />
              <IconButton
                type="button"
                color="primary"
                className={classes.iconButton}
                aria-label="search"
                onClick={() => handelEdit()}
                disabled={!disBtn}
              >
                <CreateIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                color="secondary"
                className={classes.iconButton}
                aria-label="directions"
                disabled={disBtn}
                onClick={() => handelSave()}
              >
                <DoneIcon />
              </IconButton>
            </Paper>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid container spacing={3}>
                <Grid item sm={true} style={{ width: "inherit" }}>
                  <Card className={classes.cardblue}>
                    <CardHeader
                      className={classes.cardHeader}
                      title={"Went Well"}
                    />
                    <CardActions
                      disableSpacing
                      style={{ float: "right", padding: "0px" }}
                    >
                      <IconButton
                        aria-label="share"
                        style={{ color: "blue" }}
                        onClick={() => {
                          setFlag1(!flag1);
                        }}
                      >
                        {flag1 ? <AddBoxIcon /> : <RemoveCircleIcon />}
                      </IconButton>
                    </CardActions>
                  </Card>
                  <Droppable droppableId="characters1">
                    {(provided) => (
                      <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <NewTask
                          status={1}
                          boardId={id}
                          onClick={handelCreate}
                          flag={flag1}
                          handelCancel={() => setFlag1(!flag1)}
                        />

                        {wellItems
                          ? wellItems.map((items, index) => {
                              return (
                                <Task
                                  key={items.id}
                                  task={items}
                                  index={index}
                                  onClick={() => handelDeleteTask(items)}
                                />
                              );
                            })
                          : null}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </Grid>
                <Grid item sm={true} style={{ width: "inherit" }}>
                  <Card className={classes.cardred}>
                    <CardHeader
                      className={classes.cardHeader}
                      title={"To Improve"}
                    />
                    <CardActions
                      disableSpacing
                      style={{ float: "right", padding: "0px" }}
                    >
                      <IconButton
                        aria-label="share"
                        style={{ color: "red" }}
                        onClick={() => setFlag2(!flag2)}
                      >
                        {flag2 ? <AddBoxIcon /> : <RemoveCircleIcon />}
                      </IconButton>
                    </CardActions>
                  </Card>
                  <Droppable droppableId="characters2">
                    {(provided) => (
                      <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <NewTask
                          status={2}
                          boardId={id}
                          onClick={handelCreate}
                          flag={flag2}
                          handelCancel={() => setFlag2(!flag2)}
                        />
                        {improveItems
                          ? improveItems.map((items, index) => {
                              return (
                                <Task
                                  key={items.id}
                                  task={items}
                                  index={index}
                                  onClick={() => handelDeleteTask(items)}
                                />
                              );
                            })
                          : null}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </Grid>
                <Grid item sm={true} style={{ width: "inherit" }}>
                  <Card className={classes.cardgreen}>
                    <CardHeader
                      className={classes.cardHeader}
                      title={"Action Items"}
                    />
                    <CardActions
                      disableSpacing
                      style={{ float: "right", padding: "0px" }}
                    >
                      <IconButton
                        aria-label="share"
                        style={{ color: "green" }}
                        onClick={() => setFlag3(!flag3)}
                      >
                        {flag3 ? <AddBoxIcon /> : <RemoveCircleIcon />}
                      </IconButton>
                    </CardActions>
                  </Card>
                  <Droppable droppableId="characters3">
                    {(provided) => (
                      <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <NewTask
                          status={3}
                          boardId={id}
                          onClick={handelCreate}
                          flag={flag3}
                          handelCancel={() => setFlag3(!flag3)}
                        />

                        {actionItems
                          ? actionItems.map((items, index) => {
                              return (
                                <Task
                                  task={items}
                                  key={items.id}
                                  index={index}
                                  onClick={() => handelDeleteTask(items)}
                                />
                              );
                            })
                          : null}

                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </Grid>
              </Grid>
            </DragDropContext>
          </header>
        </div>
      </div>
    </>
  );
}

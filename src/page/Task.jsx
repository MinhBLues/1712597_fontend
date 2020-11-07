import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import BoardReponsitory from "../services/BoardReponsitory";
import { useParams } from "react-router";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CreateIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";

import "./task.css";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedBreadcrumbs from "../component/Breadcrumb";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    marginBottom: "15px",
    border: "1px solid blue",
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

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "/images/cato.png",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "/images/kvn.png",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/images/mooncake.png",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "/images/quinn.png",
  },
];

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default function Task() {
  const classes = useStyles();
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const { id } = useParams();
  const [board, setBoards] = useState([]);
  const [disBtn, setDisBtn] = useState(true);
  const [title, setTitle] = useState();
  // const [tasks, setTasks] = useState({
  //   id: 2,
  //   description: "string",
  //   status: "1",
  //   num_like: 0,
  //   boardId: 2,
  //   userCreateId: 1,
  //   comments: [],
  // });

  const [wellItems, setWellItems] = useState([]);
  const [improveItems, setImproveItems] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  function handelEdit() {
    setDisBtn(false);
  }

  async function handelSave() {
    setDisBtn(true);
    await BoardReponsitory.updateTitle(id, title);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
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
            case 2:
              setImproveItems((oldArray) => [...oldArray, item]);
            case 3:
              setActionItems((oldArray) => [...oldArray, item]);
          }
        });
      }
    }
    getBoardById();
  }, []);

  return (
    <>
      <CustomizedBreadcrumbs name="Task" />
      <div className="container" style={{ marginTop: "1%", marginLeft: "2%" }}>
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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {wellItems
                    ? wellItems.map(({ id, description }, index) => {
                        return (
                          <Draggable
                            key={id.toString()}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="characters-thumb">
                                  {/* <img src={thumb} alt={`${name} Thumb`} /> */}
                                </div>
                                <p>{description}</p>
                              </li>
                            )}
                          </Draggable>
                        );
                      })
                    : null}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <Droppable droppableId="characters2">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {improveItems
                    ? improveItems.map(({ id, description }, index) => {
                        return (
                          <Draggable
                            key={id.toString()}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* <div className="characters-thumb">
                                  <img src={thumb} alt={`${name} Thumb`} />
                                </div> */}
                                <p>{description}</p>
                              </li>
                            )}
                          </Draggable>
                        );
                      })
                    : null}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
            <Droppable droppableId="characters3">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {actionItems
                    ? actionItems.map(({ id, description }, index) => {
                        return (
                          <Draggable
                            key={id.toString()}
                            draggableId={id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {/* <div className="characters-thumb">
                                  <img src={thumb} alt={`${name} Thumb`} />
                                </div> */}
                                <p>{description}</p>
                              </li>
                            )}
                          </Draggable>
                        );
                      })
                    : null}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </header>
      </div>
    </>
  );
}

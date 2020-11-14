import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddBoard from "../../component/ButtonAddBoard";
import Board from "./component/Board";
import BoardReponsitory from "../../services/BoardReponsitory";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px",
    marginTop: "50px",
    float: "left",
  },

  home: {
    marginTop: "20px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [boards, setBoards] = React.useState([]);
  useEffect(() => {
    async function getBoards() {
      const response = await BoardReponsitory.getAllBoard();
      let body = response.data;
      setBoards(
        body.map(({ id, title, date, userId }) => ({
          id: id,
          title: title,
          date: date,
          userId: userId,
        }))
      );
    }
    getBoards();
  }, []);

  async function handelDelete(item) {
    await BoardReponsitory.delete(item.id).then(() => {
      let items = boards.filter((value) => value !== item);
      setBoards(items);});
  }
  return (
    <div className={classes.home}>
      <AddBoard className={classes.button} />
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          onClick={() => handelDelete(board)}
        />
      ))}
    </div>
  );
}

import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import BoardReponsitory from '../services/BoardReponsitory';
import Board from '../component/Board';
import AddBoard from '../component/ButtonAddBoard';


const useStyles = makeStyles((theme) => ({
    button: {
        margin: '10px',
        marginTop: '50px',
        float: 'left'
    },

    home: {
        marginTop: '20px'
    }

}));

export default function Home() {
    const classes = useStyles();
    const [boards, setBoards] = React.useState([]);
    useEffect(() => {
        async function getBoards() {
            const response = await BoardReponsitory.getAllBoard();
            let body = response.data;
            console.log( "asdasdas", body)
            setBoards(
                body.map(
                    ({ id, title, date, userId }) => ({
                        id: id,
                        title: title,
                        date: date,
                        userId: userId
                    })
                )
            );
        }
        getBoards();
    }, []);


    return (
        <div className={classes.home}>
            <AddBoard className= {classes.button} />
            { boards.map(board => <Board key ={board.id} board={board} />)}
        </div >
    )
}

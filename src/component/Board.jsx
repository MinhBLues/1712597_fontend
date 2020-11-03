import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import BoardReponsitory from '../services/BoardReponsitory';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        minWidth: 300,
        margin: '10px',
        color: 'black',
        border: '1px solid brown',
        float:'left',
        borderRadius: 3,
    },
    media: {
        height: 0,
    },
    description: {
        color: 'black',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function Board(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    async function handleDelete(id) {
        await BoardReponsitory.delete(id).then((response) => console.log(response));
        window.location.reload();
      }
    return (
        <Card className={classes.root} >
            <CardHeader
                title={props.board.title}
            />
            <CardContent>
                <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                    {props.board.date}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon style={{ color: 'blue' }} />
                </IconButton>
                <IconButton
                    className={classes.expand}
                    aria-expanded={expanded}
                    aria-label="show more"
                    onClick={() => handleDelete(props.board.id)}
                >
                    <DeleteIcon style={{ color: red[500] }} />
                </IconButton>
            </CardActions>
        </Card>
    );
}

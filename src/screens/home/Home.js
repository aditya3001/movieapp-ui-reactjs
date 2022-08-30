import { FormHelperText, GridListTileBar, TextField } from "@material-ui/core";
import { GridListTile } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { GridList } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "../../common/header/Header";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import './Home.css';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    filterHeading: {
        color: theme.palette.primary.light,
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Home = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [releasedMovie, setReleasedMovie] = useState([]);
    const [genre, setGenre] = React.useState([]);
    const [movieName, setMovieName] = React.useState('');
    const { classes } = props;
    const genres = [
        'Drama',
        'Action',
        'April Tucker',

    ];
    const FilterCard = () => {
        const filterHandler = (event) => {
            event.preventDefault();
            console.log(movieName);
            fetchReleasedMovie();

        }
        const movieNameHandler = (event) => {
            setMovieName(event.target.value);

        }
        const handleGenreChange = (event) => {
            const {
                target: { value },
            } = event;
            setGenre(
                typeof value === 'string' ? value.split(',') : value,
            );
        }

        return (
            <Card sx={{ maxWidth: 275 }} style={{ padding: 10 }}>
                <CardHeader title={<div className={classes.title}>FIND MOVIES BY:</div>} />
                <CardContent>
                    <FormControl className="formControl">
                        <InputLabel htmlFor="mov">Movie Name</InputLabel>
                        <Input id="mov"
                
                            value={movieName !== "" ? movieName : ""}
                            onChange={movieNameHandler} />
                    </FormControl>
                </CardContent>
                <CardContent>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel htmlFor="genre">GENRE</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="genre"
                            multiple
                            value={genre}
                            label="Genre"
                            onChange={handleGenreChange}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}

                        >
                            {genres.map((g) => (
                                <MenuItem key={g} value={g}>
                                    <Checkbox checked={genre.indexOf(g) > -1} />
                                    <ListItemText primary={g} />
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                </CardContent>
                <CardContent>
                    <FormControl sx={{ m: 1, width: 200 }}>
                        <InputLabel htmlFor="genre">GENRE</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="genre"
                            multiple
                            value={genre}
                            label="Genre"
                            onChange={handleGenreChange}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}

                        >
                            {genres.map((g) => (
                                <MenuItem key={g} value={g}>
                                    <Checkbox checked={genre.indexOf(g) > -1} />
                                    <ListItemText primary={g} />
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>
                </CardContent>

                <CardActions>
                    <Button variant="contained" color="primary" onClick={filterHandler}>APPLY</Button>
                </CardActions>
            </Card >

        )
    }




    const fetchReleasedMovie = () => {
        let url = "http://localhost:8085/api/v1/movies?page=1&limit=10&status=RELEASED";


        if (movieName !== "") {
            url += "&title=" + movieName;
        }
        if (genre != []) {
            url += "&genre=" + genre.join(',');

        }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setReleasedMovie(result.movies);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }

    useEffect(() => {
        fetch("http://localhost:8085/api/v1/movies?page=1&limit=10&status=PUBLISHED")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.movies);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

        fetchReleasedMovie();
    }, [])



    return (<div>
        <Header baseUrl={props.baseUrl} />
        <div className="heading">Upcoming Movies</div>
        <div className={classes.root}>
            <GridList cellHeight={250} className={classes.gridList} cols={6}>
                {items.map(tile => (
                    <GridListTile key={tile.img}>
                        <img src={tile.poster_url} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton>
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>

        <div className="container">
            <div className="released-movie">
                <div className="grid">
                    <GridList cellHeight={350} className="gridList" cols={4}>
                        {releasedMovie.map(tile => (

                            <GridListTile>
                                <Link to={{
                                    pathname: `movie/${tile.id}`,
                                    state: tile // your data array of objects
                                }} >

                                    <img src={tile.poster_url} alt={tile.title} />
                                    <GridListTileBar
                                        title={tile.title}
                                        subtitle={<span>Release Date: {tile.release_date}</span>}
                                        actionIcon={
                                            <IconButton>
                                            </IconButton>
                                        }
                                    />
                                </Link>

                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
            <div className="filter">
                <FilterCard></FilterCard>
            </div>

        </div>

    </div>)
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);
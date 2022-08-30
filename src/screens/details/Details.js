import { GridList, GridListTile, GridListTileBar, Typography } from "@material-ui/core";
import React, { createContext } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import YouTube from "react-youtube";
import { Rating } from "@mui/material";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const Details = (props) => {
    const { state } = props.location
    const isDetail=true;
    return (<div>
            <Header baseUrl={props.baseUrl} isDetail={isDetail} />
        <div className="back">&lt; Back to Home</div>
        <div className="detail-flex">
            <div className="movie-image">
                <img src={state.poster_url} alt="NA" className="center" />
            </div>
            <div className="movie-detail">
                <Typography variant="h2">Inception</Typography>
                <Typography className="genre-class"><b>Genre:</b> {state.genres.join(",")}</Typography>
                <Typography className="genre-class"><b>Duration:</b> {state.duration}</Typography>
                <Typography className="genre-class"><b>Release Date:</b> {state.release_date}</Typography>
                <Typography className="genre-class"><b>Rating:</b> {state.rating}</Typography>
                <Typography className="genre-class" style={{ marginTop: 16 }}><b>Plot:</b> <a href={state.wiki_url}>Wiki Link</a> {state.storyline}</Typography>
                <Typography className="genre-class" style={{ marginTop: 16 }}><b>Trailer:</b> </Typography>
                <YouTube videoId={state.trailer_url.substring(state.trailer_url.indexOf("?v="))} />
            </div>
            <div className="movie-review">
                <Typography><b>Rate this movie:</b>
                </Typography>
                <Rating
                    precision={0.5}
                    icon={<StarBorderIcon fontSize="inherit" style={{ color: "#fffb00" }} />}
                    emptyIcon={
                        <StarBorderIcon fontSize="inherit" />
                    } />
                <Typography><b>Artists:</b></Typography>
                <div className="grid">
                    <GridList className="gridList" cols={2}>
                        {state.artists.map(tile => (

                            <GridListTile>


                                <img src={tile.profile_url} alt={`${tile.first_name} ${tile.last_name}`} />
                                <GridListTileBar
                                    title={`${tile.first_name} ${tile.last_name}`}
                                />

                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        </div>


    </div>)
}

export default Details;
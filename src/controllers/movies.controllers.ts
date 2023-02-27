import { Request, Response } from "express";
import { TMovie } from "../interfaces/movies.interfaces";
import createMovieService from "../services/movies/createMovie.service";
import listMoviesService from "../services/movies/listMovies.service";
import deleteMovieService from "../services/movies/deleteMovie.service";
import updateMovieService from "../services/movies/updateMovie.service";

const createMovieController = async (req: Request, res: Response) => {
    const movieData: TMovie = req.body;

    const newMovie = await createMovieService(movieData);

    return res.status(201).json(newMovie);
};

const listMoviesController = async (req: Request, res: Response) => {
    const query: any = req.query;

    const movies = await listMoviesService(query);

    return res.json(movies);
};

const deleteMovieController = async (req: Request, res: Response) => {
    await deleteMovieService(parseInt(req.params.id));

    return res.status(204).send();
};

const updateMovieController = async (req: Request, res: Response) => {
    const movieData = req.body;

    const idMovie = parseInt(req.params.id);

    const updatedMovie = await updateMovieService(movieData, idMovie);

    return res.json(updatedMovie);
};

export {
    createMovieController,
    listMoviesController,
    deleteMovieController,
    updateMovieController,
};

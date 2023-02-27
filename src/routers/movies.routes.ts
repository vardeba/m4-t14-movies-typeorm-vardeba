import { Router } from "express";
import {
    createMovieController,
    deleteMovieController,
    listMoviesController,
    updateMovieController,
} from "../controllers/movies.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { ensureIdIsANumberMiddleware } from "../middlewares/ensureIdIsANumber.middleware";
import ensureMovieExistsMiddleware from "../middlewares/ensureMovieExists.middleware";
import { ensureNameIsUniqueMiddleware } from "../middlewares/ensureNameIsUnique.middleware";
import { movieSchema, updateMovieSchema } from "../schemas/movies.schemas";

const movieRoutes: Router = Router();

movieRoutes.post(
    "",
    ensureDataIsValidMiddleware(movieSchema),
    ensureNameIsUniqueMiddleware,
    createMovieController
);

movieRoutes.get("", listMoviesController);
movieRoutes.delete(
    "/:id",
    ensureIdIsANumberMiddleware,
    ensureMovieExistsMiddleware,
    deleteMovieController
);
movieRoutes.patch(
    "/:id",
    ensureIdIsANumberMiddleware,
    ensureDataIsValidMiddleware(updateMovieSchema),
    ensureMovieExistsMiddleware,
    ensureNameIsUniqueMiddleware,
    updateMovieController
);

export default movieRoutes;

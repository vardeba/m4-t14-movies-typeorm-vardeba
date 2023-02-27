import {
    movieSchema,
    movieCreateSchema,
    returnMovieSchema,
    returnMultipleMoviesSchema,
} from "../schemas/movies.schemas";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";

interface IPagination {
    previousPage: string | null;
    nextPage: string | null;
    count: number;
    data: TMoviesReturn | null;
}

type TMovie = z.infer<typeof movieSchema>;
type TMovieReturn = z.infer<typeof returnMovieSchema>;
type TMoviesReturn = z.infer<typeof returnMultipleMoviesSchema>;
type TMovieUpdate = DeepPartial<TMovie>;

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export {
    IPagination,
    TMovie,
    TMovieReturn,
    TMoviesReturn,
    TMovieUpdate,
    iMovieCreate,
    iMovieUpdate,
    iMovieRepo,
};

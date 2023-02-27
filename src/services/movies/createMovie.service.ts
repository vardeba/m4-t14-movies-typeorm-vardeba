import { TMovie, TMovieReturn } from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { Repository } from "typeorm";
import { returnMovieSchema } from "../../schemas/movies.schemas";
import { AppError } from "../../errors";

const createMovieService = async (movieData: TMovie): Promise<TMovieReturn> => {
    if (Number(movieData.duration) < 1) {
        throw new AppError("Invalid value", 404);
    }

    if (Number(movieData.price) < 1) {
        throw new AppError("Invalid value", 404);
    }

    const movieRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);

    const movie: Movie = movieRepository.create(movieData);

    await movieRepository.save(movie);

    const newMovie = returnMovieSchema.parse(movie);

    return newMovie;
};

export default createMovieService;

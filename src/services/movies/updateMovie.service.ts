import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { AppError } from "../../errors";
import { TMovieReturn, TMovieUpdate } from "../../interfaces/movies.interfaces";
import { returnMovieSchema } from "../../schemas/movies.schemas";

const updateMovieService = async (
    movieData: TMovieUpdate,
    idUser: number
): Promise<TMovieReturn> => {
    if (Object.keys(movieData).length < 1) {
        throw new AppError(
            "At least one of the following keys must be sent: name, duration, price!",
            404
        );
    }

    if (Number(movieData.duration) < 1) {
        throw new AppError("Invalid value", 404);
    }

    if (Number(movieData.price) < 1) {
        throw new AppError("Invalid value", 404);
    }

    const movieRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);

    const oldMovieData = await movieRepository.findOneBy({
        id: idUser,
    });

    const movie = movieRepository.create({
        ...oldMovieData,
        ...movieData,
    });

    await movieRepository.save(movie);

    const updatedMovie = returnMovieSchema.parse(movie);

    return updatedMovie;
};

export default updateMovieService;

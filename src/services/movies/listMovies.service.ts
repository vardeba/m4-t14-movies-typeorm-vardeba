import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { IPagination } from "../../interfaces/movies.interfaces";
import { returnMultipleMoviesSchema } from "../../schemas/movies.schemas";

const listMoviesService = async (query: any): Promise<IPagination> => {
    if (!query.page || query.page % 1 !== 0) {
        query.page = 1;
    }

    if (query.page < 1) {
        query.page = 1;
    }

    if (!query.perPage || query.perPage % 1 !== 0) {
        query.perPage = 5;
    }

    if (query.perPage > 5 || query.perPage < 1) {
        query.perPage = 5;
    }

    let page: number = Number(query.page);

    let perPage: number = Number(query.perPage);

    let orderObject = {};

    if (!query.order) {
        query.order = "asc";
    }

    if (!query.sort) {
        orderObject = {
            id: "ASC",
        };
    } else if (
        query.sort.toLowerCase() === "price" &&
        query.order.toLowerCase() === "asc"
    ) {
        orderObject = {
            price: "ASC",
        };
    } else if (
        query.sort.toLowerCase() === "price" &&
        query.order.toLowerCase() === "desc"
    ) {
        orderObject = {
            price: "DESC",
        };
    } else if (
        query.sort.toLowerCase() === "duration" &&
        query.order.toLowerCase() === "asc"
    ) {
        orderObject = {
            duration: "ASC",
        };
    } else if (
        query.sort.toLowerCase() === "duration" &&
        query.order.toLowerCase() === "desc"
    ) {
        orderObject = {
            duration: "DESC",
        };
    }

    const baseURL: string = `http://localhost:3000/movies`;

    let prevPage: string | null = "";

    let nextPage: string | null = "";

    const movieRepository: Repository<Movie> =
        AppDataSource.getRepository(Movie);

    const countMovies: Array<Movie> = await movieRepository.find();

    const findMovies: Array<Movie> = await movieRepository.find({
        take: perPage,
        skip: perPage * (page - 1),
        order: orderObject,
    });

    const movies = returnMultipleMoviesSchema.parse(findMovies);

    if (page === 1) {
        prevPage = null;
    } else {
        prevPage = `${baseURL}?page=${page - 1}&perPage=${perPage}`;
    }

    if (
        countMovies.length % perPage > 0 &&
        countMovies.length / perPage > page
    ) {
        nextPage = `${baseURL}?page=${page + 1}&perPage=${perPage}`;
    } else {
        nextPage = null;
    }

    const count: number = countMovies.length;

    const pagination: IPagination = {
        prevPage,
        nextPage,
        count: count,
        data: movies,
    };

    return pagination;
};

export default listMoviesService;

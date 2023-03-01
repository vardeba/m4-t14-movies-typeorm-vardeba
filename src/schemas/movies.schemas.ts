import { z } from "zod";

const movieSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional().nullable(),
    duration: z.number().positive(),
    price: z.number().positive(),
});

const movieCreateSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional().nullable(),
    duration: z.number().min(1),
    price: z.number().min(1),
});

const returnMovieSchema = movieSchema.extend({
    id: z.number(),
});

const returnMultipleMoviesSchema = returnMovieSchema.array();

const updateMovieSchema = movieSchema.partial();

export {
    movieSchema,
    movieCreateSchema,
    returnMovieSchema,
    returnMultipleMoviesSchema,
    updateMovieSchema,
};

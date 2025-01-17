import { z } from "zod";

const movieSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional().nullable(),
    duration: z.number().positive().int(),
    price: z.number().positive().int(),
});

const movieCreateSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().optional().nullable(),
    duration: z.number().positive().int(),
    price: z.number().positive().int(),
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

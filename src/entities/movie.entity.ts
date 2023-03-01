import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies")
class Movie {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @Column({ type: "text", nullable: true })
    description?: string | null | undefined;

    @Column()
    duration: number;

    @Column({ type: "integer" })
    price: number;
}

export { Movie };

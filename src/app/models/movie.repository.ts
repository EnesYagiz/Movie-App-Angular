import { Movie } from "./movie";

export class MovieRepository {

  private movies: Movie[];
  constructor() {
    this.movies = [
      {id: 1, title: "film 1", description: "Film 1 Açıklaması...", imageUrl: "1.jpeg", isPopular: false, datePublished: new Date(1990,10,6)},
      {id: 2, title: "film 2", description: "Film 2 Açıklaması...", imageUrl: "2.jpeg", isPopular: true, datePublished: new Date(1991,9,7)},
      {id: 3, title: "film 3", description: "Film 3 Açıklaması...", imageUrl: "3.jpeg", isPopular: false, datePublished: new Date(1992,8,8)},
      {id: 4, title: "film 4", description: "Film 4 Açıklaması...", imageUrl: "4.jpeg", isPopular: true, datePublished: new Date(1994,6,10)},
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }
  getMovieById(id: number): Movie | undefined {
    return this.movies.find(i => i.id == id);//bulduğu ilk değeri geriye döndürür

  }

  getPopularMovies() {
    return this.movies.filter(i => i.isPopular == true);

  }

}

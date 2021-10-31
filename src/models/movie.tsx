export default class Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string, Value: string}[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;

    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;

    dateAdded: number;
    voteCount: number;
    searchTitle: string;

    constructor(json: any) {
        const date = new Date();

        this.dateAdded = date.getTime();
        this.voteCount = 1;
        this.searchTitle = json.Title.toLowerCase();

        this.Title = json.Title;
        this.Year = json.Year;
        this.Rated = json.Rated;
        this.Released = json.Released;
        this.Runtime = json.Runtime;
        this.Genre = json.Genre;
        this.Director = json.Director;
        this.Writer = json.Writer;
        this.Actors = json.Actors;
        this.Plot = json.Plot;
        this.Language = json.Language;
        this.Country = json.Country;
        this.Awards = json.Awards;
        this.Poster = json.Poster;
        this.Ratings = json.Ratings;
        this.Metascore = json.Metascore;
        this.imdbRating = json.imdbRating;
        this.imdbVotes = json.imdbVotes;
        this.imdbID = json.imdbID;
        this.Type = json.Type;

        this.DVD = json.DVD || '';
        this.BoxOffice = json.BoxOffice || '';
        this.Production = json.Production || '';
        this.Website = json.Website || '';
    }
}
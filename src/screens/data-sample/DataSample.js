import moment from "moment";
export const imageUrl = 'https://image.tmdb.org/t/p/w500/';

export const customizeData = (data) => {
    return data.map((item, index) => {
        return{
            id: item.id,
            title: item.title,
            image: `${imageUrl}${item.poster_path}`,
            time: item.runtime,
            language: item.original_language,
            date: moment(item.release_date).format('DD-MMM-YYYY'),
            overview: item.overview,
            starring: item.tagline,
            idmb: item.vote_average,
            category: item.genres?.name
        }
    });
};


export const dataSample = {
    moviesList: [
        {
            adult: false,
            backdrop_path: "/3nv2TEz2u178xPXzdKlZdUh5uOI.jpg",
            belongs_to_collection: null,
            budget: 63000000,
            genres: [
                {
                    id: 18,
                    name: "Drama"
                }
            ],
            homepage: "http://www.foxmovies.com/movies/fight-club",
            id: 550,
            imdb_id: "tt0137523",
            original_language: "en",
            original_title: "Fight Club",
            overview: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
            popularity: 42.644,
            poster_path: "/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
            production_companies: [
                {
                    id: 508,
                    logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
                    name: "Regency Enterprises",
                    origin_country: "US"
                },
                {
                    id: 711,
                    logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
                    name: "Fox 2000 Pictures",
                    origin_country: "US"
                },
                {
                    id: 20555,
                    logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
                    name: "Taurus Film",
                    origin_country: "DE"
                },
                {
                    id: 54051,
                    logo_path: null,
                    name: "Atman Entertainment",
                    origin_country: ""
                },
                {
                    id: 54052,
                    logo_path: null,
                    name: "Knickerbocker Films",
                    origin_country: "US"
                },
                {
                    id: 25,
                    logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
                    name: "20th Century Fox",
                    origin_country: "US"
                },
                {
                    id: 4700,
                    logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
                    name: "The Linson Company",
                    origin_country: "US"
                }
            ],
            production_countries: [
                {
                    iso_3166_1: "DE",
                    name: "Germany"
                },
                {
                    iso_3166_1: "US",
                    name: "United States of America"
                }
            ],
            release_date: "1999-10-15",
            revenue: 100853753,
            runtime: 139,
            spoken_languages: [
                {
                    english_name: "English",
                    iso_639_1: "en",
                    name: "English"
                }
            ],
            status: "Released",
            tagline: "Mischief. Mayhem. Soap.",
            title: "Fight Club",
            video: false,
            vote_average: 8.4,
            vote_count: 22585
        }
    ]
};

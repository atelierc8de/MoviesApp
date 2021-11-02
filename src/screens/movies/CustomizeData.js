import moment from "moment";

export const imageUrl = 'https://image.tmdb.org/t/p/w500/';
export const customizeDataMovies = (data) => {
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
            vote: item.vote_count
        }
    });
};

const imagePosterUrl = 'https://image.tmdb.org/t/p/w500';
export const customizeDataFavorite = (data) => {
    return data.map((item, index) => {
        return{
            id: item.id,
            title: item.title,
            image: `${imagePosterUrl}${item.poster_path}`,
            time: item.runtime,
            language: item.original_language,
            date: moment(item.release_date).format('DD-MMM-YYYY'),
            idmb: item.vote_average,
            vote: item.vote_count
        }
    });
};

const youtubeUrl = 'https://www.youtube.com/watch?v=';
export const customizeDataTeaser = (data) => {
    return data.map((item, index) => {
        return{
            id: item.id,
            keyUrl: `${youtubeUrl}${item.key}`,
            name: item.name,
            quality: item.size,
            dateUpload: moment(item.published_at, 'YYYY-MM-DD').format('DD-MMM-YYYY') || 'N/A'
        }
    });
};

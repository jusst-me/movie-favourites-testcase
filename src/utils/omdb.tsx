import axios from 'axios';

export const searchMovie = (title: string) => {
    return axios.get(`https://www.omdbapi.com/?t=${title}&apikey=f946b155`)
        .then(res => {
            return res.data.Response === 'True' ? res.data : false;
        })
        .catch(error => {
            console.log('error', error)
        })
}
export const searchMovieById = (id: string) => {
    return axios.get(`https://www.omdbapi.com/?i=${id}&apikey=f946b155`)
        .then(res => {
            return res.data.Response === 'True' ? res.data : false;
        })
        .catch(error => {
            console.log('error', error)
        })
}
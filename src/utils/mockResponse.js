import axios from 'axios';

const MockResponse = {

    async getMovieData() {
        const encodedURI = window.encodeURI('https://my-json-server.typicode.com/coharish/web-api/db');

        try {
            return await axios({
                method: "GET",
                url: encodedURI,
                "headers": {
                    'Content-Type': "application/json",
                }
            }).then(function (response) {
                return response.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export default MockResponse;
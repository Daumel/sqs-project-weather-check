import axios from 'axios';

const POST_REQUEST_URL = '/api/weather-check';

export async function createWeatherCheck(name: string, temp: number) {
    await axios
        .post(POST_REQUEST_URL, {
            name,
            temp,
        })
        .catch(error => {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.log(error.response);
            } else {
                console.log(error);
            }
        });
}

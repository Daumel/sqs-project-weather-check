import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    duration: '2m',
    vus: 50,
    thresholds: {
        http_req_duration: ['p(95)<500'],
        checks: ['rate>0.99'],
    },
};

const BASE_URL = 'http://127.0.0.1:3000';

export default function () {
    const payload = JSON.stringify({
        name: 'Teststadt',
        temp: 50,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const postRes = http.post(`${BASE_URL}/api/weather-check`, payload, params);
    check(postRes, {
        'status is 200': r => r.status === 200,
    });
    sleep(1);

    const getRes = http.get(`${BASE_URL}/api/weather-checks`);
    check(getRes, {
        'status is 200': r => r.status === 200,
    });
    sleep(1);
}

import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 25 },
        { duration: '1m', target: 25 },
        { duration: '1m', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<750'],
        checks: ['rate>0.99'],
    },
    ext: {
        loadimpact: {
            projectID: 3648566,
            distribution: {
                'amazon:de:frankfurt': { loadZone: 'amazon:de:frankfurt', percent: 100 },
            },
        },
    },
};

const HOSTNAME = __ENV.HOSTNAME || 'https://sqs-project-weather-check.vercel.app';

export default function () {
    const payload = JSON.stringify({
        name: 'K6-Teststadt',
        temp: 50,
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const postRes = http.post(`${HOSTNAME}/api/weather-check`, payload, params);
    check(postRes, {
        'status is 200': r => r.status === 200,
    });
    sleep(1);

    const getRes = http.get(`${HOSTNAME}/api/weather-checks`);
    check(getRes, {
        'status is 200': r => r.status === 200,
    });
    sleep(1);
}

export function teardown() {
    http.del(`${HOSTNAME}/api/weather-checks?name=K6-Teststadt`);
}

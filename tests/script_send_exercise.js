import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 100,
    duration: '10s',
    summaryTrendStats: ["avg","med", "p(95)", "p(99)"],
};

export default function (){
    let url = 'http://host.docker.internal:7800/api/saveCode';
    let data = {
        uuid: '2cfa1e93-87e3-4f74-a8eb-b6e21431f8c7',
        exercise_id: Math.floor(Math.random() * 8)+1,
        code: '<h1>Hello World!</h1>'
    };
    http.post(url,data);
    sleep(1);
}

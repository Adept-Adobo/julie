import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const randomProductId = Math.floor(Math.random() * 500000);
  const res = http.get(`http://localhost:3000/api/products/${randomProductId}/related`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}

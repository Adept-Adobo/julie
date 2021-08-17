import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '20s', target: 10 },
    { duration: '30s', target: 200 },
    { duration: '1m', target: 1000 },
    { duration: '1m30s', target: 2000 },
    { duration: '30s', target: 500 },
    { duration: '10s', target: 100 },
  ],
};

export default function () {
  const randomPageNumber = Math.floor(Math.random() * 100);
  const randomCountNumber = Math.floor(Math.random() * 100);
  const randomProductId = Math.floor(Math.random() * 500000);

  const getProducts = http.get(`http://localhost:3001/api/products?page=${randomPageNumber}&count=${randomCountNumber}`);
  check(getProducts, { 'status was 200': (r) => r.status === 200 });
  sleep(1);

  const styleById = http.get(`http://localhost:3001/api/products/${randomProductId}/styles`);
  check(styleById, { 'status was 200': (r) => r.status === 200 });
  sleep(1);

  const prodById = http.get(`http://localhost:3001/api/products/${randomProductId}`);
  check(prodById, { 'status was 200': (r) => r.status === 200 });
  sleep(1);

  const relatedById = http.get(`http://localhost:3001/api/products/${randomProductId}/related`);
  check(relatedById, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
}

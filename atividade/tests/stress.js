import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '2m', target: 200 },  
    { duration: '2m', target: 500 },   
    { duration: '2m', target: 1000 },  
  ],
  
};

export default function () {
   const url = `${BASE_URL}/checkout/crypto`;

  const res = http.post(url, null, { headers: { 'Content-Type': 'application/json' } });

  check(res, {
    'status é 201': (r) => r.status === 201,
  });

  sleep(1);
}

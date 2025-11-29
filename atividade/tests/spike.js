import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '30s', target: 10 },   // baixa carga
    { duration: '10s', target: 300 },  // pico rápido
    { duration: '1m', target: 300 },   // mantém pico
    { duration: '10s', target: 10 },   // volta rápido
    { duration: '30s', target: 10 },   // estabiliza
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const url = `${BASE_URL}/checkout/simple`;

  const payload = JSON.stringify({
    amount: 100,
    currency: 'BRL',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status é 201': (r) => r.status === 201,
  });

  sleep(1);
}

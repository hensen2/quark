import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(
    'https://api.example.com/discount/code',
    // `request` is the Fetch API representation of the intercepted request.
    async ({ request }) => {
      const code = await request.text();

      return HttpResponse.json({
        code,
        amount: 20,
      });
    },
  ),
];

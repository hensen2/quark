import { http, HttpResponse } from 'msw';

export const handlers = [
  // http.get('/', ({ cookies }) => {
  //   const isAuthenticated = !!cookies.refreshToken;

  //   if (isAuthenticated) {
  //     return new HttpResponse(null, {
  //       status: 302,
  //       headers: { Location: '/dashboard' },
  //     });
  //   }
  // }),
  http.get('https://api.example.com/auth/status', () => {
    return HttpResponse.json(
      {
        isAuthenticated: false,
      },
      { status: 200 },
    );
  }),
  http.post('https://api.example.com/auth/login', () => {
    return HttpResponse.json(
      {
        isAuthenticated: true,
      },
      { status: 200 },
    );
  }),
];

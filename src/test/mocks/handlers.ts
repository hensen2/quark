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
  http.get('https://api.example.com/auth/status', ({ cookies }) => {
    if (cookies.refreshToken) {
      return HttpResponse.json(
        {
          isAuthenticated: true,
        },
        { status: 200 },
      );
    }

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
      {
        status: 200,
        headers: {
          'Set-Cookie': 'refreshToken=secret',
        },
      },
    );
  }),
  http.post('https://api.example.com/auth/logout', () => {
    return HttpResponse.json(
      {
        isAuthenticated: false,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'refreshToken=; Max-Age=0',
        },
      },
    );
  }),
];

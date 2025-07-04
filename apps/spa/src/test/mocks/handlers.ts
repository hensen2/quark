import { delay, HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/', ({ cookies }) => {
    if (cookies.refreshToken) {
      return new HttpResponse(null, {
        status: 302,
        headers: { Location: '/dashboard' },
      });
    }
  }),
  http.get('/dashboard', ({ cookies }) => {
    if (!cookies.refreshToken) {
      return new HttpResponse(null, {
        status: 302,
        headers: { Location: '/' },
      });
    }
  }),
  http.get('/auth/status', async ({ cookies }) => {
    await delay(0);
    if (cookies.sessionId === 'user') {
      return HttpResponse.json(
        {
          isAuthenticated: true,
        },
        {
          status: 200,
        },
      );
    }

    return HttpResponse.json(
      {
        isAuthenticated: false,
      },
      {
        status: 200,
        headers: {
          'Set-Cookie': 'sessionId=anonymous',
        },
      },
    );
  }),
  http.post('/auth/login', () => {
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
  http.post('/auth/logout', () => {
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

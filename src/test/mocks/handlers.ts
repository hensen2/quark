import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/user', () => {
    return HttpResponse.json(
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
      },
      { status: 200 },
    );
  }),
  http.get('https://api.example.com/auth/me', () => {
    return HttpResponse.json(
      {
        isAuthenticated: false,
      },
      { status: 200 },
    );
  }),
];

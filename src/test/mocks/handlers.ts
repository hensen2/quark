import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost/api/user', () => {
    return HttpResponse.json(
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
      },
      { status: 200 },
    );
  }),
  http.get('http://localhost/api/auth', () => {
    return HttpResponse.json(
      {
        isAuthenticated: false,
      },
      { status: 200 },
    );
  }),
];

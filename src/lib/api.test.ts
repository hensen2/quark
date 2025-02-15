import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';
import { api } from './api';

describe('API', () => {
  it('should work', async () => {
    const res = await api.get('/user');

    expect(res).toEqual({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    });
  });

  it('should error', async () => {
    server.use(
      http.get('http://localhost:3000/api/user', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    try {
      await api.get('/user');
    } catch (err) {
      console.log(err.response.status);
    }
  });
});

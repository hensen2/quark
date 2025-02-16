import { server } from '@/test/mocks/server';
import { AxiosError } from 'axios';
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
      http.get('/user', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    try {
      await api.get('/user');
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.response?.status);
      }
    }
  });
});

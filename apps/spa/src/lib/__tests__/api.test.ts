import { AxiosError } from 'axios';
import { HttpResponse, http } from 'msw';
import { server } from '@/test/mocks/server';
import { api, axiosConfig } from '../api';

describe('apiClient', () => {
  it('should export a configured axios instance', () => {
    expect(api.defaults).toEqual(expect.objectContaining(axiosConfig));
  });

  it('should resolve GET request on success', async () => {
    server.use(
      http.get(axiosConfig.baseURL, () => {
        return HttpResponse.json(
          {
            isData: true,
          },
          { status: 200 },
        );
      }),
    );

    const response = await api.get('/');

    expect(response).toEqual({
      isData: true,
    });
  });

  it('should reject GET request on error', async () => {
    server.use(
      http.get(axiosConfig.baseURL, () => {
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    await expect(api.get('/')).rejects.toThrow(AxiosError);

    try {
      await api.get('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        expect(err.response?.status).toBe(500);
      }
    }
  });
});

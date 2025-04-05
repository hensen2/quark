import axios, { type AxiosInstance, type CreateAxiosDefaults } from 'axios';

export type Auth = {
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export class AuthClient {
  #clientConfig: CreateAxiosDefaults;
  #clientInstance: AxiosInstance;
  #loaded = false;
  #baseURL = import.meta.env.VITE_API_URL;
  #withCredentials = true;
  #adapter = 'fetch';

  #getOrCreateClient = (config: CreateAxiosDefaults): AxiosInstance => {
    if (!this.#clientInstance) {
      this.#clientInstance = axios.create({
        ...config,
        baseURL: this.#baseURL,
        withCredentials: this.#withCredentials,
        adapter: this.#adapter,
      });
    }

    return this.#clientInstance;
  };

  #loadClient = (): void => {
    if (!this.#clientInstance || this.#loaded) {
      return;
    }

    this.getAuth();
  };

  constructor(config: CreateAxiosDefaults) {
    this.#clientConfig = config;
    this.#clientInstance = this.#getOrCreateClient(this.#clientConfig);

    this.#loadClient();
  }

  async getAuth(): Promise<Auth> {
    return await this.#clientInstance.get('/auth/status');
  }

  login(credentials: LoginCredentials): Promise<Auth> {
    return this.#clientInstance.post('/auth/login', { ...credentials });
  }

  logout(): Promise<void> {
    return this.#clientInstance.post('/auth/logout');
  }

  register(credentials: LoginCredentials): Promise<Auth> {
    return this.#clientInstance.post('/auth/register', { ...credentials });
  }

  forgotPassword(credentials: LoginCredentials): Promise<Auth> {
    return this.#clientInstance.post('/auth/forgot-password', {
      ...credentials,
    });
  }

  resetPassword(credentials: LoginCredentials): Promise<Auth> {
    return this.#clientInstance.post('/auth/reset-password', {
      ...credentials,
    });
  }
}

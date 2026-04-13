import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export abstract class BaseRepository {
  protected readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001",
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("@jobmail:token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem("@jobmail:token");
          window.location.href = "/";
        }
        return Promise.reject(error);
      },
    );
  }
}

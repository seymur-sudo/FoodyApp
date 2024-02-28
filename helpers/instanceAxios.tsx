import axios, { AxiosError, AxiosInstance } from "axios";

export const instanceAxios: AxiosInstance = axios.create({
  baseURL: "/api/",
});

instanceAxios.interceptors.request.use(
  (config) => {
    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async () => {
  try {
    const response = await instanceAxios.post("/auth/refresh", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    return Promise.reject(error);
  }
};

const processQueue = (accessToken: string | null) => {
  refreshPromise = null;
  isRefreshing = false;
};

instanceAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken();
      }

      try {
        const accessToken = await refreshPromise;
        if (error.config) {
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return instanceAxios(error.config);
        } else {
          return Promise.reject(new Error("Request config is undefined"));
        }
      } catch (error) {
        return Promise.reject(error);
      } finally {
        processQueue(null);
      }
    }

    return Promise.reject(error);
  }
);

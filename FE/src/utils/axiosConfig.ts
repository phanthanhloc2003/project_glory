import axios, { AxiosInstance, AxiosResponse } from "axios";

interface UserInfo {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  userInfo: UserInfo;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (
      config.url !== "/login" &&
      response &&
      (response.status === 401 || response.status === 403)
    ) {
      const originalRequest = config;

      try {
        const newAccessToken = await getNewToken();
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }
    }

    console.error("API Error:", response ? response.data : error.message);
    return Promise.reject(error);
  }
);

const getNewToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  try {
    const response = await apiClient.put<AuthResponse>("refresh-token", {
      refreshToken,
    });
    const result = response.data;

    localStorage.setItem("accessToken", result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(result.userInfo));

    return result.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

export const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
  try {
    const response = await apiClient.get<T>(url);
    return response;
  } catch (error) {
    console.error("GET request failed:", error);
    throw error;
  }
};

export const post = async <T>(
  url: string,
  data: object
): Promise<AxiosResponse<T>> => {
  try {
    const response = await apiClient.post<T>(url, data);
    return response;
  } catch (error) {
    console.error("POST request failed:", error);
    throw error;
  }
};

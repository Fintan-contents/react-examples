import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
export type ErrorType<Error> = AxiosError<Error>;
const REQUEST_TIMEOUT = 15000;
const BASE_URL: string =
  process.env.NEXT_PUBLIC_REACT_APP_BACKEND_BASE_URL!.toString();
const backendUrl = `${BASE_URL}`;
const AXIOS_INSTANCE = Axios.create({ baseURL: backendUrl });
const getDefaultAxiosConfig = () => {
  return {
    headers: {
      Accept: "application/json",
    },
  } as AxiosRequestConfig;
};
const customInstance = <T>(
  axiosInstance: AxiosInstance,
): ((config: AxiosRequestConfig) => Promise<AxiosResponse<T>>) => {
  const defaultAxiosConfig = getDefaultAxiosConfig();
  return (config: AxiosRequestConfig) => {
    const source = Axios.CancelToken.source();
    const requestConfig = {
      ...defaultAxiosConfig,
      ...config,
      cancelToken: source.token,
    };
    const promise = axiosInstance(requestConfig);
    // @ts-ignore
    promise.cancel = () => {
      source.cancel("Query was cancelled by React Query");
    };
    let timeoutId: NodeJS.Timeout | null;
    if (REQUEST_TIMEOUT) {
      timeoutId = setTimeout(() => {
        timeoutId = null;
        source.cancel("Query was cancelled by Request Timeout");
      }, REQUEST_TIMEOUT);
    }
    return promise
      .catch((error) => {
        if (Axios.isCancel(error)) {
          const cancelError = error as { message: string };
          if (
            cancelError.message === "Query was cancelled by Request Timeout"
          ) {
            throw new Error("Request Timeout");
          }
        }
        throw error;
      })
      .finally(() => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
  };
};
const backendCustomInstance = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return customInstance<T>(AXIOS_INSTANCE)(config);
};
export { AXIOS_INSTANCE, backendCustomInstance };

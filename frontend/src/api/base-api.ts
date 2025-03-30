import { appAxios } from "@/config/api-config";
import { AppError } from "@/error/app-error";
import { AxiosError, AxiosResponse } from "axios";
import qs from "qs";


interface IApiParam {
  api: string;
  data: any;
  headers?: any;
  isFormData?: boolean;
}

export const _post = async <T>({
  api,
  data,
  headers,
  isFormData = false, // New parameter to check if data should be treated as form-data
}: IApiParam & { isFormData?: boolean }): Promise<T> => {
  try {
    // If isFormData is true, convert the data to FormData
    if (isFormData) {
      const formData = new FormData();

      // Loop through the data object to build the FormData
      Object.keys(data).forEach((key) => {
        const value = (data as any)[key];

        if (Array.isArray(value)) {
          // Check if array contains { key: File } objects
          value.forEach((item) => {
            if (typeof item === "object" && item !== null) {
              // Append each { key: File } object individually
              Object.entries(item).forEach(([innerKey, file]) => {
                if (file instanceof File || file instanceof Blob) {
                  formData.append(innerKey, file); // Append using the specific key and File
                }
              });
            } else {
              formData.append(key, item);
            }
          });
        } else {
          // Append scalar values (string, number, etc.)
          formData.append(key, value);
        }
      });

      // Override data with the formData object
      data = formData;

      // Add multipart/form-data header if it's not already set
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
    }

    let response: AxiosResponse<T, any>;

    // Perform the API call
    if (headers) {
      response = await appAxios.post<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.post<T>(api, data);
    }

    // Handle response
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _put = async <T>({
  api,
  data,
  headers,
  isFormData = false,
}: IApiParam): Promise<T> => {
  // If isFormData is true, convert the data to FormData

  // if (isFormData) {
  //   const formData = new FormData();

  //   // Loop through the data object to build the FormData
  //   Object.keys(data).forEach((key) => {
  //     const value = (data as any)[key];

  //     if (Array.isArray(value)) {
  //       // Check if array contains { key: File } objects
  //       value.forEach((item) => {
  //         if (typeof item === "object" && item !== null) {
  //           // Append each { key: File } object individually
  //           Object.entries(item).forEach(([innerKey, file]) => {
  //             if (file instanceof File || file instanceof Blob) {
  //               formData.append(innerKey, file); // Append using the specific key and File
  //             }
  //           });
  //         } else {
  //           formData.append(key, item);
  //         }
  //       });
  //     } else {
  //       // Append scalar values (string, number, etc.)
  //       formData.append(key, value);
  //     }
  //   });

  //   // Override data with the formData object
  //   data = formData;

  //   // Add multipart/form-data header if it's not already set
  //   headers = {
  //     ...headers,
  //     "Content-Type": "multipart/form-data",
  //   };
  // }

  if (isFormData) {
    const formData = new FormData();

    // Loop through the data object to build the FormData
    Object.keys(data).forEach((key) => {
      const value = (data as any)[key];

      if (Array.isArray(value)) {
        // Check if array contains { key: File } objects
        key === "oldMedia" && console.log("values........oldmedia", value);
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            // Append each { key: File } object individually
            Object.entries(item).forEach(([innerKey, file]) => {
              if (file instanceof File || file instanceof Blob) {
                formData.append(innerKey, file); // Append using the specific key and File
              }
            });

            console.log("item.......", item);
            formData.append(key, JSON.stringify(item));
          } else {
            formData.append(key, item);
          }
        });
      } else {
        // Append scalar values (string, number, etc.)
        formData.append(key, value);
      }
    });

    // Override data with the formData object
    data = formData;

    // Add multipart/form-data header if it's not already set
    headers = {
      ...headers,
      "Content-Type": "multipart/form-data",
    };
  }
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.put<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.put<T>(api, data);
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _get = async <T>({
  api,
  data,
  headers,
}: IApiParam): Promise<T> => {
  try {
    let url = api;
    if (data) {
      url += `?${qs.stringify(data, {
        arrayFormat: "repeat",
        skipNulls: true,
      })}`;
    }
    console.log(url);
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.get<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.get<T>(url);
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _patch = async <T>({
  api,
  data,
  headers,
}: IApiParam): Promise<T> => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.patch<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.patch<T>(api, data);
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _delete = async <T>({ api, data, headers }: IApiParam) => {
  try {
    let url = api;
    if (data) {
      url += "?";
      for (let key in data) {
        url = `${url}${key}=${data[key]}&`;
      }
      url = url.substring(0, url.length - 1);
    }
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.delete<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.delete<T>(url);
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

const HandleError = (error: any) => {
  if (error instanceof AxiosError) {
    console.log("errrrr", error);
    if (error.response?.status) {
      const err = new AppError(
        error.response?.status,
        "Validation Errors...",
        error.response.data
      );

      // showError(err);
      return err;
    }
  }
  // showError(error);
  return error;
};

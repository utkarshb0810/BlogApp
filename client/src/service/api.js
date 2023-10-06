import axios from "axios";
import { API_NOTIFICATIONS_MESSAGES, SERVICE_URLS } from "../constants/config";

const API_URL = 'http://localhost:8000';


const axiosInstance = axios.create({
  baseURL: API_URL,
  //timeout if api response is delay or in pending state
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    //stop gloabal loader here if u show a loader
    return processResponse(response);
  },
  function (error) {
    //stop gloabal loader here if u show a loader
    return Promise.reject(processError(error));
  }
);

// //////
// if success ->>> return {isSuccess: true,data:object}
// if fail ->>> return {isFailure:true, status:string , msg: string , code:int}
// ///////

const processResponse = (response) => {
  if (response?.status === 200) {
    return {
      isSuccess: true,
      data: response?.data,
    };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error.response) {
    console.log("Error in Response: ", error.toJSON());
    //request made and server responded with a status other that cause out of the range of(200 nahin bheja hai)
    return {
      isError: true,
      msg: API_NOTIFICATIONS_MESSAGES.responseFailure,
      code: error.response.status,
    };
  } else if (error.request) {
    //request made but no response was received(matlab ki connection problem with database or network connectivity error)
    console.log("Error in request: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATIONS_MESSAGES.requestfailure,
      //yahaan koi status (code) nahin milega kyunki backend me request gyi hi nahi hai
      code: "",
    };
  } else {
    //something wrong in setting up request that throws an error (the frontend)
    console.log("Error in Network: ", error.toJSON());
    return {
      isError: true,
      msg: API_NOTIFICATIONS_MESSAGES.networkError,
      code: "",
    };
  }
};

const API = {};

//to traverse service url using for of loop
for (const [key, value] of Object.entries(SERVICE_URLS)) {
  //here key means usersignup keyword in config file
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageComplete = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageComplete);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageComplete = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageComplete);
        }
      },
    });
}

export { API };

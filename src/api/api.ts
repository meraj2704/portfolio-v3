import axiosInstance from "./axiosInstance";
import axios from "axios";

export const apiGet = async (endPoint: string) => {
  const { data } = await axiosInstance.get(endPoint);
  return data;
};
export const apiPost = async (endPoint: string, payLoad: any) => {
  const { data } = await axiosInstance.post(endPoint, payLoad);
  return data;
};

export const apiPut = async (endPoint: string, payLoad: any) => {
  const { data } = await axiosInstance.put(endPoint, payLoad);
  return data;
};
export const apiPatch = async (endPoint: string, payLoad: any) => {
  const { data } = await axiosInstance.patch(endPoint, payLoad);
  return data;
};

export const apiDelete = async (endPoint: string) => {
  const { data } = await axiosInstance.delete(endPoint);
  return data;
};

export const fetchAirports = async () => {
  try {
    const res = await axios.get("/json/updated_airport_final.json");
    const airports = res.data;
    return airports;
  } catch (error) {
    console.error("Error fetching airports:", error);
    return [];
  }
};

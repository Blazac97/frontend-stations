import Axios from "axios";
import type { ICreateRoutePayload, IRoute, IUpdateRoutePayload } from "./types";

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

export const getRoutesList = () => axios.get<IRoute[]>("/routes");

export const getRouteDetails = (id: string) =>
  axios.get<IRoute>(`/routes/${id}`);

export const deleteRouteById = (id: string) =>
  axios.delete<IRoute>(`/routes/${id}`);

export const createRoute = (data: ICreateRoutePayload) =>
  axios.post<IRoute>("/routes", data);

export const updateRoute = (data: IUpdateRoutePayload) =>
  axios.put<IRoute>(`/routes/${data.id}`, data);

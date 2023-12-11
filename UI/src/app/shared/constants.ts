import { environment } from "src/environments/environment";

export const BASE_URL = "/_v1";


export const serverUrl = environment.serverUrl;
export const apiUrl = serverUrl + BASE_URL;
export const tokenKey = "token";
export const userProfile = "user";
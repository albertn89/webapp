import apiClient from "../config/api-client";
import { Profile } from "../model/Profile";

export const createProfile = (profile: Profile) => {
	return apiClient.post<Profile>("/register", profile);
};

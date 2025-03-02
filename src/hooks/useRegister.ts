import { useState } from "react";

import { Profile } from "../model/Profile";
import { createProfile } from "../services/auth-service";

export const useRegister = () => {
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [toast, setToast] = useState<string>("");

	const signup = (profile: Profile) => {
		setIsLoading(true);
		createProfile(profile)
			.then((response) => {
				if (response && response.status === 201) {
					setToast("Profile created successfully");
				}
			})
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	};

	return { error, isLoading, toast, signup };
};

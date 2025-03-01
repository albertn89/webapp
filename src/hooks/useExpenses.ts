import { useEffect, useState } from "react";
import { Expense } from "../model/Expense";
import { getExpenses } from "../services/expense-service";

const useExpenses = () => {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		// api call to backend system
		setIsLoading(true);
		getExpenses()
			.then((response) => setExpenses(response.data))
			.catch((error) => setError(error))
			.finally(() => setIsLoading(false));
	}, []);

	return { expenses, error, isLoading };
};

export default useExpenses;

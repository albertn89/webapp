import { useEffect, useState } from "react";

import { Expense } from "../model/Expense";
import { getExpenseByExpenseId } from "../services/expense-service";

const useExpenseByExpenseId = (expenseId: string) => {
	const [expense, setExpense] = useState<Expense | undefined>();
	const [errors, setErrors] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);

		getExpenseByExpenseId(expenseId)
			.then((response) => setExpense(response.data))
			.catch((error) => {
				setErrors(error.message);
				console.log(errors);
			})
			.finally(() => setIsLoading(false));
	}, []);

	return { expense, errors, isLoading };
};

export default useExpenseByExpenseId;

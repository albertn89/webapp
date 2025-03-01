import { Link, useParams } from "react-router-dom";

import useExpenseByExpenseId from "../../hooks/useExpenseByExpenseId";
import CurrencyUtils from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";

const ExpenseDetails = () => {
	const { expenseId } = useParams<{ expenseId: string }>();
	if (!expenseId) return <p className="text-danger">Invalid Expense ID</p>;

	const { expense, errors, isLoading } = useExpenseByExpenseId(expenseId!);

	return (
		<div className="container mt-2">
			{isLoading && <p>Loading...</p>}
			{errors && <p className="text-danger">{errors}</p>}
			<div className="d-flex flex-row-reverse mb-2 ">
				<button className="btn btn-sm btn-warning">Delete</button>
				<button className="btn btn-sm btn-danger mx-2">Edit</button>
				<Link to="/" className="btn btn-sm btn-secondary">
					Back
				</Link>
			</div>
			<div className="card">
				<div className="card-body p-3">
					<table className="table table-borderless table-responsive">
						<tbody>
							<tr>
								<th>Name</th>
								<td>{expense ? expense?.name : "N/A"}</td>
							</tr>
							<tr>
								<th>Category</th>
								<td>{expense ? expense?.category : "N/A"}</td>
							</tr>
							<tr>
								<th>Amount</th>
								<td>{expense ? CurrencyUtils.formatToUSD(expense?.amount!) : "N/A"}</td>
							</tr>
							<tr>
								<th>Date</th>
								<td>{expense ? DateUtils.formatDateString(expense?.date!) : "N/A"}</td>
							</tr>
							<tr>
								<th>Note</th>
								<td>{expense ? expense?.note : "N/A"}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ExpenseDetails;

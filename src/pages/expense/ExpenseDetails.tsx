import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmDialog from "../../components/ConfirmDialog";
import useExpenseByExpenseId from "../../hooks/useExpenseByExpenseId";
import CurrencyUtils from "../../utils/CurrencyUtils";
import DateUtils from "../../utils/DateUtils";
import { deleteExpenseByExpenseId } from "../../services/expense-service";

const ExpenseDetails = () => {
	const { expenseId } = useParams<{ expenseId: string }>();
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const { expense, errors, isLoading, setIsLoading, setErrors } = useExpenseByExpenseId(expenseId!);
	const navigate = useNavigate();

	if (!expenseId) return <p className="text-danger">Invalid Expense ID</p>;

	const handleConfirm = () => {
		setIsLoading(true);

		deleteExpenseByExpenseId(expenseId)
			.then((response) => {
				if (response && response.status === 204) {
					navigate("/");
				}
			})
			.catch((error) => setErrors(error.message))
			.finally(() => {
				setIsLoading(false);
				setShowDialog(false);
			});
	};

	const handleCancel = () => {
		console.log("Cancel is clicked");
		setShowDialog(false);
	};

	return (
		<div className="container mt-2">
			{isLoading && <p>Loading...</p>}
			{errors && <p className="text-danger">{errors}</p>}
			<div className="d-flex flex-row-reverse mb-2 ">
				<button className="btn btn-sm btn-danger" onClick={() => setShowDialog(true)}>
					Delete
				</button>
				<button className="btn btn-sm btn-warning mx-2">Edit</button>
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
			<ConfirmDialog
				title="Confirm Delete"
				message="Are you sure you want to delete this item?"
				show={showDialog}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		</div>
	);
};

export default ExpenseDetails;

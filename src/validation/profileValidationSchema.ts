import * as yup from "yup";

const profileValidationSchema = yup.object().shape({
	name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters long"),
	email: yup.string().required("Email is required").email("Email is not valid"),
	password: yup
		.string()
		.required("Password is required")
		.min(5, "Password must be at least 5 characters long"),
	confirmPassword: yup
		.string()
		.required("Retype confirm password")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

export default profileValidationSchema;

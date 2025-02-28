import logo from "../assets/logo.png";

const Logo = () => {
	return (
		<a className="navbar-brand" href="#">
			<img src={logo} alt="Logo" width={48} height={48} className="rounded-circle" />
		</a>
	);
};

export default Logo;

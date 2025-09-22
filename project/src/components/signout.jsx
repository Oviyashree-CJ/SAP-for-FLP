import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/logout-confirmation"); // go to confirmation page
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 text-danger bg-transparent border-0 text-start"
    >
      Log Out
    </button>
  );
};

export default SignOut;

import classes from "./index.module.css";

interface ButtonProps {
  children: React.ReactNode;
  fill?: boolean;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${classes.myBtn} ${props.fill ? classes.fill : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;

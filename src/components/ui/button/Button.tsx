import classes from "./index.module.css";

interface ButtonProps {
  children: React.ReactNode;
  fill?: boolean;
}

const Button = ({ children, fill, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${classes.myBtn} ${fill ? classes.fill : undefined}`}
    >
      {children}
    </button>
  );
};

export default Button;

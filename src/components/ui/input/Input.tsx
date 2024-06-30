import classes from "./index.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
  onChange: () => void;
}

const Input = (props: InputProps) => {
  return (
    <div className={classes.InputWrap}>
      <label className={classes.LabelInput}>{props.label}</label>
      <input
        value={props.value}
        onChange={props.onChange}
        className={classes.Input}
        {...props}
      />
    </div>
  );
};

export default Input;

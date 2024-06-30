import { InputHTMLAttributes } from "react";
import classes from "./index.module.css";

interface ISearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = (props: ISearchInputProps) => {
  return <input type="search" className={classes.SearchInput} {...props} />;
};

export default SearchInput;

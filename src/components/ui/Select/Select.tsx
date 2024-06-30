import { useState } from "react";
import styles from "./index.module.css";

interface Option {
  [key: string]: string;
}

interface SelectProps {
  options: Option;
  placeholder: string;
  width: number | string;
  onChange: (value: string) => void;
  value?: string;
}

const Select = ({
  options,
  placeholder,
  width,
  onChange,
  value,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    value || null
  );

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(label);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      style={{ width: width }}
      className={`${styles.selectContainer} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.selectInput} onClick={toggleDropdown}>
        <span
          className={`${styles.selectValue} ${
            selectedOption ? "" : styles.placeholder
          }`}
        >
          {selectedOption ? selectedOption : placeholder}
        </span>
        <div
          className={`${styles.selectArrow}  ${isOpen ? styles.openImg : ""}`}
        ></div>
      </div>
      {isOpen && (
        <div className={styles.selectDropdown}>
          {Object.entries(options).map(([value, label]) => (
            <div
              key={value}
              className={styles.selectOption}
              onClick={() => handleOptionClick(value, label)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

import Input from "../input/Input";
import Button from "../button/Button";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../../store/slices/authSlice";

interface Login {
  onClose: () => void;
}

const Login = ({ onClose }: Login) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(loginUser({ username, password }));
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.wrapper}>
          <span className={styles.title}>Авторизация</span>

          {/* <CloseIcon onClick={onClose} /> */}

          <Input
            label="Логин"
            placeholder={"Введите логин"}
            value={username}
            onChange={handleNameChange}
          />
          <Input
            label="Пароль"
            placeholder={"Введите пароль"}
            value={password}
            onChange={handlePassword}
            type="password"
          />
        </div>

        <div className={styles.buttons}>
          <Button fill={true} onClick={handleLogin}>
            Войти
          </Button>
          <Button
            fill={false}
            onClick={() => {
              onClose();
            }}
          >
            Отменить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;

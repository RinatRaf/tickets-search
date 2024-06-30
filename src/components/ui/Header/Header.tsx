import { useState } from "react";
import classes from "./index.module.css";
import Button from "../button/Button";
import Modal from "../modal/modal";
import Login from "../Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/slices/authSlice";

export interface IAppProps {}

const Header = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const isAuth = useSelector((store) => store.auth.isAuth);

  const dispatch = useDispatch();

  return (
    <div className={classes.headerWrap}>
      <h2 className={classes.h2}>Фильмопоиск</h2>
      <div className={classes.loginWrap}>
        {isAuth ? <div className={classes.user}></div> : ""}
        <Button
          fill={!isAuth}
          onClick={
            isAuth
              ? () => {
                  dispatch(logoutUser());
                }
              : () => {
                  setIsVisible(true);
                }
          }
        >
          {isAuth ? "Выйти" : "Войти"}
        </Button>
      </div>
      {isVisible ? (
        <Modal>
          <Login onClose={setIsVisible} />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;

import { Button } from "@mui/material";
import "./Form.scss";
import { useContext } from "react";
import { FormContext } from "../../../providers/context/FormProvider/FormContext";

export const Form = () => {
  const { SetLogin, SetPassword, fetchLogin } = useContext(FormContext);

  return (
    <div className="authorization">
      <h1>Авторизация</h1>
      <form className="authorization__form">
        <label className="authorization__label" htmlFor="login">
          Введите логин:
        </label>
        <input
          onChange={SetLogin}
          required
          maxLength={20}
          className="authorization__login"
          id="login"
          type="text"
          placeholder="Логин"
        />
        <label className="authorization__label" htmlFor="password">
          Введите пароль:
        </label>
        <input
          onChange={SetPassword}
          minLength={6}
          required
          className="authorization__password"
          id="password"
          placeholder="Пароль"
          type="password"
        />
        <Button
          onClick={fetchLogin}
          className="authorization__btn"
          variant="contained"
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

import { useState } from "react";
import { FormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import api from "../../../api";

type Children = {
  children: any;
};

export const FormProvider = ({ children }: Children) => {
 
  const navigate = useNavigate();
  const [UserLogin, SetUserLogin] = useState("");
  const [UserPassword, SetUserPassword] = useState("");
  

  const loginInput = document.getElementById("login") as HTMLInputElement;
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  function SetLogin() {
    SetUserLogin(loginInput?.value);
  }

  function SetPassword() {
    SetUserPassword(passwordInput?.value);
  }

  async function fetchLogin() {
    try {
      const res = await api.postUser({
        username: UserLogin,
        password: UserPassword,
      });
      setCookie('userToken', res.token);
      
      if (Object.keys(res).length !== 0) {
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  

  return (
    <FormContext.Provider
      value={{
        SetLogin,
        SetPassword,
        fetchLogin,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

import { ReactNode, useState } from "react";
import { FormContext } from "./FormContext";
import { useNavigate } from "react-router-dom";
import { setCookie } from "typescript-cookie";
import api from "../../../api";

type Children = {
  children: ReactNode;
};

export const FormProvider = ({ children }: Children) => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");



  function setLogin(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUserLogin(event.target.value);
    
  }

  function setPassword(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setUserPassword(event.target.value);
    
  }

  async function fetchLogin() {
    try {
      if (userLogin && userPassword) {
        const res = await api.postUser({
          username: userLogin,
          password: userPassword,
        });
        setCookie("userToken", res.token);

        if (Object.keys(res).length !== 0) {
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }

  return (
    <FormContext.Provider
      value={{
        setLogin,
        setPassword,
        fetchLogin,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

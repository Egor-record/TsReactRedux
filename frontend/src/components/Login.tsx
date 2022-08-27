import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import LoginInput from "./LoginInput";
import {fetchCreateAccount, sendLogin} from "./loginSlice";

export default function Login() {

    const initialValues = {
        email: "",
        password: "",
        repeatedPassword: ""
    }

    const [values, setValues] = useState(initialValues);
    const [isLogin, setIsLogin] = useState(true);

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = async (e : React.FormEvent) => {
        e.preventDefault();

        if (values.email && values.password) {
            dispatch(sendLogin({
                name : values.email,
                password : values.password,
            }));
        }
    }

    const createAccount = async (e : React.FormEvent) => {
        e.preventDefault();
        if (values.email && values.password) {
            if (values.password === values.repeatedPassword) {
                dispatch(fetchCreateAccount({
                    name : values.email,
                    password : values.password,
                }));
            }
        }
    }


    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
       const { name, value } = e.target;
       setValues({
           ...values,
           [name] : value
       })
    }

    const loginForm = () => {
        return  (
            <>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal text-center">Войти в аккаунт</h1>
                    <LoginInput handleInputChange={handleInputChange}
                                name="email"
                                label="E-mail"
                                type="email"
                                placeholder="email@host.com"/>
                    <LoginInput handleInputChange={handleInputChange}
                                name="password"
                                label="Пароль"
                                type="password"
                                placeholder="Пароль"/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
                </form>
                <button className="mt-3 btn btn-outline-success btn-lg w-100" onClick={()=>setIsLogin(false)}> Создать аккаунт </button>
            </>

        )
    }

    const newUserForm = () => {
        return (
            <>
                <form onSubmit={createAccount}>
                    <h1 className="h3 mb-3 fw-normal text-center">Создание аккаунта</h1>
                    <LoginInput handleInputChange={handleInputChange}
                                name="email"
                                label="Почта"
                                type="email"
                                placeholder="email@host.com"/>
                    <LoginInput handleInputChange={handleInputChange}
                                name="password"
                                label="Пароль"
                                type="password"
                                placeholder="Пароль"/>
                    <LoginInput handleInputChange={handleInputChange}
                                name="repeatedPassword"
                                type="password"
                                label="Повторите пароль"
                                placeholder="Повторите пароль"/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Создать аккаунт</button>
                </form>
                <button className="mt-3 btn btn-outline-success btn-lg w-100" onClick={()=>setIsLogin(true)}> Уже есть аккаунт </button>
            </>
        )
    }

    if (isLogin) {
            return (
                <div className="sign-in">
                    <main className="form-signin w-100 m-auto">
                        { loginForm() }
                    </main>
                </div>
            )
    } else {
         return (
             <div className="sign-in">
                 <main className="form-signin w-100 m-auto">
                     { newUserForm() }
                 </main>
             </div>
         )
     }
}
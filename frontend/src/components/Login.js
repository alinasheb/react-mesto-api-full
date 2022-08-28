import React, { useState } from "react";
import Header from "./Header";

function Login({handleLogin}) {

    const [loginData, setLoginData] = useState({email: '', password: ''});

    function handleSubmit(evt) {
        evt.preventDefault();
        handleLogin(loginData);
    }

    function handleOnChange(evt) {
        const {name, value} = evt.target;
        setLoginData({...loginData, [name]: value});
    }


    return (
        <>
        <Header text='Регистрация' link="/sing-up" />
        <div className="authorization">
            <form className="authorization__form" onSubmit={handleSubmit}>
                <h2 className="authorization__title">Вход</h2>
                <input className="authorization__data" value={loginData.email} onChange={handleOnChange} name="email" placeholder="Email" type="email" required/>
                <input className="authorization__data" value={loginData.password} onChange={handleOnChange} name="password" placeholder="Пароль" type="password" required/>
                <button type="submit" className="authorization__button">Войти</button>
            </form>

        </div>
        
        </>
        
    )
}

export default Login;
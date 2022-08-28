import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from "./Header";

function Register({handleRegister}) {

    const [regData, setRegData] = useState({email: '', password: ''});

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegister(regData);
    }

    function handleOnChange(evt) {
        const {name, value} = evt.target;
        setRegData({...regData, [name]: value});
    }


    return (
        <>
        <Header text={'Войти'} link="/sing-in" />
        <div className="authorization">
            <form className="authorization__form" onSubmit={handleSubmit}>
                <h2 className="authorization__title">Регистрация</h2>
                <input className="authorization__data" value={regData.email}  onChange={handleOnChange} name="email" placeholder="Email" type="email" required></input>
                <input className="authorization__data" value={regData.password}  onChange={handleOnChange} name="password" placeholder="Пароль" type="password" required></input>
                <button type="submit" className="authorization__button">Зарегистрироваться</button>
                <div className="authorization__caption">
                    <p className="authorization__question">Уже зарегистрированы?</p>
                    <Link to="/sing-in" className="authorization__log"> Войти</Link>
                </div>
                
            </form>
        </div>
        </>  
    )
}

export default Register;
import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  Redirect,
  withRouter,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/Api.js";
import * as auth from "../utils/auth.js";

function App() {
  //данные пользователя
  const [currentUser, setCurrentUser] = useState({});

  //попапы
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  //стейт для карточек
  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  //авторизация пользователя
  const [loginIn, setLoginIn] = useState(false);

  //авторизация
  const [isAuth, setIsAuth] = useState(false);

  //статус авторизации успешно или ошибка
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);

  const [userLoginData, setUserLoginData] = useState("");

  const history = useHistory();


  useEffect(() => {
    if (loginIn) {
      Promise.all([api.getUserInfo(), api.getInitialCard()])
        .then(([user, items]) => {
          setCurrentUser(user);
          setCards(items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginIn]);

  useEffect(() => {
    tokenCheck();
  }, []);


  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getData(jwt)
        .then((res) => {
          if (res) {
            setUserLoginData(res.email);
            setLoginIn(true);
          }
        })
        .catch((err) => console.log(err));
        };
    };
  

  

  useEffect(() => {
    if (loginIn) {
      history.push("/");
    }
  }, [history, loginIn]);

  //обработчики
  //редактирование профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //редактирование аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //добавление карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsTooltipOpened(false);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  function openReg() {
    setIsTooltipOpened(true);
  }

  //лайк карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id); 

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  } 

  //редактирование данных пользователя
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //изменение аватара пользователя
  function handleUpdateAvatar(data) {
    api
      .setAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //регистрация и авторизация пользователя

  const handleRegister = (data) => {
    const { email, password } = data;
    auth.register(email, password)
      .then((res) => {
        if (res) {
          setIsAuth(true);
          openReg();
          history.push("/sing-in");
        }
      })
      .catch((err) => {
        setIsAuth(false);
        console.log(`Произошла ошибка: ${err}`);
        openReg();
        history.push("/sing-up");
      });
  };

  const handleLogin = (data) => {
    const { email, password } = data;
    setUserLoginData(email);
    auth.login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoginIn(true);
          setIsAuth(true);
          history.push("/");
        }
      })
      .catch((err) => {
        setIsAuth(false);
        openReg();
        console.log(`Произошла ошибка: ${err}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoginIn(false);
    setIsAuth(false);
    history.push("/sing-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loginIn={loginIn}
            component={Main}
            isEditProfilePopupOpen={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            isEditAvatarPopupOpen={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            logout={handleLogout}
            userLoginData={userLoginData}
          />

          <Route path="/sing-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/sing-up">
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path="*">
            {loginIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isTooltipOpened}
          onClose={closeAllPopups}
          isRegSuccess={isAuth}
          regSuccess={"Вы успешно зарегистрировались!"}
          regFailed={"Что-то пошло не так! Попробуйте еще раз."}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default withRouter(App);

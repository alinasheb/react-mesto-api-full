
class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;

  }

  getInitialCard() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this.getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this.getResponseData(res);
  });
}

getInitialData() {
  return Promise.all([this.getUserInfo(), this.getInitialCard()]);
}



setUserInfo(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then((res) => {
    return this.getResponseData(res);
  });
}

setAvatar(data) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      avatar: data,
    }),
  }).then((res) => {
    return this.getResponseData(res);
  });
}

  postNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this.getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this.getResponseData(res);
    });
  }


  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this.getResponseData(res);
    });
  }


  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    }
  }

  getResponseData(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка:${res.status}`);
    }
  }
}

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: 'cc692a39-3e91-4f31-81a0-56c5cbc20e10',
    "Content-type": "application/json"
  }
});





export default api;

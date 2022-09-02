class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;

  }

  _getAuthHeader() {
    const jwt = localStorage.getItem('jwt');
    return jwt ? { Authorization: `Bearer ${jwt}` } : {};
  }


  getInitialCard() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.getResponseData(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.getResponseData(res);
  });
}


setUserInfo(data) {
  return fetch(`${this._url}users/me`, {
    method: 'PATCH',
    headers: { ...this._headers, ...this._getAuthHeader() },
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  }).then((res) => {
    return this.getResponseData(res);
  });
}

setAvatar(data) {
  return fetch(`${this._url}users/me/avatar`, {
    method: 'PATCH',
    headers: { ...this._headers, ...this._getAuthHeader() },
    body: JSON.stringify({
      avatar: data,
    }),
  }).then((res) => {
    return this.getResponseData(res);
  });
}

  postNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: { ...this._headers, ...this._getAuthHeader() },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this.getResponseData(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.getResponseData(res);
    });
  }


  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: { ...this._headers, ...this._getAuthHeader() },
    }).then((res) => {
      return this.getResponseData(res);
    });
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
  //url: 'https://api.travel.story.nomoredomains.sbs/',
  url: "http://localhost:3000/",
  headers: {
    "Content-type": "application/json",
  }
});


export default api;

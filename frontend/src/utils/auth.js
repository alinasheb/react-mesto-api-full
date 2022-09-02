//const baseUrl = 'https://api.travel.story.nomoredomains.sbs';

export const baseUrl = 'http://localhost:3000';

const getResponseData = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка:${res.status}`);
    }
  };

  
  export const register = (email, password) => {
    return fetch (`${baseUrl}/signup`, {
        method: 'POST' ,
        headers: {
           "Content-Type": "application/json",
        } ,
        body:  JSON.stringify({email, password})
    })
        .then((res) => getResponseData(res));
  };

  export const login = (email, password) => {
    return fetch (`${baseUrl}/signin`, {
        method: 'POST' ,
        headers: {
            "Content-Type": "application/json",
        } ,
        body:  JSON.stringify({ email, password })
        
    })
        .then((res) => getResponseData(res));
  };


export const getData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => getResponseData(res));
};


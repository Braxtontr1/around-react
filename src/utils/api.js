class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._isOk(res));
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "GET",
    }).then((res) => this._isOk(res));
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._isOk(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._isOk(res));
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._isOk(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._isOk(res));
  }

  changeLikeCardStatus(cardId, likeStatus) {
    if (!likeStatus) {
      return this.deleteLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

  _isOk(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._isOk(res));
  }

  editProfilePicture(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._isOk(res));
  }
}

const config = {
  baseUrl: `https://around.nomoreparties.co/v1/group-12`,
  headers: {
    authorization: "9b1558af-91ea-493b-ada9-7496ba6fa8e8",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);
export default api;

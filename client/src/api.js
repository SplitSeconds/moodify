import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  if (err.response && err.response.data) {
    console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export default {
  service: service,

  isLoggedIn() {
    return localStorage.getItem("user") != null;
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        res.data;
      })
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  getProfile() {
    return service
      .get("/profile")
      .then(res => {
        // If we have localStorage.getItem('user') saved, the application will consider we are loggedin
        localStorage.setItem("user", JSON.stringify(res.data));
        res.data;
      })
      .catch(errHandler);
  },
  getSpoftiyUserData() {
    return service
      .get("/spotify/me")
      .then(res => res.data)
      .catch(errHandler);
  },
  getPlaylists() {
    return service
      .get("/spotify/playlists")
      .then(res => res.data)
      .catch(errHandler);
  },
  addPlaylistWithFixedName() {
    return service
      .post("/spotify/playlists")
      .then(res => res.data)
      .catch(errHandler);
  },

  getSongs() {
    return service
      .get("/")
      .then(res => res.data)
      .catch(errHandler);
  },

  addSongsToPlaylist() {
    return service
      .get("/spotify/songs")
      .then(res => res.data)
      .catch(errHandler);
  },

  getTopSongsPlaylist() {
    return service
      .get("/spotify/playlists/toptracks")
      .then(res => res.data)
      .catch(errHandler);
  },

  addTracks() {
    return service
      .post("/spotify/playlists/tracks")
      .then(res => res.data)
      .catch(errHandler);
  },

  getCountries() {
    return service
      .get("/countries")
      .then(res => res.data)
      .catch(errHandler);
  },

  postCountries(data) {
    return service
      .post("/countries", data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSecret() {
    return service
      .get("/secret")
      .then(res => res.data)
      .catch(errHandler);
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/endpoint/to/add/a/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  postUserInput(data, result) {
    return service
      .post("/spotify/playlists", data, {
        result: [result]
      })
      .then(res => res.data)
      .catch(errHandler);
  },
  editProfile(body) {
    return service
      .put("/users/profile", body)
      .then(res => res.data)
      .catch(errHandler);
  }
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  posts: [],
  mode: "blanc",
  render: "https://hanimedia8.onrender.com",
  render2: "http://localhost:3001",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Store in localStorage
      localStorage.setItem("token", action.payload.token);
      console.log(state.user);
    },
    setRender: (state, action) => {
      state.render = action.payload.render;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setMode: (state, action) => {
      state.mode = action.payload.mode;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
        localStorage.setItem("friends", JSON.stringify(action.payload.friends));
      } else {
        console.error("Friends non-existants ...");
      }
    },
    setNotFriends: (state, action) => {
      if (state.user) {
        state.user.notfriends = action.payload.notfriends;
        localStorage.setItem(
          "notfriends",
          JSON.stringify(action.payload.notfriends)
        );
      } else {
        console.error("Friends existants ...");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setMode,
  setNotFriends,
} = authSlice.actions;

export default authSlice.reducer;

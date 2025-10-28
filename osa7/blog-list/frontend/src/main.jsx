import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import App from "./App";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

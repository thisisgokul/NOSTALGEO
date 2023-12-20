import React from "react";
import AppRouter from "./components/AppRouter";
import axios from "axios";
axios.defaults.baseURL='http://localhost:5000';
axios.defaults.withCredentials=true;
function App() {
  return (
    <div>
     <AppRouter/>
    </div>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Add from "../pages/Add"
import Edit from "../pages/Edit";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

const Router = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/detail/:id" exact element={<Detail />} />
            <Route path="/auth/post" exact element={<Add />} />
            <Route path="/edit/:id" exact element={<Edit />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
           {/*  <Route path="*" element={<div>없는 페이지</div>} /> */}
        </Routes>)
}

export default Router;

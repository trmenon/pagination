import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, UserPage } from "../pages";

export const Router = ()=> {
    return(
        <React.Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<MainPage/>}/>
                    <Route path={"/:id"} element={<UserPage/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    )
}
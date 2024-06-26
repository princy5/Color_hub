import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Popular, Generate, Random, Collection } from '.';

const Window = () => {
    return (
        <div className="window"> 
            <Routes>
                <Route
                    path="/"
                    element={<Popular />}
                />
                <Route
                    path="/generate"
                    element={<Generate />}
                />
                <Route
                    path="/random"
                    element={<Random />}
                />
                <Route
                    path="/collection"
                    element={<Collection />}
                />
            </Routes>
        </div>  
    )
};

export default Window;
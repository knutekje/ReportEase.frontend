import React from 'react';
import {StartPage} from "./components/StartPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodWasteForm from "./features/food-waste/FoodWasteForm.tsx";
import {Welcome} from "./pages/Welcome.tsx";
import {FoodWasteList} from "./features/food-waste/FoodWasteList.tsx";

const App: React.FC = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<StartPage />}>
                    <Route index element={<Welcome />} />
                    <Route path="/foodwaste" element={<FoodWasteForm />} />
                    <Route path="/foodwastelist" element={<FoodWasteList />} />


                </Route>
            </Routes>
        </Router>

    );
};

export default App;

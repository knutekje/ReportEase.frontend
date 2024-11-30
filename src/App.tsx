import React from 'react';
import {StartPage} from "./components/StartPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FoodWasteForm from "./features/food-waste/FoodWasteForm.tsx";
import {Welcome} from "./pages/Welcome.tsx";
import {FoodWasteList} from "./features/food-waste/FoodWasteList.tsx";
import DiscrepancyForm from "./features/discrepancy/DiscrepancyForm.tsx";
import DiscrepancyList from "./features/discrepancy/DiscrepancyList.tsx";
import TempratureForm from "./features/temperature/TempratureForm.tsx";
import TempratureReadingList from "./features/temperature/TempratureReadingList.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
const App: React.FC = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<StartPage />}>
                    <Route index element={<Welcome />} />
                    <Route path="/foodwaste" element={<FoodWasteForm />} />
                    <Route path="/foodwastelist" element={<FoodWasteList />} />
                    <Route path="/discrepancy" element={<DiscrepancyForm/>} />
                    <Route path="/discrepancylist" element={<DiscrepancyList/>} />
                    <Route path="/tempform" element={<TempratureForm/>} />
                    <Route path="/templist" element={<TempratureReadingList/>} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Route>
            </Routes>
        </Router>

    );
};

export default App;

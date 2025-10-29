import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Start from "./pages/Start";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index element={<Start />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

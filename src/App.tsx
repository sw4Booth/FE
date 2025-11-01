import { BrowserRouter, Route, Routes } from "react-router";
import { PhotoBoothProvider } from "./contexts/PhotoBoothProvider";
import MainLayout from "./layouts/MainLayout";
import Start from "./pages/Start";
import FrameType from "./pages/FrameType";
import PhotoShoot from "./pages/PhotoShoot";
import Print from "./pages/Print";
import PrintProgress from "./pages/PrintProgress";
import Share from "./pages/Share";

import PhotoSelect from "./pages/PhotoSelect";

function App() {
    return (
        <PhotoBoothProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<Start />} />
                        <Route path="/frame-type" element={<FrameType />} />
                        <Route path="/photo-shoot" element={<PhotoShoot />} />
                        <Route path="/photo-select" element={<PhotoSelect />} />
                        <Route path="/print" element={<Print />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </PhotoBoothProvider>
    );
}

export default App;

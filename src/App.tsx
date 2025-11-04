import { BrowserRouter, Route, Routes } from "react-router";
import { PhotoBoothProvider } from "./contexts/PhotoBoothProvider";
import MainLayout from "./layouts/MainLayout";
import Start from "./pages/Start";
import FrameTypeSelect from "./pages/FrameTypeSelect";
import PhotoShoot from "./pages/PhotoShoot";
import PhotoSelect from "./pages/PhotoSelect";
import Print from "./pages/Print";
import PrintProgress from "./pages/PrintProgress";
import Share from "./pages/Share";
import { FRAME_TYPE_SELECT, PHOTO_SELECT, PHOTO_SHOOT, PRINT, PRINT_PROGRESS, SHARE } from "./constants/routes";

function App() {
    return (
        <PhotoBoothProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<Start />} />
                        <Route path={FRAME_TYPE_SELECT} element={<FrameTypeSelect />} />
                        <Route path={PHOTO_SHOOT} element={<PhotoShoot />} />
                        <Route path={PHOTO_SELECT} element={<PhotoSelect />} />
                        <Route path={PRINT} element={<Print />} />
                        <Route path={PRINT_PROGRESS} element={<PrintProgress />} />
                        <Route path={`${SHARE}/:id`} element={<Share />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </PhotoBoothProvider>
    );
}

export default App;

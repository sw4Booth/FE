import { BrowserRouter, Route, Routes } from "react-router";
import { PhotoBoothProvider } from "./contexts/PhotoBoothProvider";
import MainLayout from "./layouts/MainLayout";
import Start from "./pages/Start";
import FrameTypeSelect from "./pages/FrameTypeSelect";
import PhotoShoot from "./pages/PhotoShoot";
import PhotoSelect from "./pages/PhotoSelect";
import Print from "./pages/Print";
import FrameSkinSelect from "./pages/FrameSkinSelect";
import PrintProgress from "./pages/PrintProgress";
import Share from "./pages/Share";
import {
    START,
    FRAME_TYPE_SELECT,
    PHOTO_SELECT,
    PHOTO_SHOOT,
    FRAME_SKIN_SELECT,
    PRINT,
    PRINT_PROGRESS,
    SHARE,
    GUEST_BOOK,
    ADMIN,
    ADMIN_LOGIN
} from "./constants/routes";
import GuestBook from "./pages/GuestBook";
import Admin from "./pages/Admin";
import { SITE_BRANDING } from "./constants/constants";
import AdminLogin from "./pages/AdminLogin";

function App() {
    return (
        <>
            <title>{SITE_BRANDING}</title>
            <PhotoBoothProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path={START} element={<Start />} />
                            <Route
                                path={FRAME_TYPE_SELECT}
                                element={<FrameTypeSelect />}
                            />
                            <Route path={PHOTO_SHOOT} element={<PhotoShoot />} />
                            <Route path={PHOTO_SELECT} element={<PhotoSelect />} />
                            <Route
                                path={FRAME_SKIN_SELECT}
                                element={<FrameSkinSelect />}
                            />
                            <Route path={PRINT} element={<Print />} />
                            <Route
                                path={PRINT_PROGRESS}
                                element={<PrintProgress />}
                            />
                            <Route path={`${SHARE}/:id`} element={<Share />} />
                        </Route>
                        <Route path={GUEST_BOOK} element={<GuestBook />} />
                        <Route path={ADMIN} element={<Admin />} />
                        <Route path={ADMIN_LOGIN} element={<AdminLogin />} />
                    </Routes>
                </BrowserRouter>
            </PhotoBoothProvider>
        </>
    );
}

export default App;

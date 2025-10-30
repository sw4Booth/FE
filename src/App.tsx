import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Start from "./pages/Start";
import FrameType from "./pages/FrameType";
import { PhotoBoothProvider } from "./contexts/PhotoBoothProvider";
import PhotoShoot from "./pages/PhotoShoot";

function App() {
  return (
    <PhotoBoothProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Start />} />
            <Route path="/frame-type" element={<FrameType />} />
            <Route path="/photo-shoot" element={<PhotoShoot />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PhotoBoothProvider>
  );
}

export default App;

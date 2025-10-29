import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <main className="h-screen p-12 overflow-hidden flex flex-col items-center">
            <Outlet />
        </main>
    );
};

export default MainLayout;

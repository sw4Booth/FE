import { useContext } from "react";
import { PhotoBoothContext } from "../contexts/PhotoBoothContext";

export const usePhotoBooth = () => {
    const context = useContext(PhotoBoothContext);

    if (!context) throw new Error("usePhotoBooth must be used within PhotoBoothProvider");

    return context;
};

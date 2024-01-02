import { useContext } from "react";
import ModalsContext from "../contexts/ModalsContext";

const useModals = () => {
	const context = useContext(ModalsContext);
	if (!context) {
		throw new Error("useModals must be used within an ModalsProvider");
	}

	return context;
}

export default useModals;
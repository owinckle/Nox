import React, { ReactNode, createContext, useState } from "react";
import Modal from "../components/Modal";

type ModalContentType = {
	title: string;
	body: ReactNode;
	submitLabel?: string;
	closeLabel?: string;
	onSubmit: () => void;
};

type ModalContextType = {
	open: (content: ModalContentType) => void;
};

const ModalsContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
	children: ReactNode;
}

export const ModalsProvider: React.FC<ModalProviderProps> = ({ children }) => {
	const [modals, setModals] = useState<ModalContentType[]>([]);

	const open = (content: ModalContentType) => {
		setModals((prevModals) => [...prevModals, content]);
	};

	const close = (modalIndex: number) => {
		setModals((prevModals) =>
			prevModals.filter((_, index) => index !== modalIndex)
		);
	};

	return (
		<ModalsContext.Provider value={{ open }}>
			{children}
			{modals.map((modal, index) => (
				<Modal
					key={index}
					title={modal.title}
					onSubmit={modal.onSubmit}
					onClose={() => close(index)}
					submitLabel={modal.submitLabel}
					closeLabel={modal.closeLabel}
				>
					{modal.body}
				</Modal>
			))}
		</ModalsContext.Provider>
	);
};

export default ModalsContext;

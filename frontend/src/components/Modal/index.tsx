import "./styles.scss";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";

interface ModalProps {
	title: string;
	onSubmit: () => void;
	onClose: () => void;
	submitLabel?: string;
	closeLabel?: string;
	children: React.ReactNode;
}

const Modal = ({
	title,
	onSubmit,
	onClose,
	submitLabel = "Submit",
	closeLabel = "Close",
	children,
}: ModalProps) => {
	const [closing, setClosing] = useState(false);

	const submitHandler = () => {
		onSubmit();
		closeHandler();
	};

	const closeHandler = () => {
		setClosing(true);

		setTimeout(() => {
			onClose();
		}, 200);
	};

	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				closeHandler();
			}
		});

		return () => {
			document.removeEventListener("keydown", () => {});
		};
	}, []);

	return (
		<>
			<div
				className={`modal-overlay ${closing && "closing"}`}
				onClick={closeHandler}
			></div>
			<div className={`modal ${closing && "closing"}`}>
				<div className="modal__head">
					<div className="modal__title">{title}</div>
					<AiOutlineClose
						className="modal__close"
						onClick={closeHandler}
					/>
				</div>
				<div className="modal__body">{children}</div>
				<div className="modal__footer">
					<Button onClick={submitHandler}>{submitLabel}</Button>
					<Button onClick={closeHandler}>{closeLabel}</Button>
				</div>
			</div>
		</>
	);
};

export default Modal;

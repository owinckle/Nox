import { IoIosSettings, IoMdAdd } from "react-icons/io";
import { Card } from "../components/Card";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { FormGroup } from "../components/Form";
import useRequest from "../hooks/useRequest";
import { toast } from "react-toastify";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface Props {
	space: any;
	getSpace: () => void;
}

const SpaceRoadmap = ({ space, getSpace }: Props) => {
	const getBoards = () => {
		useRequest("POST", "/roadmap/boards/get/", {
			space_name: space.name,
		})
			.then((res) => {
				setBoards(res);
			})
			.catch(() => {
				toast.error("Something went wrong. Please try again.");
			});
	};

	useEffect(() => {
		if (space) getBoards();
	}, [space]);

	const [boards, setBoards] = useState<any[]>([]);

	const [createBoardModal, setCreateBoardModal] = useState<boolean>(false);
	const [createBoardName, setCreateBoardName] = useState<string>("");
	const createBoard = () => {
		useRequest("POST", "/roadmap/board/create/", {
			space_name: space.name,
			name: createBoardName,
		})
			.then((res) => {
				getBoards();
				toast.success(res.message);
			})
			.catch(() => {
				toast.error("Something went wrong. Please try again.");
			});
	};

	const [editBoardModal, setEditBoardModal] = useState<boolean | string>(
		false
	);
	const [editBoardName, setEditBoardName] = useState<string>("");
	const updateBoard = () => {
		useRequest("POST", "/roadmap/board/update/", {
			id: editBoardModal,
			name: editBoardName,
		})
			.then((res) => {
				getBoards();
				toast.success(res.message);
			})
			.catch(() => {
				toast.error("Something went wrong. Please try again.");
			});
	};

	const updateBoardPosition = (id: string, position: number) => {
		useRequest("POST", "/roadmap/board/update/position/", {
			id,
			position,
		})
			.then((res) => {
				getBoards();
				toast.success(res.message);
			})
			.catch(() => {
				toast.error("Something went wrong. Please try again.");
			});
	};

	const [deleteBoardModal, setDeleteBoardModal] = useState<boolean | string>(
		false
	);
	const deleteBoard = () => {
		useRequest("POST", "/roadmap/board/delete/", {
			id: deleteBoardModal,
		})
			.then((res) => {
				getBoards();
				setEditBoardModal(false);
				toast.success(res.message);
			})
			.catch(() => {
				toast.error("Something went wrong. Please try again.");
			});
	};

	const [viewItemModal, setViewItemModal] = useState<any>(false);

	return (
		<div className="space">
			<div className="space__roadmap">
				{boards.map((board, key) => (
					<Card
						key={key}
						title={board.title}
						action={() => {
							setEditBoardModal(board.id);
							setEditBoardName(board.title);
						}}
						actionIcon={<IoIosSettings size={15} />}
					>
						{board.items.map((item: any, key: number) => (
							<Item
								key={key}
								title={item.title}
								description={item.description}
								onClick={() => setViewItemModal(item)}
							/>
						))}
					</Card>
				))}
			</div>

			{createBoardModal && (
				<Modal
					title="Create new board"
					onSubmit={createBoard}
					onClose={() => {
						setCreateBoardModal(false);
						setCreateBoardName("");
					}}
				>
					<form>
						<FormGroup
							label="Name"
							type="text"
							placeholder="New board"
							value={createBoardName}
							onChange={(e) => setCreateBoardName(e.target.value)}
							autoFocus
						/>
					</form>
				</Modal>
			)}

			{editBoardModal && (
				<Modal
					title="Edit board"
					onSubmit={updateBoard}
					onClose={() => {
						setEditBoardModal(false);
						setEditBoardName("");
					}}
					submitLabel="Save"
					closeLabel="Cancel"
				>
					<form>
						<FormGroup
							label="Name"
							type="text"
							placeholder="New board"
							value={editBoardName}
							onChange={(e) => setEditBoardName(e.target.value)}
							autoFocus
						/>
					</form>

					{/* Position */}
					<div className="space__roadmap__board-order-list">
						<label>Position</label>

						{boards.map((board, key) =>
							board.id === editBoardModal ? (
								<div
									key={key}
									className="space__roadmap__board--order-list__item current"
								>
									{board.position < boards.length - 1 ? (
										<IoChevronDown
											onClick={() =>
												updateBoardPosition(
													board.id,
													board.position + 1
												)
											}
										/>
									) : null}

									{board.position > 0 && boards.length > 1 ? (
										<IoChevronUp
											onClick={() =>
												updateBoardPosition(
													board.id,
													board.position - 1
												)
											}
										/>
									) : null}
									{board.title}
								</div>
							) : (
								<div
									key={key}
									className="space__roadmap__board--order-list__item"
								>
									{board.title}
								</div>
							)
						)}
					</div>

					<div
						className="danger hover"
						onClick={() => setDeleteBoardModal(editBoardModal)}
					>
						Delete board
					</div>
				</Modal>
			)}

			{deleteBoardModal && (
				<Modal
					title="Delete board"
					onSubmit={deleteBoard}
					onClose={() => setDeleteBoardModal(false)}
					submitLabel="Delete"
					closeLabel="Cancel"
					dangerModal
				>
					Are you sure you want to delete this board?
				</Modal>
			)}

			{viewItemModal && (
				<Modal
					title={viewItemModal.title}
					onClose={() => setViewItemModal(false)}
					onSubmit={() => alert("submit")}
					submitLabel="Save"
					closeLabel="Cancel"
				>
					<p>{viewItemModal.description}</p>
				</Modal>
			)}

			<div
				className="create-btn"
				onClick={() => setCreateBoardModal(true)}
			>
				<IoMdAdd />
				Create new board
			</div>
		</div>
	);
};

export default SpaceRoadmap;

interface ItemProps {
	title: string;
	description: string;
	onClick?: () => void;
}

const Item = ({ title, description, onClick }: ItemProps) => {
	return (
		<div className="roadmap__item" onClick={onClick}>
			<div className="roadmap__item__title">{title}</div>
			<div className="roadmap__item__description">{description}</div>
		</div>
	);
};

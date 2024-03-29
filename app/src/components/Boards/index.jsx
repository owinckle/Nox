import "./styles.scss";
import { MdOutlineModeComment } from "react-icons/md";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import Button from "../../components/Button";

export const BoardList = ({ posts }) => {
	return (
		<>
			<div className="board-filter">
				<input
					type="text"
					className="board-filter__search"
					placeholder="Search..."
				/>
			</div>

			<div className="board-list">
				{posts.length === 0 && (
					<div className="board-list__empty">
						No one has posted yet. Be the first!
						<Button>New Post</Button>
					</div>
				)}

				{posts.map((post, key) => (
					<div key={key} className="board-list__post">
						<div className="board-list__post__votes">
							<IoChevronUpOutline className="board-list__post__votes__button" />
							<div className="board-list__post__votes__count">
								5
							</div>
							<IoChevronDownOutline className="board-list__post__votes__button" />
						</div>
						<div className="board-list__post__author">
							{post.author.avatar ? (
								<img src={post.author.avatar} />
							) : (
								post.author.name.charAt(0).toUpperCase()
							)}
						</div>
						<div className="board-list__post__content">
							<div className="board-list__post__content__title">
								{post.title}
							</div>
							<p className="board-list__post__content__description">
								{post.content}
							</p>
							<div className="board-list__post__content__footer">
								<div className="board-list__post__content__footer__date">
									{post.posted_since}
								</div>
								<div className="board-list__post__content__footer__comments">
									<MdOutlineModeComment /> 5
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
};

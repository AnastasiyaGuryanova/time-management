import { useState, useEffect } from 'react';
import { Icon } from '@components';
import { PAGINATION_LIMIT } from '@constants';
import styled from 'styled-components';

const PaginationContainer = ({ totalItems, onPageChange, className }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = Math.ceil(totalItems / PAGINATION_LIMIT);

	useEffect(() => {
		onPageChange(currentPage);
	}, [currentPage, onPageChange]);

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className={className}>
			<Icon
				id="fa-angle-left"
				margin="0 15px 0 0 "
				size="30px"
				onClick={handlePreviousPage}
				disabled={currentPage === 1}
			/>

			<span>
				Страница {currentPage} из {totalPages}
			</span>

			<Icon
				id="fa-angle-right"
				margin="0 0 0 15px"
				size="30px"
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
			/>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
	font-weight: bold;
	font-size: 22px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

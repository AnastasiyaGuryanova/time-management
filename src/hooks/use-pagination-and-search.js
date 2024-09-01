import { useState, useMemo, useEffect } from 'react';
import { debounce } from '@helpers';
import { PAGINATION_LIMIT } from '@constants';

export const usePaginationAndSearch = (items, searchKey) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const handleSearchChange = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(true);
	};

	const filteredItems = useMemo(() => {
		if (!shouldSearch) {
			return items;
		}

		return items.filter((item) =>
			item[searchKey].toLowerCase().includes(searchPhrase.toLowerCase()),
		);
	}, [items, shouldSearch, searchPhrase, searchKey]);

	const totalItems = filteredItems.length || 0;

	const startIndex = (currentPage - 1) * PAGINATION_LIMIT;
	const endIndex = startIndex + PAGINATION_LIMIT;
	const itemsToShow = filteredItems.slice(startIndex, endIndex);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		if (currentPage > Math.ceil(totalItems / PAGINATION_LIMIT)) {
			setCurrentPage(1);
		}
	}, [totalItems]);

	return {
		searchPhrase,
		handleSearchChange,
		shouldSearch,
		setShouldSearch,
		currentPage,
		setCurrentPage,
		totalItems,
		itemsToShow,
		handlePageChange,
	};
};

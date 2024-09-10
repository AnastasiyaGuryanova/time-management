import PropTypes from 'prop-types';
import { Icon, Input } from '@components';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск названию ...."
				padding="10px 36px 10px 10px"
				onChange={onChange}
			/>
			<Icon id="fa-search" inactive="true" size="24px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 100%;
	margin: 0 auto 20px;

	& > div {
		position: absolute;
		right: 9px;
		top: 3px;
	}
`;

SearchContainer.propTypes = {
	className: PropTypes.string,
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};

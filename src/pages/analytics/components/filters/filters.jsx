import { useState } from 'react';
import { Input, Button, Select } from '@components';
import styled from 'styled-components';

const FiltersContainer = ({ projects, onApplyFilters, className }) => {
	const [dateFrom, setDateFrom] = useState('');
	const [dateTo, setDateTo] = useState('');
	const [selectedProject, setSelectedProject] = useState('');

	const handleApplyFilters = () => {
		onApplyFilters({
			dateFrom,
			dateTo,
			selectedProject,
		});
	};

	return (
		<div className={className}>
			<label>
				<p>Дата от:</p>
				<Input
					type="date"
					value={dateFrom}
					width="200px"
					onChange={({ target }) => setDateFrom(target.value)}
				/>
			</label>
			<label>
				<p>Дата до:</p>
				<Input
					type="date"
					value={dateTo}
					width="200px"
					onChange={({ target }) => setDateTo(target.value)}
				/>
			</label>
			<label>
				<p>Проект:</p>

				<Select
					value={selectedProject}
					onChange={({ target }) => setSelectedProject(target.value)}
				>
					<option value="all">Все проекты</option>
					{projects.map((project) => (
						<option key={project.id} value={project.id}>
							{project.title}
						</option>
					))}
				</Select>
			</label>

			<Button margin="0 0 0 30px" onClick={handleApplyFilters}>
				Применить фильтры
			</Button>
		</div>
	);
};

export const Filters = styled(FiltersContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 20px;
	background-color: ${(props) => props.theme.colors.analiticsComponentBackground};
	border: 1px solid ${(props) => props.theme.colors.borderColor};
	border-radius: 7px;

	& label {
		display: flex;
		align-items: center;

		> p {
			margin: 0 10px 0 20px;
		}
	}
`;

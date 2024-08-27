import { PageComponent, H2 } from '@components';

export const Error = ({ error }) =>
	error && (
		<PageComponent>
			<H2>Ошибка</H2>
			<div>{error}</div>
		</PageComponent>
	);

import { Bar } from 'react-chartjs-2';
import { durationToHoursAndMinutes } from '@helpers';
import PropTypes from 'prop-types';

export const TimeSpentBarChart = ({ data }) => {
	const chartData = {
		labels: data.map((item) => item.projectTitle),
		datasets: [
			{
				label: 'Время, затраченное на проект (часы)',
				data: data.map((item) => item.duration),
				backgroundColor: 'rgba(75, 192, 192, 0.75)',
			},
		],
	};

	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: function (context) {
						const durationInSeconds = context.raw;
						return durationToHoursAndMinutes(durationInSeconds);
					},
				},
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

TimeSpentBarChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			projectTitle: PropTypes.string.isRequired,
			duration: PropTypes.number.isRequired,
		}),
	).isRequired,
};

import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { durationToHoursAndMinutes, generateRandomColors } from '@helpers';

export const TimeDistributionPieChart = ({ data }) => {
	const chartData = {
		labels: data.map((item) => item.projectTitle),
		datasets: [
			{
				data: data.map((item) => item.duration),
				backgroundColor: generateRandomColors(data.length),
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

	return <Pie data={chartData} options={options} />;
};

TimeDistributionPieChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			projectTitle: PropTypes.string.isRequired,
			duration: PropTypes.number.isRequired,
		}),
	).isRequired,
};

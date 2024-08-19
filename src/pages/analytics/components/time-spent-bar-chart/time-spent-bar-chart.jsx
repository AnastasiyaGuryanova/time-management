import { Bar } from 'react-chartjs-2';

export const TimeSpentBarChart = ({ data }) => {
	const chartData = {
		labels: data.map((item) => item.projectTitle),
		datasets: [
			{
				label: 'Время, затраченное на проект (часы)',
				data: data.map((item) => item.duration / 3600),
				backgroundColor: 'rgba(75, 192, 192, 0.75)',
			},
		],
	};

	return <Bar data={chartData} />;
};

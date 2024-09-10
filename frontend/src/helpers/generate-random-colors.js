import { getRandomColor } from "./get-random-color";

export const generateRandomColors = (numColors) => {
	const colors = [];
	for (let i = 0; i < numColors; i++) {
		colors.push(getRandomColor());
	}
	return colors;
};

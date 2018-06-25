const format = require('../../formatters/formatter-flat.json');
const tokens = require('../tokens.json');

const expected = `
{
	"color-background-fill": "grey",
	"color-background-tile": "white",
	"color-text-strong": "white",
	"color-text-dim": "rgba(255, 255, 255, 0.5)",
	"spacing-large": "30px",
	"spacing-medium": "20px",
	"spacing-small": "10px",
	"radius-large": "15px",
	"radius-medium": "10px",
	"radius-small": "5px"
}`.trim();

describe('flat.json', () => {
	const input = tokens;
	const { content, extension } = format(input);

	test('has the right extension', () => {
		expect(extension).toEqual('.json');
	});

	test('has the right content', () => {
		expect(content).toEqual(expected);
	});
});

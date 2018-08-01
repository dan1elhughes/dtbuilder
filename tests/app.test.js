const fs = require('fs-extra');
const { app } = require('../src/app');

const yaml = `
---
font: "'Open Sans', Arial, sans-serif"
spacing:
  large: 30px
  medium: 20px
  small: 10px
`.trim();

describe('app', () => {
	const defaultSettings = {
		input: '.test-data/tokens.yaml',
		output: ['.test-data/output/tokens.css'],
		cwd: '.',
	};

	beforeEach(() => fs.outputFile('./.test-data/tokens.yaml', yaml));
	afterEach(() => fs.remove('./.test-data'));

	test('throws with no settings', async () => {
		await expect(app()).rejects.toThrow('Input file not specified.');
	});

	test('throws with missing input', async () => {
		const { input, ...settings } = defaultSettings;
		await expect(app(settings)).rejects.toThrow('Input file not specified.');
	});

	test('throws with missing output', async () => {
		const { output, ...settings } = defaultSettings;
		await expect(app(settings)).rejects.toThrow('Output files not specified.');
	});

	test('throws with missing cwd', async () => {
		const { cwd, ...settings } = defaultSettings;
		await expect(app(settings)).rejects.toThrow(
			'Unable to locate current working directory.'
		);
	});

	test('throws with invalid format', async () => {
		const settings = {
			...defaultSettings,
			output: ['.test-data/output/tokens.fail'],
		};

		await expect(app(settings)).rejects.toThrow(
			'".test-data/output/tokens.fail" not a supported file extension.'
		);
	});

	test('writes single file successfully', async () => {
		await app(defaultSettings);

		const exists = await fs.exists(defaultSettings.output[0]);

		expect(exists).toBe(true);
	});

	test('writes multiple files successfully', async () => {});
});

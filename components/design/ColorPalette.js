// components/design/ColorPalette.js
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const ColorPalette = () => {
	const colors = fullConfig.theme.colors;

	// Filter out utility colors and only show your brand colors
	const brandColors = [
		{ name: 'Primary', var: 'primary' },
		{ name: 'Secondary', var: 'secondary' },
		{ name: 'Tertiary', var: 'tertiary' },
		{ name: 'Accent', var: 'accent' },
		{ name: 'Dark', var: 'dark' },
		{ name: 'Light', var: 'light' },
	];

	return (
		<div className='max-w-5xl mx-auto px-8 py-16 border rounded bg-[#ffffff] shadow-card'>
			<h2 className='mb-8'>Color Palette</h2> 
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{brandColors.map((color) => (
					<div
						key={color.var}
						className='border border-dark/40 rounded overflow-hidden'
					>
						<div
							className='h-32 w-full'
							style={{ backgroundColor: colors[color.var] }}
						/>
						<div className='p-4 space-y-1'>
							<p className='font-semibold text-lg'>{color.name}</p>
							<p className='text-sm text-gray-600 uppercase'>{colors[color.var]}</p>
							<p className='text-xs font-mono text-gray-500'>
								bg-{color.var}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ColorPalette;
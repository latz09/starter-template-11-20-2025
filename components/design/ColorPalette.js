// components/design/ColorPalette.js
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const ColorPalette = () => {
	const colors = fullConfig.theme.colors;

	const brandColors = [
		{ name: 'Primary', var: 'primary' },
		{ name: 'Secondary', var: 'secondary' },
		{ name: 'Tertiary', var: 'tertiary' },
		{ name: 'Accent', var: 'accent' },
		{ name: 'Dark', var: 'dark' },
		{ name: 'Light', var: 'light' },
	];

	return (
		<div className='max-w-5xl mx-auto px-2 py-4 border rounded bg-[#ffffff] shadow-card'>
			<h2 className='mb-2'>Color Palette</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5'>
				{brandColors.map((color) => (
					<div
						key={color.var}
						className='group border border-dark/40 rounded overflow-hidden'
					>
						<div
							className='h-[8rem] w-full group-hover:h-full transition-all duration-300'
							style={{ backgroundColor: colors[color.var] }}
						/>
						<div className='p-1 space-y-0.25 group-hover:hidden'>
							<p className='font-semibold text-[1.125rem]'>{color.name}</p>
							<p className='text-[0.875rem] text-dark/60 uppercase'>{colors[color.var]}</p>
							<p className='text-[0.75rem] font-mono text-dark/50'>
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
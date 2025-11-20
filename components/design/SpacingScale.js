// components/design/SpacingScale.js
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

const SpacingScale = () => {
	const spacing = fullConfig.theme.spacing;

	// Convert spacing object to array and sort
	const allSpacing = Object.entries(spacing).map(([key, value]) => ({
		key,
		value,
	}));

	return (
		<div className='max-w-5xl mx-auto px-8 py-16'>
			<h2 className='mb-8'>Spacing Scale</h2>
			<div className='space-y-4'>
				{allSpacing.map((space) => (
					<div
						key={space.key}
						className='border border-gray-200 rounded p-4'
					>
						<div className='flex items-center justify-between mb-2'>
							<div>
								<p className='font-semibold'>Space {space.key}</p>
								<p className='text-sm text-gray-600'>{space.value}</p>
								<p className='text-xs font-mono text-gray-500'>
									p-{space.key} or m-{space.key}
								</p>
							</div>
						</div>
						<div className='bg-gray-100 h-6 relative'>
							<div
								className='bg-primary h-full'
								style={{ width: space.value }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SpacingScale;
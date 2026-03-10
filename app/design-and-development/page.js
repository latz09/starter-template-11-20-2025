import ButtonPreviews from '@/components/design/ButtonPreviews';
import ColorPalette from '@/components/design/ColorPalette';
import SpacingScale from '@/components/design/SpacingScale';
import { Typography } from '@/components/design/Typography';

const DesignAndDevelopment = () => {
	return (
		<div className='min-h-screen bg-cream'>
			{/* Hero */}
			<div className='bg-dark text-cream px-2 py-8 text-center'>
				<p className='text-overline text-gold mb-3'>Design System</p>
				<h1 className='mb-3.75 text-pookiePink'>
					Brand & <span className='h1-cursive text-gold'> Design</span> Tokens
				</h1>
				<p className='text-paragraph text-cream/90 max-w-xl mx-auto'>
					The visual foundation of your website — colors, typography, spacing,
					and components all in one place.
				</p>
			</div>

			<div className='max-w-[95rem] mx-auto px-2 py-8 space-y-12'>
				{/* Colors */}
				<section>
					<SectionLabel
						number='01'
						title='Color Palette'
						description='Your brand colors used consistently across every page.'
					/>
					<ColorPalette />
				</section>

				{/* Typography */}
				<section>
					<SectionLabel
						number='02'
						title='Typography'
						description='Every text style — headings, body, buttons, and more.'
					/>
					<Typography />
				</section>

				{/* Buttons */}
				<section>
					<SectionLabel
						number='03'
						title='Buttons'
						description='Call-to-action styles on both light and dark backgrounds.'
					/>
					<ButtonPreviews />
				</section>

				{/* Spacing */}
				<section>
					<SectionLabel
						number='04'
						title='Spacing Scale'
						description='Consistent spacing keeps layouts clean and professional.'
					/>
					<SpacingScale />
				</section>
			</div>
		</div>
	);
};

const SectionLabel = ({ number, title, description }) => (
	<div className='flex items-end gap-3 mb-3 border-b border-dark/10 pb-2'>
		<span className='font-mono text-[0.75rem] text-gold font-bold'>
			{number}
		</span>
		<div>
			<h3 className='leading-none'>{title}</h3>
			<p className='text-paragraph-sm text-dark/50 mt-0.5'>{description}</p>
		</div>
	</div>
);

export default DesignAndDevelopment;

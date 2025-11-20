'use client';

import { useState } from 'react';

const DesignPage = () => {
	const [isFullscreen, setIsFullscreen] = useState(true);

	const figmaEmbedUrl =
		'https://embed.figma.com/proto/7zl3OJyhqxdZtFuJYvFykq/CWED?page-id=2%3A65&node-id=22-63&viewport=1425%2C436%2C0.22&scaling=min-zoom&content-scaling=fixed&embed-host=share';

	const openFullscreen = () => {
		setIsFullscreen(true);
	};

	const closeFullscreen = () => {
		setIsFullscreen(false);
	};
//   <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/proto/7zl3OJyhqxdZtFuJYvFykq/CWED?page-id=2%3A65&node-id=22-63&viewport=1425%2C436%2C0.22&scaling=min-zoom&content-scaling=fixed&embed-host=share" allowfullscreen></iframe>

	return (
		<>
			<div className='min-h-screen flex flex-col items-center justify-center p-4 md:p-8'>
				<div className='w-full max-w-7xl text-center'>
					<h1 className='text-4xl font-bold mb-2'>Design Preview</h1>
					<p className='text-lg opacity-70 mb-8'>
						Review the design options
					</p>

					<button
						onClick={openFullscreen}
						className='inline-flex items-center justify-center rounded font-semibold transition-all duration-300 bg-primary text-light hover:opacity-90 px-8 py-2 text-xl'
					>
						View Design in Fullscreen
					</button>

					<p className='mt-6 text-sm opacity-60'>
						Click to open the interactive design prototype
					</p>
				</div>
			</div>

			{/* Fullscreen Modal */}
			{isFullscreen && (
				<div className='fixed inset-0 z-[9999] bg-black'>
					<button
						onClick={closeFullscreen}
						className='absolute bottom-4 right-4 z-[10000] bg-white text-black px-4 py-2 rounded font-semibold hover:bg-gray-200 transition-colors'
					>
						Close
					</button>
					<iframe
						src={figmaEmbedUrl}
						className='w-full h-full'
						allowFullScreen
						style={{ border: 'none' }}
					/>
				</div>
			)}
		</>
	);
};

export default DesignPage;
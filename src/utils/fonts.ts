import { useEffect, useState } from 'react';

// Re-export the utility function for direct use
const loadedFonts = new Set<string>()

export function useGoogleFont(fontFamily: string) {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const fontId = fontFamily.replace(/\s+/g, '+');

	if (!loadedFonts.has(fontId) && typeof document !== 'undefined') {
		// Create and append link element
			const link = document.createElement('link');
			link.href = `https://fonts.googleapis.com/css2?family=${fontId}:wght@400;500;600;700&display=swap`;
			link.rel = 'stylesheet';
			document.head.appendChild(link);

			// Set loaded to true after a short delay to ensure font is loaded
			const timer = setTimeout(() => {
				setLoaded(true);
				loadedFonts.add(fontId);
			}, 100);

			return () => {
				clearTimeout(timer);
				document.head.removeChild(link);
			};
		}
	}, [fontFamily]);

	// Return the CSS font-family value
	return loaded ? fontFamily : 'system-ui, -apple-system, sans-serif';
}

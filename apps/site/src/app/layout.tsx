import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { PoweredByStormy } from '../components/powered-by-stormy';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Memories as Art Photography | Greensburg PA',
	description: 'Portrait, wedding, and commercial photography in Greensburg, Westmoreland County, and Pittsburgh.',
};

/**
 * Applies a remembered Theme Toggle choice before the first paint. Without it
 * the page renders light and then snaps to dark once React hydrates, which is
 * the flash every theme switcher is judged by. Keep the key in step with
 * THEME_STORAGE_KEY in packages/components/src/lib/theme-toggle.tsx.
 */
const restoreTheme = `try{var t=localStorage.getItem('site-theme');if(t==='dark'||t==='light')document.documentElement.classList.add('theme--'+t)}catch(e){}`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// suppressHydrationWarning is required, not incidental: the script below
		// deliberately changes this element's class before React hydrates, so the
		// server and client markup cannot match. It suppresses only this element's
		// own attributes, never anything inside.
		<html lang="en" className="site-root__html" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: restoreTheme }} />
			</head>
			<body className={`site-root__body ${geistSans.variable} ${geistMono.variable}`}>
				<div>{children}</div>
				<PoweredByStormy />
			</body>
		</html>
	);
}

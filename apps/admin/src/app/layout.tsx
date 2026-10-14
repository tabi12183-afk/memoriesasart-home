import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '~/components/tooltip';
import { ThemeProvider } from '~/lib/theme-provider';
import { Toaster } from '~/components/sonner';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: 'Site Editor — Stormy CMS',
		template: '%s — Stormy CMS',
	},
	description: 'Edit your site with Stormy CMS — the editor that lives in your repo.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={montserrat.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					value={{ light: 'theme--light', dark: 'theme--dark' }}
				>
					<TooltipProvider>{children}</TooltipProvider>
					<Toaster richColors />
				</ThemeProvider>
			</body>
		</html>
	);
}

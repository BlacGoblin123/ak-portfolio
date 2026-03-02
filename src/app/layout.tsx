import type { Metadata } from 'next';
import './globals.css';
import SmoothScroller from '@/components/SmoothScroller';

export const metadata: Metadata = {
  title: 'Atichat Khanma — Marketing & Business Development',
  description: 'Marketing graduate driving growth through brand development, data-driven SEO, and AI solutions. Auckland, NZ.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroller>{children}</SmoothScroller>
      </body>
    </html>
  );
}

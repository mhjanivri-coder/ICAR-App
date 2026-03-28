import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NPBI Data Recording App',
  description: 'NPBI herd data recording app starter for Murrah and Nili-Ravi herds.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

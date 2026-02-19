import type { Metadata } from 'next';
// globals.css is already imported by default usually, but we make sure
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'KIN portraits — Premium Photography',
  description: 'High-end photography portfolio specializing in duo shoots.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body suppressHydrationWarning={true}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

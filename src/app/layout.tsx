import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';

export const metadata: Metadata = {
  title: 'kin portraits — editorial familieportretten',
  description: 'Editorial familieportretten die verwantschap, verbinding en aanwezigheid vastleggen.',
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
        <CustomCursor />
      </body>
    </html>
  );
}
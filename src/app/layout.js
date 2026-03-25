import { Inter, Crimson_Pro } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import SmoothScroll from '@/components/common/SmoothScroll';
import LoadingBar from '@/components/common/LoadingBar';
import { Suspense } from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata = {
  title: 'BIOSPECTRA | International Journal of Life Sciences',
  description: 'An International Biannual Refereed Journal of Life Sciences',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${crimsonPro.variable}`}>
      <body className="antialiased">
        <Suspense fallback={null}>
          <LoadingBar />
        </Suspense>
        <SmoothScroll>
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: "GeneGuard AI - Genetic Disease Risk Prediction System",
  description: "GeneGuard AI parses raw DNA dataset sequences and leverages machine learning models to assess genetic disease risks and offer clinical recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

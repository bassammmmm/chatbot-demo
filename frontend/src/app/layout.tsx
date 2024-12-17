"use client";

import { Provider } from 'react-redux';
import { store } from '@/store';

import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Main/Navbar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <div className="h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow container flex flex-row min-h-0">
            <Provider store={store}>{children}</Provider>
          </div>
        </div>
      </body>
    </html>
  );
}
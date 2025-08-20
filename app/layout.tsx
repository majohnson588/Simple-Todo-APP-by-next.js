import "./globals.css";
import { Inter } from "next/font/google";


import { ThemeProvider } from "./components/theme-provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Simple TodoApp",
  description: "simple todo app for learning Next.js 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

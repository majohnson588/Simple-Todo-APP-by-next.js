import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Simple TodoApp",
  description: "simple todo app for learning next js 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en" className="dark">
  <body className={inter.className}>{children}</body>
</html>

  );
}

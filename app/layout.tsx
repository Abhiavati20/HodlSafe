import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";



export const metadata: Metadata = {
  title: "HodlSafe",
  description: "Securely hold your assets!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

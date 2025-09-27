import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/index";
import { Slide, ToastContainer } from "react-toastify";
import { FilterContextsProvider } from "@/contexts/filterContexts";
import { PageContextsProvider } from "@/contexts/pageContexts";
import { AuthContextsProvider } from "@/contexts/authContexts";

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
});

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Este projeto consiste em um frontend de marketplace, desenvolvido para consumo de uma API de back-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={saira.className}>
        <AuthContextsProvider>
          <FilterContextsProvider>
            <PageContextsProvider>
              <Header title="marketplace" />
              {children}
              <ToastContainer
                position="top-center"
                autoClose={8000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide}
              />
            </PageContextsProvider>
          </FilterContextsProvider>
        </AuthContextsProvider>
      </body>
    </html>
  );
}

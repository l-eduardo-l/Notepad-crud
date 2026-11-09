import Link from "next/link";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRUD de anotações",
  description: "O melhor app de anotações que nem o Elon Musk consegue fazer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">
        <header className="bg-pink-600 p-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 text-2xl font-bold">
            <img className="w-16" src="/notepad.png" alt="" />
            anotações.txt
          </Link>
          <div>
            <Link
              href="/criar-anotacao"
              className="bg-green-800 p-4 text-xl font-bold uppercase rounded-xl hover:bg-yellow-800"
            >
              Criar anotação
            </Link>
          </div>
        </header>
        {children}
        <ToastContainer position="bottom-center" theme="dark" />
      </body>
    </html>
  );
}

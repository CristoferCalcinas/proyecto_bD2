import Privider from "@/store/privider";
import "./globals.css";
import { Inter } from "next/font/google";
import SideBar from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <Privider>
        <body className={`${inter.className} h-full`}>
          <SideBar>{children}</SideBar>
        </body>
      </Privider>
    </html>
  );
}

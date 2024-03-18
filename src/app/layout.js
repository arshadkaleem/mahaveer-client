import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";
import { Providers } from "../redux-store/provider";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin", "devanagari", "latin-ext"],
  display: "swap",
});

export const metadata = {
  title: "Mahaveer",
  description: "Mahaveer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

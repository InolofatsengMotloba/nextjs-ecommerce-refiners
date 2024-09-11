import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Her Store",
  description:
    "Explore a place where limitless options come together with your everyday must-haves. Find everything you need to enhance your daily life.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

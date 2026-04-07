import localFont from "next/font/local";
import "./globals.css";

const barlowRegular = localFont({
  src: "../../public/fonts/Barlow-Regular.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--barlow-regular",
});

const barlowBold = localFont({
  src: "../../public/fonts/Barlow-Bold.woff2",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--barlow-bold",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowRegular.variable} ${barlowBold.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

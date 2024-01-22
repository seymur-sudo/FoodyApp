import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="dark" lang="en">
      <Head />
      <body className="bg-white dark:bg-black" >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

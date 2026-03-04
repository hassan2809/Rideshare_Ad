import { ReactNode } from "react";
import { Metadata, Viewport } from "next";
import RootProviders from "./(root)/RootProviders";

export const metadata: Metadata = {
  title: "Osher TV",
  description: "Osher TV - Ride. Play. Discover.",
  // viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  // "width=device-width, initial-scale=1, interactive-widget=resizes-content",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // interactiveWidget: "resizes-visual",
  interactiveWidget: "resizes-content",
  // interactiveWidget: "overlays-content",
};

// TODO: next white space on modal when enter in tablet
// TODO: Location is not working on Opera
// TODO: Think a better way to location fetching
// TODO: then work on Ad status, must be approved by Admin

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // TODO: NEXT - replace next img with img
  // TODO: NEXT - Fix lazy loading of pages

  return (
    <html lang='en'>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}

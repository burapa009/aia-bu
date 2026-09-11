import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-thai";
import { agent, description, getSiteUrl, isIndexable, socialImage, title } from "@/lib/site";
import "./globals.css";

export function generateMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const indexable = isIndexable();
  return {
    title: { default: title, template: `%s | ${agent.name}` },
    description,
    authors: [{ name: agent.name, url: siteUrl }],
    creator: agent.name,
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    alternates: siteUrl ? { canonical: "/" } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "th_TH",
      url: siteUrl,
      siteName: `${agent.name} — ${agent.role}`,
      images: siteUrl ? [{ url: socialImage, width: 1254, height: 1254, alt: `${agent.name} ${agent.role}` }] : undefined,
    },
    twitter: siteUrl ? { card: "summary", title, description, images: [socialImage] } : undefined,
    robots: { index: indexable, follow: indexable },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body className="overflow-x-hidden antialiased">{children}</body></html>;
}

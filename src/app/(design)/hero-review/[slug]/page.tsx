import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DesignChromePortal } from "@/components/deinequelle/DesignChromePortal";
import { DesignNav } from "@/components/deinequelle/DesignNav";
import { HeroReviewBanner } from "@/components/deinequelle/HeroReviewBanner";
import {
  getHeroReviewVariant,
  heroReviewVariants,
} from "@/data/heroReviewVariants";
import {
  loadDesignHomeBody,
  splitDesignChrome,
} from "@/lib/deinequelle/loadDesignHomeBody";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return heroReviewVariants.map((variant) => ({ slug: variant.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const variant = getHeroReviewVariant(slug);

  if (!variant) {
    return { title: "Hero-Vorschau · DeineQuelle" };
  }

  return {
    title: `${variant.label} · Hero-Vorschau · DeineQuelle`,
    description: variant.description,
    robots: { index: false, follow: false },
  };
}

export default async function HeroReviewVariantPage({ params }: PageProps) {
  const { slug } = await params;
  const variant = getHeroReviewVariant(slug);

  if (!variant) {
    notFound();
  }

  const { content } = splitDesignChrome(
    loadDesignHomeBody({
      heroImageSrc: variant.image,
      absoluteAssetPaths: true,
    }),
  );

  return (
    <>
      <HeroReviewBanner variant={variant} />
      <DesignChromePortal>
        <DesignNav />
      </DesignChromePortal>
      <main
        className="deinequelle-design-page hero-review-clone"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
}

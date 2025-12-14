import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image }) => {
    const { t, i18n } = useTranslation();

    // Translations
    const siteTitle = title || t('seo.title');
    const siteDescription = description || t('seo.description');
    const siteKeywords = keywords || t('seo.keywords');
    const currentLang = i18n.language || 'es';

    // Default image if not provided (use the one from existing index.html or proper branded one)
    const defaultImage = "https://cdnb.artstation.com/p/assets/images/images/068/156/463/large/alejandro-bonilla-wukong3-color-correct.jpg?1697115257";
    const siteImage = image || defaultImage;
    const siteUrl = "https://bonialeart.vercel.app/";

    return (
        <Helmet>
            {/* Language */}
            <html lang={currentLang} />

            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />
            <meta name="author" content="Alejandro Bonilla" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Structured Data (JSON-LD) - Helps Google understand you are a Person/Artist */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Alejandro Bonilla",
                    "alternateName": "Bonialeart",
                    "url": siteUrl,
                    "image": siteImage,
                    "sameAs": [
                        "https://www.instagram.com/bonialeart/?hl=en",
                        "https://www.artstation.com/boniale",
                        "https://www.behance.net/brunoluden",
                        "https://www.pinterest.com/"
                    ],
                    "jobTitle": "Digital Artist & Photographer",
                    "description": siteDescription
                })}
            </script>
        </Helmet>
    );
};

export default SEO;

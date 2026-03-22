import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: false },
};

const contentDE = `
# Impressum

## Angaben gemäß § 5 TMG

XD Ventures UG (haftungsbeschränkt)
[Adresse folgt]
Deutschland

## Kontakt

E-Mail: info@shifuhealth.com
Website: www.shifuhealth.com

## Vertreter

Geschäftsführer: [Name folgt]

## Handelsregister

Registergericht: [folgt]
Registernummer: [folgt]

## Umsatzsteuer-ID

Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [folgt]

## Redaktionell Verantwortlicher

XD Ventures UG
info@shifuhealth.com

## Haftung für Inhalte

Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Die auf ShifuHealth veröffentlichten Inhalte dienen ausschließlich der allgemeinen Information und ersetzen keine professionelle medizinische Beratung, Diagnose oder Behandlung. Bei gesundheitlichen Beschwerden wenden Sie sich bitte an einen qualifizierten Arzt oder TCM-Praktiker.

## Haftung für Links

Unser Angebot enthält Links zu externen Websites Dritter. Auf deren Inhalte haben wir keinen Einfluss und können daher keine Gewähr übernehmen.

## Urheberrecht

Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.

© 2025 ShifuHealth - XD Ventures UG. Alle Rechte vorbehalten.
`;

const contentEN = `
# Imprint

## Information according to § 5 TMG

XD Ventures UG (limited liability)
[Address to follow]
Germany

## Contact

Email: info@shifuhealth.com
Website: www.shifuhealth.com

## Representative

Managing Director: [Name to follow]

## Commercial Register

Registry Court: [to follow]
Registration Number: [to follow]

## VAT ID

VAT identification number according to § 27a UStG: [to follow]

## Editorially Responsible

XD Ventures UG
info@shifuhealth.com

## Liability for Content

The content of this website has been created with the utmost care. The content published on ShifuHealth is for general informational purposes only and does not replace professional medical advice, diagnosis or treatment. For health concerns, please consult a qualified physician or TCM practitioner.

## Liability for Links

Our website contains links to external third-party websites. We have no influence on the content of these websites and therefore cannot assume any liability.

## Copyright

The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation beyond the limits of copyright law require the written consent of the respective author or creator.

© 2025 ShifuHealth - XD Ventures UG. All rights reserved.
`;

function renderMarkdown(md: string) {
  const lines = md.trim().split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="font-body font-bold text-2xl md:text-3xl mb-6">{line.slice(2)}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-body font-bold text-xl mt-10 mb-3" style={{ color: "var(--color-text)" }}>{line.slice(3)}</h2>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-body font-bold text-lg mt-6 mb-2" style={{ color: "var(--color-text)" }}>{line.slice(4)}</h3>);
    } else if (line.trim() === "") {
      continue;
    } else if (line.startsWith("© ")) {
      elements.push(<p key={i} className="font-body text-sm mt-10 pt-6" style={{ color: "var(--color-text-muted)", borderTop: "1px solid var(--color-border)" }}>{line}</p>);
    } else {
      elements.push(<p key={i} className="font-body text-base mb-4" style={{ color: "var(--color-text-secondary)", lineHeight: 1.75 }}>{line}</p>);
    }
  }

  return elements;
}

export default async function ImpressumPage() {
  const locale = await getLocale();
  const content = locale === "de" ? contentDE : contentEN;

  return (
    <div className="mx-auto px-6 pt-28 pb-24" style={{ maxWidth: 720 }}>
      {renderMarkdown(content)}
    </div>
  );
}

import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: false },
};

const contentDE = `
# Datenschutzerklärung

## 1. Datenschutz auf einen Blick

### Allgemeine Hinweise

Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.

### Datenerfassung auf dieser Website

Wer ist verantwortlich für die Datenerfassung? Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber: XD Ventures UG, info@shifuhealth.com

Wie erfassen wir Ihre Daten? Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen - etwa durch das Newsletter-Formular oder den Shifu Qi Chat. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst (technische Daten wie Browser, Betriebssystem, Uhrzeit des Seitenaufrufs).

Wofür nutzen wir Ihre Daten? Bereitstellung der Website und ihrer Inhalte, Verbesserung unseres Angebots, Newsletter-Versand (nur bei Einwilligung), Betrieb des Shifu Qi Chat-Assistenten.

## 2. Hosting

Diese Website wird bei Vercel Inc., 340 Pine Street, Suite 701, San Francisco, California 94104, USA gehostet. Vercel ist unser Auftragsverarbeiter gemäß Art. 28 DSGVO.

## 3. Allgemeine Hinweise und Pflichtinformationen

### Datenschutz

Der Betreiber dieser Website nimmt den Schutz Ihrer persönlichen Daten ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.

### Verantwortliche Stelle

XD Ventures UG (haftungsbeschränkt), E-Mail: info@shifuhealth.com

### Speicherdauer

Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.

### Ihre Rechte

Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO), Berichtigung unrichtiger Daten (Art. 16 DSGVO), Löschung Ihrer Daten (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Zur Ausübung Ihrer Rechte wenden Sie sich an: info@shifuhealth.com

### Beschwerderecht

Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.

## 4. Cookies

Diese Website verwendet technisch notwendige Cookies für den Betrieb der Website. Analyse- oder Marketing-Cookies werden nur mit Ihrer Einwilligung gesetzt.

## 5. Newsletter

Wenn Sie den Newsletter abonnieren, verwenden wir Ihre E-Mail-Adresse ausschließlich zum Versand des Newsletters. Sie können den Newsletter jederzeit abbestellen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.

## 6. Shifu Qi Chat-Assistent

Der Shifu Qi Chat-Assistent verwendet die Anthropic Claude API. Ihre Eingaben werden zur Beantwortung Ihrer Fragen an die Anthropic API übermittelt. Es werden keine Chat-Verläufe dauerhaft gespeichert. Bitte geben Sie keine sensiblen persönlichen Gesundheitsdaten ein.

## 7. Änderungen

Wir behalten uns vor, diese Datenschutzerklärung anzupassen. Stand: März 2026.
`;

const contentEN = `
# Privacy Policy

## 1. Privacy at a Glance

### General Information

The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.

### Data Collection on This Website

Who is responsible for data collection? Data processing on this website is carried out by the website operator: XD Ventures UG, info@shifuhealth.com

How do we collect your data? Some data is collected when you provide it to us - for example, through the newsletter form or the Shifu Qi Chat. Other data is collected automatically by our IT systems when you visit the website (technical data such as browser, operating system, time of page access).

What do we use your data for? Providing the website and its content, improving our services, sending newsletters (only with consent), operating the Shifu Qi Chat assistant.

## 2. Hosting

This website is hosted by Vercel Inc., 340 Pine Street, Suite 701, San Francisco, California 94104, USA. Vercel is our data processor in accordance with Art. 28 GDPR.

## 3. General Information and Mandatory Disclosures

### Data Protection

The operator of this website takes the protection of your personal data seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.

### Responsible Party

XD Ventures UG (limited liability), Email: info@shifuhealth.com

### Storage Duration

Unless a more specific storage period has been mentioned within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies.

### Your Rights

You have the right at any time to access your stored data (Art. 15 GDPR), rectification of inaccurate data (Art. 16 GDPR), deletion of your data (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR) and objection to processing (Art. 21 GDPR). To exercise your rights, contact: info@shifuhealth.com

### Right to Complain

You have the right to file a complaint with a data protection supervisory authority.

## 4. Cookies

This website uses technically necessary cookies for the operation of the website. Analytics or marketing cookies are only set with your consent.

## 5. Newsletter

When you subscribe to the newsletter, we use your email address exclusively for sending the newsletter. You can unsubscribe at any time. Legal basis: Art. 6 para. 1 lit. a GDPR.

## 6. Shifu Qi Chat Assistant

The Shifu Qi Chat assistant uses the Anthropic Claude API. Your inputs are transmitted to the Anthropic API to answer your questions. No chat histories are permanently stored. Please do not enter sensitive personal health data.

## 7. Changes

We reserve the right to amend this privacy policy. Last updated: March 2026.
`;

function renderMarkdown(md: string) {
  const lines = md.trim().split("\n");
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("# ")) {
      elements.push(<h1 key={i} className="font-body font-bold text-2xl md:text-3xl mb-6">{line.slice(2)}</h1>);
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={i} className="font-body font-bold text-lg mt-6 mb-2" style={{ color: "var(--color-text)" }}>{line.slice(4)}</h3>);
    } else if (line.startsWith("## ")) {
      elements.push(<h2 key={i} className="font-body font-bold text-xl mt-10 mb-3" style={{ color: "var(--color-text)" }}>{line.slice(3)}</h2>);
    } else if (line.trim() === "") {
      continue;
    } else {
      elements.push(<p key={i} className="font-body text-base mb-4" style={{ color: "var(--color-text-secondary)", lineHeight: 1.75 }}>{line}</p>);
    }
  }

  return elements;
}

export default async function DatenschutzPage() {
  const locale = await getLocale();
  const content = locale === "de" ? contentDE : contentEN;

  return (
    <div className="mx-auto px-6 pt-28 pb-24" style={{ maxWidth: 720 }}>
      {renderMarkdown(content)}
    </div>
  );
}

export type ShifuResponse = {
  text: string;
  followUps: string[];
  articleTitle?: string;
  articleSlug?: string;
};

type ResponseMap = Record<string, ShifuResponse>;

const responsesDE: ResponseMap = {
  bauchschmerzen: {
    text: "Nach den Prinzipien der TCM gibt es verschiedene Muster, die Bauchschmerzen erklären. Sind die Schmerzen eher krampfartig und bessern sich bei Wärme? Das deutet auf **Kälte im Magen (胃寒)** hin -wärmende Lebensmittel wie Ingwer, Zimt und warme Suppen sind dann ideal. Sind es eher Spannungsschmerzen, oft bei Stress? Das ist typisch für eine **Qi-Stagnation der Leber**. Magst du mir mehr beschreiben?",
    followUps: [
      "Schmerzen bei Wärme besser",
      "Eher Stress-bedingt",
      "Was soll ich essen?",
    ],
    articleTitle: "TCM-Ernährung für die Verdauung",
    articleSlug: "tcm-ernaehrung-verdauung",
  },
  schlafprobleme: {
    text: "Schlafprobleme zeigen in der TCM einen gestörten **Herz-Shen (心神)** -den Geist des Herzens. Kannst du nicht einschlafen, oder wachst du nachts auf? Bei Einschlafproblemen liegt oft ein **Herz-Blut-Mangel** vor -rote Datteln, Longan-Früchte und Ruhe vor dem Schlafen helfen. Beim Aufwachen zwischen 1–3 Uhr morgens zeigt die TCM ein **Leber-Feuer-Muster**.",
    followUps: [
      "Kann nicht einschlafen",
      "Wache nachts auf",
      "Welche Kräuter helfen?",
    ],
    articleTitle: "Schlaf und das Herz in der TCM",
    articleSlug: "schlaf-herz-tcm",
  },
  müdigkeit: {
    text: "Chronische Müdigkeit ist in der TCM meist ein Zeichen von **Qi-Mangel** -am häufigsten der Milz oder der Nieren. Milz-Qi-Mangel zeigt sich durch Müdigkeit nach dem Essen, Schwere in den Gliedern und weichem Stuhl. Nieren-Yang-Mangel hingegen durch tiefe Erschöpfung und Kältegefühl. Das klassische TCM-Kraut gegen Qi-Mangel ist **Astragalus (Huang Qi 黄芪)**.",
    followUps: [
      "Müde nach dem Essen",
      "Ich friere auch oft",
      "Welche Lebensmittel helfen?",
    ],
    articleTitle: "Qi-Mangel erkennen und stärken",
    articleSlug: "qi-mangel-erkennen",
  },
  erkältung: {
    text: "In der TCM unterscheiden wir **Wind-Kälte** (Frösteln, klarer Schleim, kein Schwitzen) von **Wind-Hitze** (Halsschmerzen, gelber Schleim, leichtes Fieber). Bei Wind-Kälte: Ingwertee mit braunem Zucker, warm halten, Schwitzen fördern. Bei Wind-Hitze: Pfefferminztee, Chrysanthemenblüten-Tee, kühl bleiben. Welche Symptome dominieren bei dir?",
    followUps: [
      "Eher Frösteln und Kälte",
      "Eher Halsschmerzen",
      "Welcher Tee hilft?",
    ],
    articleTitle: "Erkältungen nach TCM behandeln",
    articleSlug: "erkaeltungen-tcm",
  },
  stress: {
    text: "Stress betrifft in der TCM primär die **Leber (肝)**. Die Leber ist für den freien Qi-Fluss zuständig -chronischer Stress staut diesen Fluss, was zu Verspannungen, Reizbarkeit, Kopfschmerzen und Verdauungsproblemen führt. TCM-Empfehlung: Bewegung (Qi Gong, Yoga), saure Lebensmittel in Maßen (stärken die Leber), Rosenblütentee, und vor allem: regelmäßige Schlafzeiten.",
    followUps: [
      "Ich habe oft Kopfschmerzen",
      "Verspannungen im Nacken",
      "Qi Gong für Anfänger?",
    ],
    articleTitle: "Stress und die Leber in der TCM",
    articleSlug: "stress-leber-tcm",
  },
};

const responsesEN: ResponseMap = {
  "stomach pain": {
    text: "In TCM, stomach pain has several patterns. Are the pains crampy and relieved by warmth? This points to **Cold in the Stomach (胃寒)** -warming foods like ginger, cinnamon and warm soups are ideal. Are they tension-type pains, often when stressed? This is typical of **Liver Qi Stagnation**. Can you describe more?",
    followUps: [
      "Better with warmth",
      "More stress-related",
      "What should I eat?",
    ],
    articleTitle: "TCM Nutrition for Digestion",
    articleSlug: "tcm-nutrition-digestion",
  },
  "sleep issues": {
    text: "Sleep problems in TCM indicate a disturbed **Heart Shen (心神)** -the spirit of the heart. Can't fall asleep, or do you wake during the night? Difficulty falling asleep often indicates **Heart Blood Deficiency** -red dates, longan fruit and calming the mind before bed help. Waking between 1–3am points to a **Liver Fire pattern** in TCM.",
    followUps: [
      "Can't fall asleep",
      "Wake during the night",
      "Which herbs help?",
    ],
    articleTitle: "Sleep and the Heart in TCM",
    articleSlug: "sleep-heart-tcm",
  },
  fatigue: {
    text: "Chronic fatigue in TCM is usually a sign of **Qi Deficiency** -most commonly of the Spleen or Kidneys. Spleen Qi Deficiency shows as tiredness after eating, heavy limbs and loose stools. Kidney Yang Deficiency shows as deep exhaustion and feeling cold. The classic TCM herb for Qi Deficiency is **Astragalus (Huang Qi 黄芪)**.",
    followUps: [
      "Tired after eating",
      "I also feel cold often",
      "Which foods help?",
    ],
    articleTitle: "Recognizing and Strengthening Qi Deficiency",
    articleSlug: "qi-deficiency",
  },
  "cold & flu": {
    text: "In TCM we distinguish **Wind-Cold** (chills, clear mucus, no sweating) from **Wind-Heat** (sore throat, yellow mucus, mild fever). For Wind-Cold: ginger tea with brown sugar, stay warm, promote sweating. For Wind-Heat: peppermint tea, chrysanthemum tea, stay cool. Which symptoms do you have?",
    followUps: [
      "More chills and cold",
      "More sore throat",
      "Which tea helps?",
    ],
    articleTitle: "Treating Colds with TCM",
    articleSlug: "treating-colds-tcm",
  },
  stress: {
    text: "Stress primarily affects the **Liver (肝)** in TCM. The Liver is responsible for the free flow of Qi -chronic stress stagnates this flow, leading to tension, irritability, headaches and digestive issues. TCM recommendation: movement (Qi Gong, yoga), mildly sour foods (support the Liver), rose bud tea, and regular sleep times.",
    followUps: [
      "I often have headaches",
      "Tension in my neck",
      "Qi Gong for beginners?",
    ],
    articleTitle: "Stress and the Liver in TCM",
    articleSlug: "stress-liver-tcm",
  },
};

const fallbackDE: ShifuResponse = {
  text: "Das ist eine interessante Frage. In der Traditionellen Chinesischen Medizin betrachten wir immer den ganzen Menschen -Körper, Geist und Umgebung. Kannst du mir mehr über deine Beschwerden erzählen? Wo spürst du es, seit wann, und was macht es besser oder schlechter?",
  followUps: [
    "Bauchschmerzen",
    "Schlafprobleme",
    "Müdigkeit",
    "Erkältung",
    "Stress",
  ],
};

const fallbackEN: ShifuResponse = {
  text: "That is an interesting question. In Traditional Chinese Medicine, we always look at the whole person -body, mind and environment. Can you tell me more about your symptoms? Where do you feel it, since when, and what makes it better or worse?",
  followUps: [
    "Stomach pain",
    "Sleep issues",
    "Fatigue",
    "Cold & flu",
    "Stress",
  ],
};

export function getDemoResponse(
  input: string,
  locale: string
): ShifuResponse {
  const normalised = input.toLowerCase().trim();
  const responses = locale === "de" ? responsesDE : responsesEN;
  const fallback = locale === "de" ? fallbackDE : fallbackEN;

  // Direct key match
  if (responses[normalised]) {
    return responses[normalised];
  }

  // Fuzzy substring match
  for (const [key, value] of Object.entries(responses)) {
    if (normalised.includes(key) || key.includes(normalised)) {
      return value;
    }
  }

  // Keyword match
  const keywordMap: Record<string, string[]> =
    locale === "de"
      ? {
          bauchschmerzen: ["bauch", "magen", "verdauung", "übelkeit", "blähungen"],
          schlafprobleme: ["schlaf", "einschlafen", "aufwachen", "insomnia", "müde nachts"],
          müdigkeit: ["müde", "erschöpft", "energie", "kraftlos", "antriebslos"],
          erkältung: ["erkält", "husten", "schnupfen", "grippe", "hals", "fieber"],
          stress: ["stress", "anspannung", "nervös", "überfordert", "angst", "kopfschmerz"],
        }
      : {
          "stomach pain": ["stomach", "belly", "digestion", "nausea", "bloating", "gut"],
          "sleep issues": ["sleep", "insomnia", "wake", "rest", "tired at night"],
          fatigue: ["tired", "exhausted", "energy", "fatigue", "weak", "drained"],
          "cold & flu": ["cold", "cough", "flu", "sore throat", "fever", "runny nose"],
          stress: ["stress", "tense", "nervous", "anxious", "overwhelmed", "headache"],
        };

  for (const [key, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((kw) => normalised.includes(kw))) {
      return responses[key];
    }
  }

  return fallback;
}

export function getTypingDelay(): number {
  return 1000 + Math.random() * 800;
}

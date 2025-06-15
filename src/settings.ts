const DefaultSettings = {
  Stats: {
    bots: 0,
    realPeople: 1,
  },
  User: {
    name: "Whiskers McFluffy",
    avatarId: 1,
    id: "user_0",
  },
};

const CatNameParts = {
  Prefixes: [
    "Whisker",
    "Fluffy",
    "Shadow",
    "Luna",
    "Muffin",
    "Sir",
    "Lady",
    "Snuggle",
    "Ziggy",
    "Purr",
    "Meow",
    "Pebble",
    "Toast",
    "Bumble",
    "Coco",
    "Jelly",
    "Tuna",
    "Cinna",
    "Fuzzy",
    "Choco",
  ],
  Suffixes: [
    "bop",
    "zoom",
    "sniff",
    "fluff",
    "pounce",
    "nap",
    "nibble",
    "wiggle",
    "hop",
    "tumble",
    "bounce",
    "wiggle",
    "muff",
    "scritch",
    "tail",
  ],
  NobleParticles: [
    "von",
    "de",
    "of",
    "di",
    "da",
    "van",
    "al",
    "del",
    "mac",
    "bin",
    "from",
    "the",
  ],
};

const FACTS = [
  "All messages are instantly translated to cat language. Meow.",
  "🐾 This project was made with React, purrformance in mind, and love for cats.",
  "📫 Want to connect? Drop me a message on <a href='google.com'>LinkedIn!</a>",
  "🔗 GitHub repo is linked in my profile – contributions (and snacks) are welcome.",
  "🐱 Cats can rotate their ears 180 degrees.",
  "😼 A group of cats is called a *clowder*.",
  "😸 The average cat sleeps 12–16 hours a day. Just like real developers.",
  "🐈‍⬛ Cats walk like camels and giraffes: both right feet, then both left feet.",
  "🐾 Cats have 32 muscles in each ear. More than most chatbots.",
  "🧠 A cat's brain is 90% similar to a human’s. No wonder they ignore us so well.",
  "🐟 Some cats are allergic to fish. Yes, the irony is strong.",
  "📦 If it fits, it sits. This is the law.",
];

const SOCIALS = [
  {
    name: "GitHub",
    link: "https://github.com/VsevolodEpinetov/cat-chat",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/vsevolod-epinetov/",
  },
  {
    name: "Personal Website",
    link: "https://epinetov.com",
  },
  {
    name: "Telegram",
    link: "https://t.me/send_dog_pics",
  },
];

const WS_ADDRESS = "wss://chat.epinetov.com/ws/";
const MAX_MESSAGES = 50;

const MAX_AVATAR_ID = 10;

export {
  DefaultSettings,
  WS_ADDRESS,
  MAX_MESSAGES,
  MAX_AVATAR_ID,
  CatNameParts,
  FACTS,
  SOCIALS,
};

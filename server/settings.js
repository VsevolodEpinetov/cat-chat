module.exports = {
  // Server configuration
  server: {
    port: 3001,
    host: 'chat.epinetov.com'
  },

  // Bot configuration
  bots: {
    initialCount: 3,
    minCount: 2,
    maxCount: 4,
    messageInterval: {
      min: 20000, // 20 seconds
      max: 30000  // 30 seconds
    },
    populationCheckInterval: {
      min: 90000,  // 1.5 minutes
      max: 150000  // 2.5 minutes
    }
  },

  // Name generation configuration
  names: {
    cutePrefixes: [
      'Whisker', 'Fluffy', 'Shadow', 'Luna', 'Muffin', 'Sir', 'Lady',
      'Snuggle', 'Ziggy', 'Purr', 'Meow', 'Pebble', 'Toast', 'Bumble',
      'Coco', 'Jelly', 'Tuna', 'Cinna', 'Fuzzy', 'Choco'
    ],
    cuteMiddles: [
      'bop', 'zoom', 'sniff', 'fluff', 'pounce', 'nap', 'nibble',
      'wiggle', 'hop', 'tumble', 'bounce', 'wiggle', 'muff', 'scritch', 'tail'
    ],
    nobleParticles: [
      'von', 'de', 'of', 'di', 'da', 'van', 'al', 'del', 'mac', 'bin', 'from', 'the'
    ]
  },

  // Bot messages
  botMessages: [
    "Hello everyone! 👋",
    "How's it going? 😊",
    "Nice weather today! ☀️",
    "Anyone up for a chat? 💭",
    "Just passing by... 🚶",
    "What's new? 📰",
    "Greetings from bot! 🤖",
    "Random fact: The first computer bug was an actual bug! 🐛",
    "Time for a coffee break! ☕",
    "Have a great day! 🌟"
  ],

  // Message processing
  messageProcessing: {
    maxWordLength: 15,
    singleCharReplacement: 'm',
    twoCharReplacement: 'ma',
    threeCharReplacement: 'nya',
    fourCharReplacement: 'meow'
  }
}; 
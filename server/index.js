const http = require('http');
const WebSocket = require('ws');
const settings = require('./settings');

const server = http.createServer();

// === 2. WebSocket сервер поверх HTTPS ===
const wss = new WebSocket.Server({ server });

// Store all connected clients
const clients = new Map();

// Store active bots
const activeBots = new Map();

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateBotName = () => {
  const name = randomElement(settings.names.cutePrefixes) + randomElement(settings.names.cuteMiddles);
  const middle = randomElement(settings.names.nobleParticles);
  const surname = randomElement(settings.names.cutePrefixes) + randomElement(settings.names.cuteMiddles);

  return `${name} ${middle} ${surname}`;
};

// Function to send stats to all clients
const broadcastStats = () => {
  const statsPackage = JSON.stringify({
    type: 'stats',
    data: {
      bots: activeBots.size,
      realPeople: clients.size
    }
  });
  
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(statsPackage);
    }
  });
};

// Function to create message package
const createMessagePackage = (author, text) => {
  return JSON.stringify({
    type: 'message',
    data: {
      author,
      text,
      timestamp: Date.now()
    }
  });
};

// Helper function to apply case pattern from original word to replacement
const applyCasePattern = (original, replacement) => {
  if (!original || !replacement) return replacement;
  
  let result = '';
  for (let i = 0; i < replacement.length; i++) {
    const originalIndex = i % original.length;
    const originalChar = original[originalIndex];
    const replacementChar = replacement[i];
    
    if (originalChar === originalChar.toUpperCase() && originalChar !== originalChar.toLowerCase()) {
      result += replacementChar.toUpperCase();
    } else {
      result += replacementChar.toLowerCase();
    }
  }
  return result;
};

const processMessage = (message) => {
  // Convert message to string if it's a buffer
  let text = message.toString();
  
  // Replace all emojis with cat emoji
  text = text.replace(/[\u{1F300}-\u{1F9FF}]/gu, '🐱');
  
  // Replace all numbers with random numbers
  text = text.replace(/\d/g, () => Math.floor(Math.random() * 10).toString());
  
  // Process words while preserving punctuation and spacing
  text = text.replace(/[\p{L}\p{M}]+/gu, (word) => {
    // Cut word if longer than maxWordLength
    const processedWord = word.length > settings.messageProcessing.maxWordLength 
      ? word.substring(0, settings.messageProcessing.maxWordLength) 
      : word;
    const length = processedWord.length;
    
    let replacement;
    if (length === 1) {
      replacement = settings.messageProcessing.singleCharReplacement;
    } else if (length === 2) {
      replacement = settings.messageProcessing.twoCharReplacement;
    } else if (length === 3) {
      replacement = settings.messageProcessing.threeCharReplacement;
    } else if (length === 4) {
      replacement = settings.messageProcessing.fourCharReplacement;
    } else if (length > 4) {
      const eCount = length - 3;
      replacement = 'm' + 'e'.repeat(eCount) + 'ow';
    }
    
    // Apply case pattern from original word
    return applyCasePattern(processedWord, replacement);
  });
  
  return text;
};

// Function to get random message
const getRandomMessage = () => {
  return randomElement(settings.botMessages);
};

// Function to get random delay between min and max seconds
const getRandomDelay = () => {
  return Math.floor(Math.random() * (settings.bots.messageInterval.max - settings.bots.messageInterval.min) + settings.bots.messageInterval.min);
};

const broadcastMessage = (message, author) => {
  const catMessage = processMessage(message);
  const packageData = createMessagePackage(author, catMessage);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(packageData);
    }
  });
  broadcastStats();
};

// Function to create a new bot
const createBot = (botId) => {
  const botName = generateBotName();
  const avatarId = Math.floor(Math.random() * 10) + 1;
  const author = {
    id: botId,
    name: botName,
    avatarId
  }
  
  console.log(`🤖 ${botName} joined the chat`);

  const botInterval = setInterval(() => {
    const message = getRandomMessage();
    console.log(`🤖 ${message}`);
    broadcastMessage(message, author);
  }, getRandomDelay());

  activeBots.set(botId, { interval: botInterval, name: botName, avatarId });
  broadcastStats();
};

// Function to remove a bot
const removeBot = (botId) => {
  const bot = activeBots.get(botId);
  console.log(`🤖 ${bot.name} left the chat`);

  clearInterval(bot.interval);
  activeBots.delete(botId);
  broadcastStats();
};

const generateClientId = () => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Function to manage bot population
const manageBots = () => {
  const targetBotCount = Math.floor(Math.random() * (settings.bots.maxCount - settings.bots.minCount + 1)) + settings.bots.minCount;
  const currentBotCount = activeBots.size;

  if (currentBotCount < targetBotCount) {
    // Add new bots
    for (let i = currentBotCount; i < targetBotCount; i++) {
      const newBotId = Date.now() + i; // Unique ID for new bot
      createBot(newBotId);
    }
  } else if (currentBotCount > targetBotCount) {
    // Remove some bots
    const botsToRemove = currentBotCount - targetBotCount;
    const botIds = Array.from(activeBots.keys());
    for (let i = 0; i < botsToRemove; i++) {
      const randomBotId = botIds[Math.floor(Math.random() * botIds.length)];
      removeBot(randomBotId);
      botIds.splice(botIds.indexOf(randomBotId), 1);
    }
  }
};

// Initial bot creation
console.log(`🤖 Creating initial ${settings.bots.initialCount} bots...`);
for (let i = 0; i < settings.bots.initialCount; i++) {
  createBot(Date.now() + i);
}

// Periodically manage bot population
setInterval(manageBots, Math.floor(Math.random() * (settings.bots.populationCheckInterval.max - settings.bots.populationCheckInterval.min) + settings.bots.populationCheckInterval.min));

wss.on('connection', (ws) => {
  const clientId = generateClientId();
  console.log(`🟢 New real client connected (ID: ${clientId})`);
  // Add new client to the set
  clients.set(clientId, ws);

  // Send welcome message
  const serverAuthor = {
    id: 'server',
    name: 'Server',
    avatarId: 99999
  }
  ws.send(createMessagePackage(serverAuthor, processMessage('👋 Hello from server')));

  // Send client their ID
  ws.send(JSON.stringify({
    type: 'clientId',
    data: {
      id: clientId
    }
  }));
    
  // Send initial stats
  ws.send(JSON.stringify({
    type: 'stats',
    data: {
      bots: activeBots.size,
      realPeople: clients.size
    }
  }));

  ws.on('message', (message) => {
    console.log('📨 Received:', message.toString());
    const receivedData = JSON.parse(message);
    const author = receivedData.data.author;
    const catMessage = processMessage(receivedData.data.text);
    broadcastMessage(catMessage, author);
  });

  ws.on('close', () => {
    console.log(`🔴 Client disconnected  (ID: ${clientId})`);
    // Remove client from the set
    clients.delete(clientId);
    broadcastStats();
  });
});

server.listen(settings.server.port, () => {
  console.log(`🔒 WSS server running on wss://${settings.server.host}:${settings.server.port}`);
});

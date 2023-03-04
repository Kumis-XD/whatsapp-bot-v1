const {
  Client
} = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
const aauthor = '@+62 858-6776-0406'

const client = new Client();

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  qrcode.generate(qr, {
    small: true
  });
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.initialize();

client.on('authenticated', (session) => {
  console.log('Authenticated!');
});

client.on('auth_failure', (msg) => {
  console.error('Auth failure:', msg);
});

client.on('disconnected', (reason) => {
  console.log('Client was logged out', reason);
});

client.on('message_create', async (msg) => {

  const greeting = `Hai ${msg.from} selamat datang, saya adalah whatsapp bot yang dibuat oleh ${author}, ada yang bisa saya bantu?`;
});

const chat = await msg.getChat();
const profilePicUrl = await chat.getProfilePicUrl();
const profilePicData = await client.getProfilePicFromServer(chat.id._serialized, chat.participant._serialized);

const message = {
  body: `${greeting}`,
  caption: 'Dibuat oleh ${author}'
  jpegThumbnail: profilePicData,
  url: profilePicUrl,
};

await client.sendMessage(msg.from, message, {
  sendMediaAsSticker: false
});
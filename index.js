const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
const fs = require('fs');
const cli = require('nodemon/lib/cli');

const SESSION_FILE_PATH = './session.json';
let sessionData;

if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
    session: sessionData
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function(err) {
        if(err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.info('Client is ready!');
});

client.on('message_create', async (msg) => {
    const groupChatId = 'namag_roup';

    const greeting = `Hallo @${msg.from}, selamat datang saya bot whatsapp yang dibuat oleh *kumisxd*, ada yang bisa saya bantu?`;

    await client.sendMessage(groupChatId, greeting);
});

client.on('message', async (msg) => {
    if (
        (msg.body.startsWith('!sticker') || msg.body.startsWith('/sticker')) && msg.type === 'image'
        ) {
        let media;
        try {
            media = await msg.downloadMedia();
        } catch (error) {
          console.error(error);
          return msg.reply('Gagal mengunduh gambar');
        }

        client.reply(msg.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: 'Dibuat oleh MY_BoTz',
            stickerName: 'MY_BoTz',
        });
    }
});

client.initialize();

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('disconnected', () => {
    console.log('Client was logged out');
});
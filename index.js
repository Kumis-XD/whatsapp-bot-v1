const { Client, LegacySessionAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const SESSION_FILE_PATH = './session.json';

let sessionData;

const client = new Client({
    authStrategy: new LegacySessionAuth({
        session: sessionData
    })
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.generate({
        small: true
    })
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const buttonTemplate = { buttons: buttons };
    const media = await MessageMedia.fromUrl('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptDb9alcaeyb0knS6peA9k7gjlMuD1AB7nk-kHkA1EDgohPx_oTDhPmRKNxbnVGhb2sY&usqp=CAU');
    if (chat.isNewMsg && message.fromMe) {
        const buttons = [
            { 
                action: 'Menu🤖',
                text: '╔════════╗\n║ *MENU* ║\n╚════════╝',
            },
            { 
                action: 'Report❗',
                url: 'https://wa.me/6285867760406'
            }
            ];
        const buttonTemplate = { buttons: buttons };
        await chat.sendMessage(media, `Hello @${contact.id.user}`, buttonTemplate, {
            mentions: [contact]
        });
    }
});

client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});

client.initialize();
const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');

const client = new Client();

client.on('pkg install nodejs-lts');
client.on('npm install whatsapp-web.js');
client.on('npm install qrcode-terminal');

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED :', qr);
});

client.on('ready', () => {
    console.info('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

client.on('message', async (msg) => {
    if(msg.body === '!everyone') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});


client.initialize();

client.on('message_create', async (msg) => {
  // When a new message is created, send a greeting message to the user
  const greeting = `Hallo ${msg.from}, selamat datang saya bot whatsapp yang dibuat oleh *kumisxd*, ada yang bisa saya bantu?`;
  await client.sendMessage(msg.from, greeting);
});

// Supports ES6
// LIBS
const venom = require('venom-bot');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// FILE LOCALI
const cf = require('./config.json');
const date = require('./functions/date.js');

// COLLEGAMENTI ESTERNI
const covid_protezione_civile = 'https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json';

// INIZIALIZZAZIONE DELLA SESSIONE
venom.create({
    session: 'Z3roBOT', // name of session
})
.then((client) => {
    start(client);
})
.catch((erro) => {
    console.log(erro);
});

function start(client) {

    // COMANDI TESTUALI
    client.onMessage((message) => {

        const cmd_args = message.body.split(' ');

        let chatId = message.from;
        let myId = '393755460871@c.us'

        if(message.isGroupMsg === true) {
            switch(message.body.toLowerCase()) {
                case '/help':
                    let help = [
                        '/circolari {N} - Invia i file PDF delle ultime *N* circolari richieste, se il campo *N* rimane vuoto, invierà solo l\'ultima, se la circolare contiene più file, verranno inviati tutti (segnate dalla "P. #").',
                        '/orario - Invia la foto dell\'orario scolastico della settimana. (Da rifare)',
                        '/info - Informazioni riguardanti il BOT'
                    ];
                    client.sendText(chatId, `*Comandi | 1*\n\n${help[0]}\n\n${help[1]}\n\n${help[2]}`);
                    break;
                case 'come stai?':
                    client.sendText(chatId, `Bene, tu?`);
                    break;
                case '/orario':
                    client.sendImage(chatId, 'img/orario.jpg', 'Orario3F', `Orario scolastico 2022/2023, classe 3F`);
                    break;
                case '/info': case '/informazioni': case '/i':
                    let info = [
                        `*Developer:* ${cf.info.developer[0]} (IG)`,
                        `*Versione BOT:* ${cf.info.versione}`,
                        `_Questo BOT è il frutto dei miei esperimenti personali con node.js, al fine di imparare il più possibile tecniche specifiche!_`
                    ];
                    client.sendText(chatId, `*Informazioni*\n\n${info[0]}\n${info[1]}\n\n${info[2]}`);
                    break;
            }

            if(message.body.split(' ')[0].toLowerCase() === '/circolari') {

                const circs = [];
                const months = [];
                const days = [];
                const files = [];

                const url = `https://iissvolta.edu.it/category/circolari-2022-2023/`;

                (async () => {
                    const response = await axios.get(url);
                    const $ = cheerio.load(response.data);
            
                    const arcs = $('article');
            
                    for(let x of arcs) {
                        attrs = $(x).find('a[href]').attr('href');
            
                        const pattern = /-[1-90-90-9]+/;
                        if(attrs.match(pattern)) {
                            let key = pattern.exec(attrs);
                            circs.push(key[0].replace('-', ''));
            
                            const dates = attrs.split('/');
                            files.push(dates[6]);
                            days.push(dates[5]);
                            months.push(dates[4]);
                        }
                    }

                    //client.sendText(chatId, `Ecco a te le ultime 3 circolari!\n\n${circs[0]}\n\n${circs[1]}\n\n${circs[2]}`);

                    if(cmd_args[1] < 8 || isNaN(cmd_args[1])) {
                        let max = isNaN(cmd_args[1]) ? 1 : cmd_args[1];

                        for(let i = 0; i < max; i++) {
                            const source = `https://iissvolta.edu.it/${date.vars[0]}/${months[i]}/${days[i]}/circolare-n-${circs[i]}`;
                            const response2 = await axios.get(source);
                            const $2 = cheerio.load(response2.data);
                            const circ = $2('p a[title]');

                            let j = 1; //counter pezzo circolare
                            for(let x of circ) {
                                let c_attrs = $2(x).attr('href');
                                await client.sendFile(chatId, `${c_attrs}`, `${files[i]}`, `*Circolare N.${circs[i]} P. ${j}*\n\n*Data:* ${date.vars[0]}/${months[i]}/${days[i]}\n\n*File:* ${files[i]}`);
                                j++;
                            }            
                        }
                    } else {
                        await client.sendText(chatId, `⚠️ _Puoi richiedere massimo 7 circolari alla volta!_`)
                    }
                })();
            }
        }

        const logs = cmd_args[0] ? cmd_args : `Not a Text Message!`;
        console.log(`MSG >> ${chatId} >> ${logs}`);
    });
}

// Catch ctrl+C
process.on('SIGINT', function() {
    client.setProfileStatus('Sono offline :(');
    client.close();
});
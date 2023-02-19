const venom = require('venom-bot');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    circolari: (async () => {
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
    })()
}
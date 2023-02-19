const date = require('./date.js');

module.exports = {
    materie: {
        aule: {
            classe: 616,
            lab_informatica: 907,
            lab_sistemi: 401,
            lab_tlc: 212
        },
        elenco: {
            tpsit: {
                nome: 'TPSIT',
                insegnante: 'Indelicato O.',
                lab: {
                    insegnante: 'Indelicato O. / Messina D.',
                    aula: this.materie.aule.lab_sistemi,
                    labv: true
                },
                labv: false
            },  
            inf: {
                nome: 'Informatica',
                insegnante: 'Caronia Angitta A.',
                lab: {
                    insegnante: 'Caronia Angitta A. / Guccione L.',
                    aula: this.materie.aule.lab_informatica,
                    labv: true
                },
                labv: false
            },
            religione: {
                nome: 'Religione',
                insegnante: 'Provenza A.',
                labv: false
            },
            motoria: {
                nome: 'Scienze Motorie',
                insegnante: 'Butera G.',
                labv: false
            },
            ita: {
                nome: 'Italiano',
                insegnante: 'Di Benedetto C.',
                labv: false
            },
            sistemi: {
                nome: 'Sistemi e Reti',
                insegnante: 'Indelicato O.',
                lab: {
                    insegnante: 'Indelicato O. / Compagno G.',
                    aula: this.materie.aule.lab_sistemi,
                    labv: true
                },
                labv: false
            },
            storia: {
                nome: 'Storia',
                insegnante: 'Di Benedetto C.',
                labv: false
            },
            tlc: {
                nome: 'Telecomunicazioni',
                insegnante: 'Taormina R.',
                lab: {
                    insegnante: 'Taormina R. / Minneci S.',
                    aula: this.materie.aule.lab_tlc,
                    labv: true
                },
                labv: false
            },
            ing: {
                nome: 'Inglese',
                insegnante: 'Valenza G.',
                labv: false
            },
            mate: {
                nome: 'Matematica',
                insegnante: 'Mingoia G.',
                labv: false
            }
        }, 
        lunedi: [
            this.materie.elenco.ita,
            this.materie.elenco.ita,
            this.materie.elenco.tpsit,
            this.materie.elenco.religione,
            this.materie.elenco.motoria,
            this.materie.elenco.motoria
        ],
        martedi: [
            this.materie.elenco.inf.lab,
            this.materie.elenco.inf.lab,
            this.materie.elenco.inf.lab,
            this.materie.elenco.tlc,
            this.materie.elenco.mate,
            this.materie.elenco.mate
        ],
        mercoledi: [
            this.materie.elenco.mate,
            this.materie.elenco.ing,
            this.materie.elenco.sistemi,
            this.materie.elenco.storia,
            this.materie.elenco.inf,
            this.materie.elenco.inf,
            this.materie.elenco.tpsit.lab
        ],
        giovedi: [
            this.materie.elenco.inf,
            this.materie.elenco.ing,
            this.materie.elenco.mate,
            this.materie.elenco.ita,
            this.materie.elenco.sistemi.lab,
            this.materie.elenco.sistemi.lab,
            this.materie.elenco.tpsit
        ],
        venerdi: [
            this.materie.elenco.sistemi,
            this.materie.elenco.ing,
            this.materie.elenco.ita,
            this.materie.elenco.storia,
            this.materie.elenco.tlc,
            this.materie.elenco.tlc
        ]
    },

    ordina: () => {
        for(x of this.materie) { //finire
            if(x) {

            }
        }
    },

    orario: () => { //finire
        let weekDay = date.day;
        if(date.hour >= 15) 
            weekDay++;

        switch(weekDay) {
            case 1: 
                
        }
    }
}
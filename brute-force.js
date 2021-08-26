/**
                                ____      _                   _          _ _ _ 
                               / __ \  __| | __ ___   ___ __ (_)_ __ ___| | (_)
                              / / _` |/ _` |/ _` \ \ / / '_ \| | '__/ _ \ | | |
                             | | (_| | (_| | (_| |\ V /| |_) | | | |  __/ | | |
                              \ \__,_|\__,_|\__,_| \_/ | .__/|_|_|  \___|_|_|_|
                               \____/                  |_|                     

                                        BruteForce Attack - KEYSTORE
                                            www.davidepirelli.it
 
 Questo tool nasce da un esigenza personale, avevo dimenticato la password del keystore per firmare un app Android
 che avevo realizzato anni fa! Dang! AndroidStudio in fase di build consente di sbagliare solo 3 volte la password
 del keystore, dopodichè qualsiasi password (anche corretta) viene segnata come errata. Per comodità quindi ho
 scritto questo semplice programma che usa il keytool per trovare la password.

******************************************************************************************************************
** COME SI USA QUESTO TOOL:
******************************************************************************************************************
 Per utilizzare questo tool, procedi in questo modo:
 - Copia la tua chiave nella stessa cartella dove è presente il file brute-force.js
 - Apri il file dizionario e inserisci tutte le possibili password da provare (puoi anche scaricare un dizionario
   ad hoc per il bruteforce, qui un link ad un dizionario da 1GB #LINK#).
 - Apri il terminale e spostati nella cartella dove è presente il file brute-force.js e la tua chiave.
 - Esegui il comando "$ node brute-force.js ../path/keystore"
 - Attendi che il tool provi tutte le password. Quando viene trovata in elenco la password corretta, essa verrà
   salvata all'interno del file "risultato_bruteforce.txt".
 - Buona fortuna! ;-)
**/


const fs = require('fs');
const { exec } = require('child_process');

const dictionaryPath = './src/dizionario';
const resultPath = './risultato_bruteforce.txt';
const keystorePath = process.argv.slice(2);

const printError = (message) =>{
  console.log('\x1b[1m \x1b[31m', `${message}`);
};

const printInfo = (message) =>{
  console.log('\x1b[1m \x1b[34m',`${message}`);
};

const printWarn = (message) =>{
  console.log('\x1b[1m \x1b[33m',`${message}`);
};

const printSuccess = (message) =>{
  console.log('\x1b[1m \x1b[32m',`${message}`);
};

const showError = () =>{
  printError(`ERRORE >> Keystore non trovata!! >> ${JSON.stringify(keystorePath)}`);
  printWarn(`Esegui: 'node brute-force.js percorso-alla-keystore'`);
};

const writeResult = (result) =>{
  printSuccess(result);
  fs.writeFile(resultPath, result, function(err) {
    if(err) {
        return console.error(err);
    }
    printSuccess("La password è stata salvata nel file risultato_bruteforce.txt! :D");
  }); 
}

const run = () => {
  const readline = require('readline').createInterface({
    input: require('fs').createReadStream(dictionaryPath)
  });

  readline.on('line', (line) => {
    printInfo(`[BRUTEFORCE] Provo la password >> ${line}`);
    exec(`cd src/lib & keytool -list -keystore ${keystorePath} -storepass ${line}`, (err) => {
      if (!err) {
        readline.close();
        const result = 'Password trovata! La password della chiave è: \r\n\r\n ##############################\r\n '+ line +' \r\n ##############################\r\n\r\n';
        writeResult(result);
      }
    });
  });
};

if (keystorePath && !!keystorePath.length){
  const keystore = keystorePath[0];
  fs.access(keystore, fs.F_OK, (err) => {
    if (err) {
      showError();
      return
    }
    run(keystore);
  });
 }else{
    showError();
 }







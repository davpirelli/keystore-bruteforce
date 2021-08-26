# Android KeyStore password recovery
Hai dimenticato la password del keystore per firmare la tua app?

 # Perchè?
Questo tool nasce da un esigenza personale..
Avevo dimenticato la password della chiave per firmare un app Android
 che avevo realizzato anni fa!
 AndroidStudio però in fase di build consente di sbagliare **solo 3 volte la password** keystore, dopodichè qualsiasi password (*anche corretta*) viene segnalata come errata. Per comodità quindi ho
 scritto questo semplice programma che usa il keytool per trovare la password.

 # Come si usa questo tool:
Utilizzare questo tool, procedi in questo modo:
1. Copia la tua chiave nella stessa cartella dove è presente il file brute-force.js
2. Apri il file "dizionario" e inserisci tutte le possibili password da provare *(puoi anche scaricare un dizionario ad hoc per il bruteforce, qui un link ad un dizionario da 2.24GB ~~LINK_REMOVED~~).*
3. Incolla la tua chiave nella stessa directory dove è presente il file `brute-force.js`
4. Apri il terminale e spostati nella root dove è presente il file `brute-force.js` ed esegui il comando `$ node brute-force.js nome-della-chiave`
5. Attendi che il tool provi tutte le password. Se verrà trovata la password verrà generato un file di testo (`risultato_bruteforce.txt`) contenente la password corretta.

Buona fortuna! ;-)

Ti è stato utile questo tool? [Donami un caffè!](https://www.paypal.com/donate?business=info@inkstudio.it&amount=1&no_recurring=1&item_name=Donazione%20KeyTool%20Android&currency_code=EUR)

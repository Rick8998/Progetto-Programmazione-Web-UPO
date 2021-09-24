# Programmazion-Web

ReCity - Segnalazione e gestione di problematiche di ristrutturazione/restauro

Scopo

Si vuole creare un sistema di gestione di problematiche (danneggiamenti, usura…) alle piccole e grandi opere della città.
Il sito permette agli utenti di segnalare a questa società terza determinati problemi; la società si preoccuperà di visionare le richieste e mettere in piedi una squadra di esperti che si preoccuperà di recarsi sul luogo e ristrutturare l’opera segnalata dall’utente (il tutto ovviamente contrattando con le autorità competenti, cosa che non interessa direttamente l’utente, quindi questo procedimento non viene mostrato).
Struttura generale

Ci saranno due tipi di utenti:
• Cittadino
• Admin

Il cittadino sarà identificato da:
• Nome
• Cognome
• E-mail

Potrà segnalare un qualche tipo di malfunzionamento/danneggiamento, tramite la sezione a lui dedicata (sarà necessario fare il login tramite E-mail e Password). Per segnalare un problema si dovranno indicare:
• Città
• Via/Piazza/…
• Descrizione del danno

Inoltre, ogni cittadino potrà vedere lo stato di ciascuna richiesta nella sezione a lui dedicata.
L’utente non registrato, nella pagina di index, vedrà solo le richieste che son già state soddisfatte (in modo che questo sia da indice per quanto riguarda l’affidabilità dell’azienda in base a quante segnalazioni sono state soddisfatte). Inoltre, potrà ricercare nel DB, specificando città e via, una (o più) richiesta/e in una determinata zona.

L’admin sarà identificato da:
• Nome (un nickname usato come credenziale di accesso, univoco)
• Codice identificativo (univoco)

L’admin sarà colui che visionerà le richieste fatte dagli utenti e si preoccuperà di mettere in piedi una squadra per gestire una specifica richiesta (la società avrà più admin)
L’admin gestirà le richieste degli utenti. In particolare, una richiesta potrà essere:
• Pendente, Soddisfatta o Rifiutata

In particolare, la società, se noterà di non avere le risorse disponibili per gestire una richiesta la rifiuterà immediatamente; mentre se una richiesta è in stato Pendente vorrà dire che la società si è fatta carico della stessa (potrà comunque essere ancora rifiutata; ad esempio se le autorità non rilasciano il permesso di lavorare su quell’opera).

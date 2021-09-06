const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const SCOPES = [
    'https://www.googleapis.com/auth/calendar',	
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.events.readonly'
];
const TOKEN_PATH = 'token.json';
/*
* El "credentials.json" NO es el archivo que obtenemos cuando creamos una cuenta de servicio para nuestro "bot"
* el credentials lo obtenemos cuando creamos el CLIENTE OAUTH2.0, que se crea colocando "CREAR CREDENCIALES"
* y colocando "ID de cliente de OAuth", luego la app es "App de escritorio" y cuando rellenamos los datos
* colocamos en "DESCARGAR JSON" y a ese archivo se le cambia por el nombre "credentials.json"
* se debe crear a mano para que nos permita hacer peticiones!!
* no es necesario que usemos un correo de universidad, podemos usar un correo propio personal y con
* el tipo de usuario en externo sin problemas
*/
/**
 * Luego de todos esos pasos, en la seccion de cuentas de servicios, le damos a editar 
 * desplegamos el menu de "MOSTRAR DELEGACION DE TODO EL DOMINIO"
 * y habilitamos la opcion a "check", finalmente guardamos y nos vamos a 
 * "PANTALLA DE CONSENTIMIENTO" y le damos a "EDITAR APP" y entramos en la seccion 2 "Permisos",
 * para llegar ahi se deben llenar los datos, y si estan rellenados, simplemente se debe apretar continuar
 * estando ahi colocamos en "AGREGAR O QUITAR PERMISOS" y buscamos los servicios de "Google Calendar API"
 * y seleccionamos todos!! y estaremos listos para poder realizar peticiones al calendarios, pero OJO
 * en el credentials.json hace falta un atributo que se obtiene yendo al calendario que es el "Calendar ID"
 */
fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    authorize(JSON.parse(content), listEvents);
});

function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const calendarId = credentials.calendarID;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    // Para obtener las uris debemos creear un cliente OAuth2.0, A MANO! Porque cuando creamos
    // una cuenta de servicio nos crea automatico un Cliente, la idea es crear nosotros el cliente!!
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, calendarId);
    });
}

function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
}

const event = {
    'summary': 'Nombre de la reunion',
    'description': 'Descripcion de la reunion',
    'start': {
        'dateTime': '2021-09-03T23:00:00-07:00',
        'timeZone': 'America/Santiago',
    },
    'end': {
        'dateTime': '2021-09-04T17:00:00-07:00',
        'timeZone': 'America/Santiago',
    },
    'attendees': [
        {'email': 'eugenio.cortes@alumnos.uv.cl'}
    ],
    'conferenceData': {
        'createRequest':{
            'conferenceSolutionKey': {
                'type': 'hangoutsMeet'
            },
            'requestId': 'conEstoCreaElLinkParaMeet'
        }
    },
};

async function listEvents(auth, calendarId) {
    const calendar = google.calendar({version: 'v3', auth});
    await calendar.events.insert({
        auth: auth,
        calendarId: calendarId,
        resource: event,
        sendUpdates: 'all',
        conferenceDataVersion: 1
    }, function(err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err);
            return;
        }
        console.log('Event created!!');
    });
    calendar.events.list({
        calendarId: calendarId,
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const events = res.data.items;
        if (events.length) {
        events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
        });
        } else {
        console.log('No upcoming events found.');
        }
    });
}
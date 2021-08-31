const calendarToken=require('./test-platzi-music-d01b06ed4a80.json');
const {google}=require('googleapis');

const scope= 'https://www.googleapis.com/auth/calendar';
const cal=google.calendar({version:'v3'});
const auth = new google.auth.JWT(
    calendarToken.client_email,
    null,
    calendarToken.private_key,
    scope
);
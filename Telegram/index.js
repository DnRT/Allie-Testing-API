const {Telegraf}=require('telegraf');
const bot = new Telegraf(require('./config.json').token);
//Send a message in case of a text
bot.command('send',(ctx)=>{
    console.log(ctx.message);
    let message=ctx.message.text.slice(6);//this select the message
    let id=ctx.message.from.id;//this is the user/group id
    let owner=ctx.message.from.first_name;
    bot.telegram.sendMessage(id,message+` thanks ${owner}`);
});
bot.launch();
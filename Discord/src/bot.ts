import { config } from "dotenv";
config();

import { Client, Message } from "discord.js";
import { prefix, up, down, mention } from './config.json';
const client:Client=new Client();
client.once('ready', ()=>{
  console.log("asdasd");
});
client.on('message', (message:Message)=>{
  if(message.content.startsWith(`${prefix}assign`)){
    let data=message.content.slice(8,message.content.length);
    if(message.member.user.bot!=true){
      message.channel.send(data);
    }
    else{
      message.delete();
    }
  }
});
client.login(process.env.TOKEN);

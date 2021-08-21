const {Client,Intents}=require('discord.js');
const client=new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config=require('./config.json');
const chan=client.channels.valueOf();
client.once('ready', ()=>{
  console.log("Bot ready to use!!!!");
});
client.on('message', (message)=>{
  
  if(message.content.startsWith(`${prefix}assign`)){
    let data=message.content.slice(8,message.content.length);
    message.channel.send(data);
    mentioned=message.mentions.users.first();
    console.log(message.valueOf());
    if(message.valueOf()){
      message.delete()
    }
  }
});
client.on('messageReactionAdd', async (reaction, user) => {
  // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await reaction.fetchUsers();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      return;
    }
    //If the message is correct and reaction match with an speciffic emoji
    if(reaction.emoji.name===up && user.username===mentioned){
      console.log(`Nice Work ${user.username}!!!`);
    }
    /* console.log(`${reaction.message.author.username}'s message "${reaction.message.content.toString()}" gained a reaction!`);
    console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
    console.log(`${reaction.count} user(s) have given the same reaction to this message!`); */
});
client.on('channelCreate',(channel)=>{
  chan.forEach((actual)=>{
    if(actual.id===channel.parentId){
      console.log(`${channel.name} was found at ${actual.name}`);
      
    }
  });
});
client.login(config.token);
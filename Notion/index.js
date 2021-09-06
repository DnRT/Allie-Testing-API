const { Client } = require('@notionhq/client');
const config=require('./config.js');
const client=new Client({auth: config.TOKEN_INTEGRATION});
//Create a page, just title
const getDatabases=async ()=>{
    const res=await client.pages.create({
        parent:{
            database_id:config.TOKEN_DATABASE_ID
        },
        properties:{
            Name:{
                title:[{
                    type:"text",
                    text:{content:"testing"}
                }],
                
            }
        }
    });
    /* const res=await client.databases.list();
    console.log(res); */
     /* const {results}=await client.databases.query({
        database_id:config.TOKEN_DATABASE_ID,
        
    });
    console.log(results); */
    console.log(res);
}
getDatabases();
/* (async () => {

    const response = await client.pages.create({
        parent: {
            database_id: config.TOKEN_DATABASE_ID,
          },
             icon: {
              type: "emoji",
                  emoji: "🎉"
            },
          properties: {
            Name: {
              title: [
                {
                  text: {
                    content: 'Tuscan Kale',
                  },
                },
              ],
            },
            Description: {
              text: [
                {
                  text: {
                    content: 'A dark green leafy vegetable',
                  },
                },
              ],
            },
            'Food group': {
              select: {
                name: '🥦 Vegetable',
              },
            },
            Price: {
              number: 2.5,
            },
          },
          children: [
            {
              object: 'block',
              type: 'heading_2',
              heading_2: {
                text: [
                  {
                    type: 'text',
                    text: {
                      content: 'Lacinato kale',
                    },
                  },
                ],
              },
            },
            {
              object: 'block',
              type: 'paragraph',
              paragraph: {
                text: [
                  {
                    type: 'text',
                    text: {
                      content: 'Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.',
                      link: {
                        url: 'https://en.wikipedia.org/wiki/Lacinato_kale',
                      },
                    },
                  },
                ],
              },
            },
          ],
        });
        console.log(response);
      })(); */
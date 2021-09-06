const dot=require('dotenv');
dot.config()
module.exports = {
    TOKEN_INTEGRATION:process.env.TOKEN_INTEGRATION,
    TOKEN_DATABASE_ID:process.env.NOTION_DATABASE_ID
}
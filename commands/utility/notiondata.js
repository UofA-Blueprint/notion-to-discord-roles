const { SlashCommandBuilder } = require('discord.js');
//require('dotenv').config()
const {notion_page_id, notion_api_key} = require("../../config.json")
const {fetchNotionDatabase, parseResults}= require("../../services/notionFetch")
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: notion_api_key })


module.exports = {
    data: new SlashCommandBuilder()
        .setName('notiondata')
        .setDescription('Lists some members from the notion'),
    async execute(interaction) {
        let ndata = await fetchNotionDatabase(notion, notion_page_id)
        await interaction.reply(parseResults(ndata.results));
    },
};
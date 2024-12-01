const { SlashCommandBuilder } = require('discord.js');
const {fetchNotionDatabase, parseResults,collectHandles}= require("../../services/notionFetch")
const {notion_page_id, notion_api_key} = require("../../config.json")

const {Client} = require("@notionhq/client");
const notion = new Client({ auth: notion_api_key })

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setrole')
        .setDescription('Gives a user a role based on notion data')
        .addUserOption(option => option.setName('user').setDescription('User to give role to').setRequired(true)),
    async execute(interaction) {
        //const role = interaction.options.getRole('role');
        const user = interaction.options.getMember('user');
        const guild = interaction.guild;
        const username = user.user.username
	console.log("Requested change of role")
        let ndata = await fetchNotionDatabase(notion, notion_page_id)
        let roledata = await collectHandles(ndata.results)
        const role = guild.roles.cache.find(role => role.name === roledata[username][1]);
        let membername = roledata[username][0]
        if (!role) {
            await interaction.reply(`Role not found.`);
            return;
        }
        await user.roles.add(role);

        await interaction.reply(`${username} (${membername }) has been assigned to ${role}`);
    },
};

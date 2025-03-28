const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const {notion_page_id, notion_api_key} = require("../../config.json")
const {fetchNotionDatabase, collectHandles}= require("../../services/notionFetch")
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: notion_api_key })
// command for setting roles for everyone in the server based on the notion database
module.exports = {
	data: new SlashCommandBuilder()
	.setName('setnotion')
	.setDescription('Demo notion'),
	async execute(interaction) {
		console.log("Start set everyone attempt")
		const { options, guild } = interaction;
		
		replyMessage = "Setting Roles for Everyone\n"
		// fetches all the members in the server and the notion database
		members = await guild.members.fetch();
		let notionRes = await fetchNotionDatabase(notion, notion_page_id);
		let resDict = collectHandles(notionRes.results)
		// loop through all the members in the guild and give their roles corresponding to the notion database
		members.forEach(async m => {
			// if their discord username is in the notion database, give them the roles that are in the database
			discordUsername = m.user.username
			if (discordUsername in resDict){
				name = resDict[discordUsername]['name']
				discordRole = resDict[discordUsername]['current role']
				targetRole = guild.roles.cache.find(role => role.name === discordRole);
				m.roles.add(targetRole).catch(()=>{return})
				replyMessage = replyMessage.concat(`${discordUsername} (${name}) has been assigned ${discordRole}`)	
				// if the user has a team, give them the team role as well
				if ('current team' in resDict[discordUsername]){
					bpTeam = resDict[discordUsername]['current team']
					replyMessage = replyMessage.concat(` on the ${bpTeam}`)
					targetTeam = guild.roles.cache.find(role => role.name == bpTeam)
					m.roles.add(targetTeam)
				}
				replyMessage = replyMessage.concat("\n")

			}
		})

		await interaction.reply({ content: replyMessage });

	}
}



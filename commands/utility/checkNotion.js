const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const {notion_page_id, notion_api_key} = require("../../config.json")
const {fetchNotionDatabase, collectHandles}= require("../../services/notionFetch")
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: notion_api_key })

module.exports = {
	data: new SlashCommandBuilder()
	.setName('checknotion')
	.setDescription('Verify roles against notion'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		console.log("Start set everyone attempt")
		const { options, guild } = interaction;
		replyMessage = "Setting Roles for Everyone\n"
		members = await guild.members.fetch();
		let notionRes = await fetchNotionDatabase(notion, notion_page_id);
		let resDict = collectHandles(notionRes.results)

		members.forEach(async m => {
			discordUsername = m.user.username
			if (discordUsername in resDict){
				dsTeam = resDict[discordUsername]['current team']
				dsRole = resDict[discordUsername]['current role']
				name = resDict[discordUsername]['name']
				discordRoleSet = new Set()
				m.roles.cache.forEach(r => {if (r.name[0] != "@"){discordRoleSet.add(r.name)}})
				
				if (discordRoleSet.has(dsTeam) && discordRoleSet.has(dsRole)){
					replyMessage = replyMessage.concat(`${discordUsername} (${name}) has their current role assigned`) 
				} else {
					if  (dsRole == "Alumni"){
						dsTeam = "None"
					}
					replyMessage = replyMessage.concat(`${discordUsername} (${name}) does not have their current role assigned (${dsRole}, ${dsTeam})`)
				} 

				replyMessage = replyMessage.concat("\n")

			}
		})
		interaction.editReply({ content: replyMessage })
	}
}



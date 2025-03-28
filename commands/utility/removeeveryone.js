const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
// slash command for removing everyones roles below the bots role level
module.exports = {
    // info that discord tells you about the command
    data: new SlashCommandBuilder()
        .setName('removeeveryone')
        .setDescription('Removes everyones roles below the bots role level')
        ,
    async execute(interaction) {
	console.log("Starting to remove everyones roles")
        const { options, guild } = interaction;
        if (true) {
            // fetches all the members in the server 
	    members = await guild.members.fetch();
            await interaction.reply({ content: `Wiping everyones roles` });
            let num = 0;
            setTimeout(() => {
                // loop through all the members in the guild and remove their roles (all roles) 
                members.forEach(async m => {
                    m.roles.set([]).catch(err => {
                        return;
                    });
                    num++;
                    //text that shows how many members the loop goes thru - not how many wipes 
                    const embed = new EmbedBuilder()
                        .setColor('Blue')
                        .setDescription(`❗${num} members scanned`)
                    await interaction.editReply({ content: '', embeds: [embed] });
                })
            }, 100)
        }
    }
}



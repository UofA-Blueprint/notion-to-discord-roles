const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removeeveryone')
        .setDescription('Removes everyones roles below the bots role level')
        ,
    async execute(interaction) {
	console.log("Starting to remove everyones roles")
        const { options, guild } = interaction;
	//if (!interaction.member.permissions.has(PermissionsBitField.FLAGS.ADMINISTRATOR))
        //    return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        if (true) {
	    members = await guild.members.fetch();
            await interaction.reply({ content: `Wiping everyones roles` });
            let num = 0;
            setTimeout(() => {
                members.forEach(async m => {
                    console.log("users highest role is ",m.color);
                    m.roles.set([]).catch(err => {
                        return;
                    });
                    num++;

                    const embed = new EmbedBuilder()
                        .setColor('Blue')
                        .setDescription(`❗${num} members wiped`)
                    await interaction.editReply({ content: '', embeds: [embed] });
                })
            }, 100)
        }
    }
}



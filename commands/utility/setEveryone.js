const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
// slash command for giving a role to everyone in the server - does not really matter anymore was just a command for initial testing
module.exports = {
    data: new SlashCommandBuilder()
    // info that discord tells you about the command
        .setName('seteveryone')
        .setDescription('Gives everyone a role')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role to give')
                .setRequired(true)),
    async execute(interaction) {
	await interaction.deferReply({ ephemeral: true });
	console.log("Start set everyone attempt")
        const { options, guild } = interaction;
        // fetches all the members in the server 
        const members = await guild.members.fetch();
        const role = options.getRole('role');

        await interaction.deferReply();
        await interaction.editReply({ content: `Setting role ${role.name} to everyone` });
        let num = 0;
        // loop through all the members in the guild and give them the role that is chosen by user
        setTimeout(() => {
            members.forEach(async m => {
                m.roles.add(role).catch(err => {
                    return;
                });
                num++;

                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setDescription(`❗Giving ${num} members ${role.name} `)
                
                await interaction.editReply({ content: '', embeds: [embed] });
            })
        }, 100)
    }

}


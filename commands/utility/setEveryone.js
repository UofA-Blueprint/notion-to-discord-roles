const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seteveryone')
        .setDescription('Gives everyone a role')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Role to give')
                .setRequired(true)),
    async execute(interaction) {
	console.log("Start set everyone attempt")
        const { options, guild } = interaction;
        const members = await guild.members.fetch();
        const role = options.getRole('role');

        await interaction.deferReply();
        await interaction.editReply({ content: `Setting role ${role.name} to everyone` });
        let num = 0;
        
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


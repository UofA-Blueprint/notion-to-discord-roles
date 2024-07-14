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
        const { options, guild } = interaction;
        const members = await guild.members.fetch();
        const role = options.getRole('role');
        if (!interaction.member.permissions.has(PermissionsBitField.FLAGS.ADMINISTRATOR))
            return await interaction.reply({ content: 'You do not have permission to use this command', ephemeral: true });
        else {
            await interaction.reply({ content: `Setting role ${role.name} to everyone` });
            let num = 0;
            setTimeout(() => {
                members.forEach(async m => {
                    m.roles.add(role).catch(err => {
                        return;
                    });
                    num++;

                    const embed = new EmbedBuilder()
                        .setColor('Blue')
                        .setDescription(`❗${num} members have ${role.name} `)
                    await interaction.editReply({ content: '', embeds: [embed] });
                })
            }, 100)
        }
    }
}



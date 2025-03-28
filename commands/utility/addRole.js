const { SlashCommandBuilder } = require('discord.js');
// slash command for giving a single user a role - does not really matter anymore was just a command for initial testing
module.exports = {
	data: new SlashCommandBuilder()
		.setName('giverole')
		.setDescription('Gives a user a role')
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('Role to give')
				.setRequired(true))
		.addUserOption(option => option.setName('user').setDescription('User to give role to').setRequired(true)),
	async execute(interaction) {
		const role = interaction.options.getRole('role');
		const user = interaction.options.getMember('user');
		const guild = interaction.guild;
		if (!role) {
			await interaction.reply(`Role not found.`);
			return;
		}
		await user.roles.add(role);

		await interaction.reply(`Role '${role.name}' has been given to '${user}'.`);
	},
};

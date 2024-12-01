const { SlashCommandBuilder } = require('discord.js');

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
		console.log("Atempt")
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

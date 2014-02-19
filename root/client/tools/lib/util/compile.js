function notDefaultSettings(answers)
{
	return answers["cfg.sections.compile.defaultSettings"] === false;
}



module.exports =
{
	prompt:
	{
		notDefaultSettings: notDefaultSettings
	}
};

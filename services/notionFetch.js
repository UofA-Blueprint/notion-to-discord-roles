async function fetchNotionDatabase(notionClient, databaseId) {
    //get data from notion as a json respons to api query
    try {
        const response = await notionClient.databases.query({
            database_id: databaseId,
        });
        return response;
    } catch (error) {
        console.error(error.body);
        throw new Error('Failed to fetch Notion database');
    }
}

function parseResults(res){
    //Select 10 random members from the database and print name + position
    let name = "";
    let pos = "";
    const numMembers = res.length;

    let output = `There are ${numMembers} members in the directory\n`;
    output = output.concat(`Here are 10 random members:\n`)

    let rowInd = 0;
    for (let i = 0; i < 10; i++) {
        rowInd = Math.floor(Math.random()*numMembers)
        name = res[rowInd].properties.Name.title[0].plain_text;
        pos = res[rowInd].properties['Current Role'].select.name;
        output = output.concat(`${name} (${pos})\n`)
    }
    return output
}

module.exports = {
    fetchNotionDatabase,
    parseResults
}
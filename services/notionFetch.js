async function fetchNotionDatabase(notionClient, databaseId) {
    //get data from notion as a json respons to api query
    let returnResponse = {"results": []}
    try {
        let response = await notionClient.databases.query({
            database_id: databaseId,
        });
        returnResponse.results.push(...response.results)
        while (response.has_more){
            response = await notionClient.databases.query({
                database_id: databaseId,
                start_cursor: response.next_cursor
            });
            returnResponse.results.push(...response.results)
        }

        return returnResponse;
    } catch (error) {
        console.error(error.body);
        throw new Error('Failed to fetch Notion database');
    }
}

function collectHandles(res){
    let handles = {}
    let handleRichText = ""
    for (row of res){
        handleRichText = row.properties["Discord Handle"].rich_text
        if (handleRichText.length > 0) {
            handles[handleRichText[0].plain_text] = [row.properties.Name.title[0].plain_text,
                row.properties['Current Role'].select.name]

        }


    }
    return handles
}

function parseResults(res){
    //Select 10 random members from the database and print name + position
    let name = "";
    let pos = "";
    let discHandle = "";
    let discHandleRichText = "";

    const numMembers = res.length;

    let output = `There are ${numMembers} members in the directory\n`;
    output = output.concat(`Here are 10 random members:\n`)

    let rowInd = 0;
    for (let i = 0; i < 10; i++) {
        rowInd = Math.floor(Math.random()*numMembers)
        name = res[rowInd].properties.Name.title[0].plain_text;
        pos = res[rowInd].properties['Current Role'].select.name;
        discHandleRichText = res[rowInd].properties["Discord Handle"].rich_text
        if (discHandleRichText.length > 0) {
            discHandle = discHandleRichText[0].plain_text
        } else {
            discHandle = "No Discord Handle Found"
        }
        output = output.concat(`${name} (${pos}) (${discHandle})\n`)
    }
    return output
}

module.exports = {
    fetchNotionDatabase,
    parseResults,
    collectHandles
}
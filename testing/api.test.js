require('dotenv').config()

const pageId = process.env.NOTION_PAGE_ID
const apiKey = process.env.NOTION_API_KEY
const { Client } = require("@notionhq/client")
const notion = new Client({ auth: apiKey })

async function fetchNotionDatabase(notionClient, databaseId) {
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

test('Check if Notion can be reached', async () => {
    const res = await fetchNotionDatabase(notion, pageId)
    expect(res.results.length).toBeGreaterThan(0);
});
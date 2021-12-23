import { Client } from "@notionhq/client";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export type Backlog = {
  id: string;
  title: string;
  category: string[];
  category2: string[];
  status: string;
  sprint: string;
  storyPoint: number;
};

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

export const getDatabaseData = async () =>
  // startCursor?: string, pageSize?: number
  {
    return notion.databases.query({
      // database_id: process.env.NOTION_DATABASE_ID || "",
      database_id: process.env.NOTION_DATABASE_ID || "",
      sorts: [
        {
          property: "StartDate",
          direction: "ascending",
        },
      ],
    });
    // 	sorts: [
    // 		{
    // 				property: 'date',
    // 				direction: 'descending',
    // 		},
    // ],
    // start_cursor: startCursor,
    // page_size: pageSize
  };

export const getBacklogs = async (
  databaseResponse: QueryDatabaseResponse,
  ids?: string[]
) => {
  const backlogContentPromises = [];
  if (ids) {
    ids.forEach((id) => {
      backlogContentPromises.push(
        notion.blocks.children.list({ block_id: id })
      );
    });
  } else {
    for (const result of databaseResponse.results) {
      backlogContentPromises.push(
        notion.blocks.children.list({ block_id: result.id })
      );
    }
  }
  const backlogContents = await Promise.all(backlogContentPromises);
  const backlogs: Backlog[] = backlogContents.map((backlogContent, i) => {
    const page = ids
      ? databaseResponse.results.find((result) => result.id === ids[i])
      : databaseResponse.results[i];
    // @ts-ignore
    const backlog: Backlog = {
      id: page?.id || "",
      // @ts-ignore
      // title: page.properties.Title.title[0].plain_text,
      title: page.properties.Title.title[0].plain_text,
      // @ts-ignore
      category: page.properties.Category.multi_select.map((v) => v.name),
      // @ts-ignore
      category2: page.properties.Category2.multi_select.map((v) => v.name),
      // @ts-ignore
      status: page.properties.Status.select.name,
      // @ts-ignore
      sprint: page.properties.Sprint.rich_text[0].plain_text,
      // @ts-ignore
      storyPoint: page.properties.StoryPoint.number,
      // title: page.properties.backlog.title[0].text.content,
    };
    return backlog;
  });
  return backlogs;
};

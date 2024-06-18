import os
from pprint import pprint

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from notion_client import Client

# Load environment variables from a .env file
load_dotenv()

app = FastAPI()


class NotionAPI:
    def __init__(self) -> None:
        self.database_id = "556009f17e6541b6b0efd29ad204f643" # Database ID
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))

    # Function to query a specific Notion database
    def query_notion_database(self):
        try:
            list_users_response = self.notion.databases.query(database_id=self.database_id)

            for i in list_users_response["results"]:
                if i["properties"]["Status"]["status"]["name"] == "Not started":
                    id = i["id"]
                    name = i["properties"]["Name"]["title"][0]["plain_text"]
                    description = i["properties"]["Description"]["rich_text"][0]["plain_text"]
                    time_start = i["properties"]["Date & Time"]["date"]["start"]
                    contact = i["properties"]["Contact"]["phone_number"]
                    method = i["properties"]["Method"]["select"]["name"]

                    
                    return id, name, description, time_start, contact, method

            raise ValueError("No tasks with status 'Not started' found.")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

    def set_status_done(self, result_id):
        try:
            self.notion.pages.update(
                page_id=result_id,
                properties={"Status": {"status": {"name": "Done"}}},
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {e}")


@app.get("/status")
def output():
    notion_api = NotionAPI()
    try:
        id, name, description, time_start, contact, method = notion_api.query_notion_database()
        notion_api.set_status_done(id)
        return {
            "id": id,
            "name": name,
            "description": description,
            "time_start": time_start,
            "contact": contact,
            "method": method,
        }
    except HTTPException as e:
        return {"error": e.detail}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

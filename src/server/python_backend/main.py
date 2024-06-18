import os
from pprint import pprint

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from notion_client import Client
from pydantic import BaseModel

# Load environment variables from a .env file
load_dotenv()

app = FastAPI()


class Task(BaseModel):
    name: str
    desc: str
    timestamp: str
    contact: str


class Id(BaseModel):
    id: str


class NotionAPI:
    def __init__(self) -> None:
        self.database_id = "906906ec9f9b46669b2708ba644f18be"  # Database ID
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))

    # Function to add a new task to the Notion database
    def add_task(self, name, desc, timestamp, contact):
        try:
            self.notion.pages.create(
                parent={"database_id": self.database_id},
                properties={
                    "Name": {"title": [{"plain_text": name}]},
                    "Description": {"rich_text": [{"plain_text": desc}]},
                    "Date & Time": {"date": {"start": timestamp}},
                    "Status": {"status": {"name": "Not started"}},
                    "Contact": {"phone_number": contact},
                    "Method": {"select": {"name": "Call"}},
                },
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

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


@app.post("/update_status")
def update_status(id: Id):
    notion_api = NotionAPI()
    try:
        notion_api.set_status_done(id)

        return {
            "id": id,
        }
    except HTTPException as e:
        return {"error": e.detail}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


@app.post("/add_task")
def add_task(name: Task, desc: Task, timestamp: Task, contact: Task):
    notion_api = NotionAPI()

    try:
        notion_api.add_task(name, desc, timestamp, contact)
        return True
    except HTTPException as e:
        return {"error": e.detail}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")

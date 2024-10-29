# this file is the backend for t3twilio
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from notion_client import Client
from pydantic import BaseModel, UUID4
import uuid


# Load environment variables from a .env file
load_dotenv()

app = FastAPI()


class Task(BaseModel):
    name: str
    description: str
    timeStamp: str
    contact: str


class Id(BaseModel):
    id: UUID4


class NotionAPI:
    def __init__(self) -> None:
        self.database_id = "906906ec9f9b46669b2708ba644f18be"
        self.notion = Client(auth=os.getenv("NOTION_TOKEN"))

    def add_task(self, name, description, timeStamp, contact):
        try:
            self.notion.pages.create(
                parent={"database_id": self.database_id},
                properties={
                    "Name": {"title": [{"type": "text", "text": {"content": name}}]},
                    "Description": {
                        "rich_text": [{"type": "text", "text": {"content": description}}]
                    },
                    "Date & Time": {"date": {"start": timeStamp}},
                    "Status": {"status": {"name": "Not started"}},
                    "Contact": {"phone_number": contact},
                    "Method": {"select": {"name": "Call"}},
                },
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

    def query_notion_database(self):
        try:
            list_users_response = self.notion.databases.query(
                database_id=self.database_id
            )

            for i in list_users_response["results"]:
                if i["properties"]["Status"]["status"]["name"] == "Not started":
                    id = i["id"]
                    name = i["properties"]["Name"]["title"][0]["plain_text"]
                    description = i["properties"]["Description"]["rich_text"][0][
                        "plain_text"
                    ]
                    time_start = i["properties"]["Date & Time"]["date"]["start"]
                    contact = i["properties"]["Contact"]["phone_number"]
                    method = i["properties"]["Method"]["select"]["name"]

                    return id, name, description, time_start, contact, method

            raise ValueError("No tasks with status 'Not started' found.")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

    def set_status_done(self, result_id: uuid.UUID):
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
        notion_api.set_status_done(id.id)

        return {
            "id": id.id,
        }
    except HTTPException as e:
        return {"error": e.detail}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


@app.post("/add_task")
def add_task(task: Task):
    notion_api = NotionAPI()

    try:
        notion_api.add_task(task.name, task.description, task.timeStamp, task.contact)
        return {"message": "Task added successfully"}
    except HTTPException as e:
        return {"error": e.detail}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
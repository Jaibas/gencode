import requests
import json
import pandas as pd
from auth_token import get_token
import uuid

# Constants
DEPLOYMENT_ID = "ee5047fc-d9bf-4f1f-bfde-6a6165cb2b1d"

def get_my_groups(token):
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {token}",
    }
    response = requests.get(
        "https://cs.prod.ows.jpmchase.net/onboarding/api/v1/mygroups", headers=headers
    )
    return response.json()

def summary_api_call(token, group):
    # Summarize the high level technical document into a very technical language so that we can generate code from it using an LL4. 
    # high level technical document (prompt):
    payload = {
        "deploymentId": "dec3200-14e5-40e1-8002-56d9c5eb2d6d",
        "flywheel": "extensive_group",
        "summaryLength": "Long"
    }
    
    response = requests.post(
        "https://cs.prod.jmchase.net/summarizer/api/v1/summary",
        headers={"Authorization": f"Bearer {token}"},
        json=payload,
    )
    
    return response.json()

def main():
    token = get_token()
    print("Token acquired successfully.")
    
    my_groups = get_my_groups(token)
    
    for group in my_groups["groups"]:
        print("My Groups: ", group)
    
    prompt = """# Frontend Components (REACT + TUDEDO):
    1) Landing Page/User Log In
    Purpose: The Landing Page/User Log In is the entry point for users to access the application, ensuring that only authorized users can gain access. This page is crucial for maintaining security and providing a seamless user experience.
    2) List Document Store API/Controller:
    Functionality:
    - This will be a GET API when the user requests to endpoint with proper authorization the logic fetches all the files in the S3 Bucket.
    - Multipart/Form-Data Handling: The API supports multipart/form-data encoding, which allows for the transmission of files along with other form data. This ensures that files and additional information are sent together in a single request."""
    
    chat_response = summary_api_call(token, prompt)
    print(chat_response)

if _name_ == "_main_":
    main()
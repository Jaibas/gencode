import requests
import json
import pandas as pd

def upload_file_to_chat(token, file, tenant_id):
    files = {'file': (file.filename, file.stream, file.mimetype)}

    response = requests.post(
        f"https://cs.prod.aws.jpmchase.net/chat/api/v2/tenants/{tenant_id}/upload-document",
        headers={"Authorization": f"Bearer {token}"},
        files=files,
    )

    print(response, "Response")
    if response.status_code == 200:
        print("File Uploaded Successfully")
    else:
        print("FAILED")
    
    return response.json()
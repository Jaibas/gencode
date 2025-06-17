import requests
import json
import pandas as pd

def get_token():
    ida_endpoint = "https://idag2.***.com"
    ida_payload = {
        "client_id": "**",
        "resource": "***",
        "username": "**",
        "password": "****",  # Sensitive data should not be hardcoded!
        "grant_type": "password",
        "scope": "user_impersonation"
    }

    ida_headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}

    d = requests.post(
        ida_endpoint + "/**", 
        ida_payload, 
        headers=ida_headers
    ).content

    d = json.loads(d)
    token = d['access_token']
    print("token:", token)
    return token
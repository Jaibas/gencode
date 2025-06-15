import requests
import json
import pandas as pd

def get_token():
    ida_endpoint = "https://idag2.jpmorganchase.com"
    ida_payload = {
        "client_id": "PC-111172-SID-248571-PROD",
        "resource": "JPMC:URI:RS-111172-1360196-LLMSUITE-PROD",
        "username": "ASIAPAC\\R747184",
        "password": "****",  # Sensitive data should not be hardcoded!
        "grant_type": "password",
        "scope": "user_impersonation"
    }

    ida_headers = {'Content-Type': 'application/json', 'Accept': 'application/json'}

    d = requests.post(
        ida_endpoint + "/adfs/oauth2/token", 
        ida_payload, 
        headers=ida_headers
    ).content

    d = json.loads(d)
    token = d['access_token']
    print("token:", token)
    return token
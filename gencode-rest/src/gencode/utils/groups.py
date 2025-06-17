import requests

def get_my_groups(token):
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": f"Bearer {token}",
    }
    response = requests.get(
        "https://***", headers=headers
    )
    return response.json()
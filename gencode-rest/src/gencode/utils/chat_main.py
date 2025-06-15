import requests
import json
import pandas as pd
from .auth_token import get_token
from .chat_file_upload import upload_file_to_chat
from .groups import get_my_groups

# Constants
DEPLOYMENT_ID = "ee5047fc-d9bf-4f1f-bfde-6a0165cb2b1d"

def tenant_id_from_group(token, group_name, chat_summ_flag):
    my_groups = get_my_groups(token)

    if chat_summ_flag == "chat":
        asset_name = "Managed JPMChat Service (GPT)"
    else:
        asset_name = "Managed Summarization Service (GPT)"

    for group in my_groups["Groups"]:
        if group.get("GroupName") == group_name:
            print(group.get("GroupName"))
            print("Filtered Group:", group)
            if group.get("GroupAsset"):
                for asset in group["GroupAsset"]:
                    if asset["Asset"].get("AssetName") == asset_name:
                        tenant_id = asset.get("TenantId")
                        print(f"Tenant ID for {asset_name} :", tenant_id)

    return tenant_id
    
def chat_api_call(conversation_id, token, prompt, file=""):
    extensive_prompt = prompt
    # Pick conversation id from qa.py upload
    if len(file) > 0:
        payload = {
            "ConversationId": conversation_id,
            "Message": extensive_prompt,
            "FileNames": [file],
        }
    else:
        payload = {
            "ConversationId": conversation_id,
            "Message": extensive_prompt,
        }

    response = requests.post(
        "https://cs.prod.aws.jpmchase.net/chat/api/v2/invoke?deployment_id={DEPLOYMENT_ID}&temperature=0.1",
        headers={"Authorization": f"Bearer {token}"},
        json=payload,
    )

    return response.json()
    
    
def lld_to_pseudo_code(file):
    try:
        prompt = f"""
You are a senior application architect with 20 years of experience.
Use the file to generate very detailed pseudocode.
Always encapsulate the pseudocode within <code> tags to clearly differentiate it from the explanatory text.
Each and every pseudocode should start with <code> tag and end it with </code> tag.
After generating the pseudocode, provide a detailed explanation of each step.
"""
        token = get_token()
        print("Token acquired successfully.")
        tenant_id = tenant_id_from_group(
            token, "Corporate Tech General Purpose", "chat"
        )
        fl_uld_res = upload_file_to_chat(token, file, tenant_id)
        conversation_id = fl_uld_res.get('ConversationId')
        file_name = fl_uld_res.get('Filename')
        print(fl_uld_res)
        file_response = chat_api_call(
            token=token, conversation_id=conversation_id, file=file_name, prompt=prompt
        )
        return lld_response
    except Exception as e:
        print(e)
        return str(e)
        
        
def query_on_pseudo_code(conversation_id, query):
    prompt = f""" 
    Understand teh question and then from the chats and the context give me the answer to the user.
    Question: {query}
    """
    token = get_token()
    llm_response = chat_api_call(
        token=token, conversation_id=conversation_id, prompt=prompt
    )
    return llm_response

def hld_to_lld():
    pass

def br_to_hld():
    pass
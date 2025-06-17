from flask import request
from gencode.utils.chat_main import lld_to_pseudo_code, query_on_pseudo_code, hld_to_lld, br_to_hld
from gencode.utils.util import create_response
from pynetacore import APIBlueprint as Blueprint, Tag
from pynetacore import jsonify

file_bp = Blueprint("file", _name_, url_prefix='/file')
file_bp_tag = Tag(name="File Management", description="File related APIs.")

@file_bp.post("/upload", summary="File upload", tags=[file_bp_tag])
def upload_file():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        file = request.files["file"]
        document_type = "lld"
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        if file:
            if document_type == 'lld':
                result = lld_to_pseudo_code(file)
            elif document_type == 'hld':
                result = hld_to_lld(file)
            elif document_type == 'business_req':
                result = br_to_hld(file)
            
            # Save in the file
            return create_response(200, "Pseudo code generated successfully", result)

    except Exception as e:
        return create_response(500, "Pseudo code could not be generated", str(e))
        
        
@file_bp.post("/query", summary="Chat", tags=[file_bp.tag])
def chat_on_code():
    try:
        if not request.is_json:
            return jsonify({"error": "No selected file"}), 400
        else:
            # Get the JSON data from the request
            json_payload = request.get_json()
            conversation_id = json_payload.get("conversation_id")
            query = json_payload.get("query")
            result = query_on_pseudo_code(conversation_id, query)
            return create_response(200, "Pseudo code generated successfully", result)
    except Exception as e:
        return create_response(500, "Pseudo code could not be generated", str(e))
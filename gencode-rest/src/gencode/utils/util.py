from flask import make_response, jsonify

def create_response(code, message, res):
    response = make_response(jsonify(
        {"statusCode": code, "message": message, "response": res}
    ))
    response.status_code = code
    return response
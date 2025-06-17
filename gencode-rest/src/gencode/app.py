from pynetacore import jsonify, Logger
from pynetacore import APIBlueprint as Blueprint, Tag

app = Blueprint("app", _name_, url_prefix='/api')

logger = Logger(_name_)

api_tag = Tag(name="Pyneta Base", description="Welcome API for users.")

@app.get("/", summary="Welcome to Pyneta", tags=[api_tag])
def welcome():
    """
    Base Endpoint - GET Request
    :return: A json object with status and message
    """
    welcome_msg = {'status': 'success', 'message': "Welcome to Pyneta"}
    logger.info(welcome_msg)
    return jsonify(welcome_msg)
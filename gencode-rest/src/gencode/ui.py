from pynetacore import Logger, send_from_directory
from pynetacore import APIBlueprint as Blueprint, Tag

ui = Blueprint("ui", _name_, static_folder='../static', static_url_path='/static')

logger = Logger(_name_)

api_ui_tag = Tag(name="Pyneta UI Blueprint", description="Welcome Frontend for users.")

@ui.get("/", summary="Welcome to Pyneta", tags=[api_ui_tag])
def welcome_frontend():
    return send_from_directory("../static", "index.html")
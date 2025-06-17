from pynetacore import Logger, Flask, ExceptionHandler, RegisterHealthEndpoint
from pynetacore import OpenAPI
from gencode_configs import app_config

Logger = Logger(_name_)

def create_app() -> Flask:
    """
    Creates an application instance to run
    :return: A Flask object
    """

    flask_app = OpenAPI(_name_, static_url_path='/', static_folder='../static')
    flask_app.config['SWAGGER_CONFIG'] = {'validatorUrl': None}
    flask_app.errorhandler(Exception)(ExceptionHandler)

    from .app import app
    flask_app.register_api(app)

    from .ui import ui
    from .files import file_processor
    flask_app.register_api(ui)
    flask_app.register_api(file_processor.file_bp)

    RegisterHealthEndpoint(flask_app)

    from pynetaadfs import ConfigureAdfs

    adfs_config = app_config['adfs']
    flask_app = ConfigureAdfs(adfs_config, flask_app, app_config['app']['base_url'])

    return flask_app
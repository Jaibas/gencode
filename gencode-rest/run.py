form sr.gencode import create_app
from pynetacore import prettyPyneta
from flask_cors import CORS

application = create_app()
CORS(application)

if __name__ == "__main__":
	import logging
	prettyPyneta("pyneta")
	log = logging.getLogger("werkzeug")
	log.setLevel(logging.INFO)
	application.run(port=8080, debug=True)
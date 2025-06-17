POETRY_VERSION=1.8.3
SSAP_DIR = ssap_bill_of_Materials
SRC_DIR = src/static

.PHONY: all
DEFAULT_GOAL:=help

.PHONY: clean
clean: ## Remove all cache, reports, coverage, distribution files and folders
rm -rf coverage
rm -rf requirements.txt
rm -rf .pytest_cache
rm -rf .env
rm -rf reports
rm -rf $(SSAP_DIR)

.PHONY: distclean
distclean: clean ## Remove all build and test artifacts and the virtual environment
rm -rf .venv

.PHONY: build
build: ## Create the virtual environment and install development dependencies
python -m poetry install

.PHONY: update
update: ## Update dependencies
python -m poetry update



.PHONY: test
test: ## Execute test cases
poetry run pytest

.PHONY: precommit
precommit:
pre-commit install
pre-commit run --all-files

.PHONY: cover
cover: ## Execute test cases and produce coverage reports
poetry run pytest --cov src/ --junitxml reports/xunit.xml \
--cov-report xml:reports/coverage.xml --cov-report term-missing

.PHONY: ssap
ssap: ## Generates requirements.txt file and required reports for SSAP
mkdir -p $(SSAP_DIR)
pip install poetry-plugin-export
poetry export -f requirements.txt --without-hashes --output $(SSAP_DIR)/pip_depen

.PHONY: ci-prebuild
ci-prebuild: ## Installs or upgrades environment dependencies like Poetry
python -m pip install poetry==$(POETRY_VERSION) setuptools
cat /dev/null > requirements.txt
.PHONY: package
package: ## Create deployable whl packages for python project

.PHONY: ci
ci: clean build package ## Runs clean, build, and package

.PHONY: format
format: ## Formats the Python Files
ruff format .

.PHONY: lint
lint: ## Lint all files
ruff check .

.PHONY: help
help: ## Show make target documentation
@awk -F ':' '## /^[ \t] +?:.*?##/ { \
printf "\033[36m%-30s\033[0m %s\n", $S1, $SNF \
' $(MAKEFILE_LIST)
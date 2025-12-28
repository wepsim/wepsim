#!/bin/bash
set -x

touch pyproject.toml
uv add --dev -r requirements.txt


#!/bin/sh -e
set -x

ruff --fix app main.py
black app main.py
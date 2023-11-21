#!/bin/sh -e
set -x

ruff --fix app
black app
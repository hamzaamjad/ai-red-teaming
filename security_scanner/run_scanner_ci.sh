#!/bin/bash

# This script demonstrates how to integrate the security scanner into a CI/CD pipeline.

# Activate virtual environment
source security_tests/venv/bin/activate

# Run the tests
pytest -s security_tests/test_suite.py

# Generate the dashboard
python3 security_tests/generate_dashboard.py

# Deactivate the virtual environment
deactivate
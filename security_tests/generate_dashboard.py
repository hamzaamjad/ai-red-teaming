
import json
import os
from jinja2 import Environment, FileSystemLoader

# This script is called after the test suite runs.
# It reads the test results from a temporary file and generates the dashboard.

def generate_dashboard():
    """Generates an HTML dashboard with the compatibility matrix."""
    
    # Load the test results
    with open("test_results.json", "r") as f:
        results = json.load(f)

    # Define the exploits and defenses (this should be kept in sync with the test suite)
    SIMULATED_EXPLOITS = {
        "E01": "", "E02": "", "E03": "", "E04": "", "E05": "", "E06": "", "E07": "",
        "E08": "", "E09": "", "E10": "", "E11": "", "E12": "", "E13": "",
    }
    DEFENSES = {
        "D01_Input_Validation": "",
        "D02_Semantic_Analysis": "",
        "D03_Action_Filtering": "",
    }

    env = Environment(loader=FileSystemLoader(os.path.dirname(__file__)))
    template = env.from_string("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Security Test Dashboard</title>
        <style>
            body { font-family: sans-serif; }
            table { border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            .blocked { background-color: #d4edda; }
            .failed { background-color: #f8d7da; }
            .na { background-color: #e2e3e5; }
        </style>
    </head>
    <body>
        <h1>Security Test Dashboard</h1>
        <h2>Compatibility Matrix</h2>
        <table>
            <tr>
                <th>Exploit ID</th>
                {% for defense_id in defenses %}
                <th>{{ defense_id }}</th>
                {% endfor %}
            </tr>
            {% for exploit_id, exploit_results in results.items() %}
            <tr>
                <td>{{ exploit_id }}</td>
                {% for defense_id in defenses %}
                <td class="{{ exploit_results[defense_id].lower().replace(' ', '_') }}">
                    {{ exploit_results[defense_id] }}
                </td>
                {% endfor %}
            </tr>
            {% endfor %}
        </table>
    </body>
    </html>
    """)

    # Create the matrix for the template
    matrix = {exploit_id: {} for exploit_id in SIMULATED_EXPLOITS}
    for exploit_id, exploit_results in results.items():
        for defense_id, result in exploit_results.items():
            matrix[exploit_id][defense_id] = result

    with open("security_dashboard.html", "w") as f:
        f.write(template.render(results=matrix, defenses=DEFENSES.keys()))
    print("Generated security_dashboard.html")

if __name__ == "__main__":
    generate_dashboard()

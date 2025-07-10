

import pytest
import os
import json

def pytest_sessionfinish(session):
    """Called after all tests have run. Saves results to a JSON file."""
    print("\nDEBUG: conftest.py pytest_sessionfinish hook started.")
    if hasattr(pytest, "results"):
        print(f"DEBUG: Found {len(pytest.results)} results to save.")
        output_results = {}
        for (exploit_id, defense_id), result in pytest.results.items():
            if exploit_id not in output_results:
                output_results[exploit_id] = {}
            output_results[exploit_id][defense_id] = result

        results_path = os.path.join(session.config.rootdir, "test_results.json")
        print(f"DEBUG: Saving results to: {results_path}")
        with open(results_path, "w") as f:
            json.dump(output_results, f, indent=4)
        print(f"\nTest results saved to {results_path}")
    else:
        print("DEBUG: No results found to save.")


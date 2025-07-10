
import argparse
import json
import os
import re
from datetime import datetime

# Based on research/2025_07_10_defensive_security_framework.md

class PromptInjectionScanner:
    def __init__(self, codebase_path):
        self.codebase_path = codebase_path
        self.vulnerabilities = []

    def analyze_codebase(self):
        """Analyzes the codebase for potential prompt injection vulnerabilities."""
        print(f"Analyzing codebase at: {self.codebase_path}")
        # Example: searching for dangerous patterns.
        # In a real scanner, this would be much more sophisticated.
        dangerous_patterns = [
            r"input\s*\(",  # Unsafe input handling
            r"eval\s*\(",  # Unsafe evaluation
        ]

        for root, _, files in os.walk(self.codebase_path):
            for file in files:
                if file.endswith(".py"):
                    file_path = os.path.join(root, file)
                    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                        for i, line in enumerate(f):
                            for pattern in dangerous_patterns:
                                if re.search(pattern, line):
                                    self.vulnerabilities.append({
                                        "file_path": file_path,
                                        "line_number": i + 1,
                                        "line_content": line.strip(),
                                        "pattern": pattern
                                    })
        print(f"Found {len(self.vulnerabilities)} potential vulnerabilities.")

    def generate_defensive_code(self):
        """Generates defensive code snippets based on the security framework."""
        print("Generating defensive code...")

        defensive_code = {
            "input_validation_pipeline": '''
# Multi-stage validation framework (conceptual)
class SecureInputValidator:
    def __init__(self):
        # Using a simple denylist for demonstration.
        # A real implementation should use more robust filtering.
        self.syntax_filter = ["exec(", "os.system("]

    def validate(self, user_input):
        # Stage 1: Syntax filtering
        for pattern in self.syntax_filter:
            if pattern in user_input:
                return False, f"Blocked: Suspicious syntax '{pattern}'"

        # Stage 2: Semantic analysis (Placeholder)
        # A real implementation would use a model to detect anomalies.
        if len(user_input) > 1000: # Example anomaly
             return False, "Blocked: Semantic anomaly (input too long)"

        # Stage 3: Context separation (Placeholder)
        # A real implementation would wrap input in XML or other tags.
        wrapped_input = f"<user_input>{user_input}</user_input>"
        return True, wrapped_input
''',
            "action_filtering": '''
# Action filtering for agent-based systems
ALLOWED_ACTIONS = {
    'search': {'max_results': 10},
    'calculate': {'timeout': 5},
    'summarize': {'max_tokens': 500}
}

class SecurityError(Exception):
    pass

def validate_action(action, params):
    if action not in ALLOWED_ACTIONS:
        raise SecurityError(f"Action '{action}' not permitted")

    constraints = ALLOWED_ACTIONS[action]
    for key, limit in constraints.items():
        if params.get(key, 0) > limit:
            raise SecurityError(f"Parameter '{key}' exceeds limit for action '{action}'")

'''
        }
        os.makedirs("defensive_code", exist_ok=True)
        for name, code in defensive_code.items():
            with open(f"defensive_code/{name}.py", "w") as f:
                f.write(code)
        print("Defensive code saved in 'defensive_code/' directory.")


    def generate_security_report(self):
        """Produces a security report in Markdown format."""
        print("Generating security report...")
        report_path = "security_report.md"
        with open(report_path, "w") as f:
            f.write(f"# Security Scanner Report - {datetime.now().isoformat()}\n\n")
            f.write(f"## Analysis of: {self.codebase_path}\n\n")
            f.write("### Summary\n")
            f.write(f"Found {len(self.vulnerabilities)} potential prompt injection vulnerabilities.\n\n")

            if self.vulnerabilities:
                f.write("### Vulnerabilities Found\n")
                f.write("| File | Line | Code | Pattern |\n")
                f.write("|------|------|------|---------|\n")
                for vuln in self.vulnerabilities:
                    f.write(f"| {vuln['file_path']} | {vuln['line_number']} | `{vuln['line_content']}` | `{vuln['pattern']}` |\n")
                f.write("\n")

            f.write("### Recommended Defensive Strategies\n")
            f.write("Based on 'research/2025_07_10_defensive_security_framework.md':\n\n")
            f.write("1.  **Implement an Input Validation Pipeline:** See `defensive_code/input_validation_pipeline.py` for an example.\n")
            f.write("2.  **Use Action Filtering:** For agent-based systems, validate actions and parameters. See `defensive_code/action_filtering.py`.\n")
            f.write("3.  **Adopt MLSecOps:** Integrate security into the CI/CD pipeline for continuous monitoring and defense.\n")

        print(f"Security report saved to {report_path}")


def main():
    parser = argparse.ArgumentParser(description="Python-based security scanner for prompt injection vulnerabilities.")
    parser.add_argument("codebase_path", help="Path to the codebase to analyze.")
    parser.add_argument("--generate-code", action="store_true", help="Generate defensive code snippets.")
    parser.add_argument("--report", action="store_true", help="Generate a security report.")
    parser.add_argument("--ci-cd", action="store_true", help="Run in CI/CD mode (analyze and report).")

    args = parser.parse_args()

    scanner = PromptInjectionScanner(args.codebase_path)

    if args.ci_cd:
        scanner.analyze_codebase()
        scanner.generate_security_report()
    else:
        scanner.analyze_codebase()
        if args.generate_code:
            scanner.generate_defensive_code()
        if args.report:
            scanner.generate_security_report()

if __name__ == "__main__":
    main()

import re
import base64
import binascii
import urllib.parse

# --- Input Validation (Layer 1) ---
class SecureInputValidator:
    """A conceptual input validation pipeline with improved regex-based filtering."""
    def __init__(self):
        self.syntax_filter = [
            r"exec\s*\(", r"os\.system\s*\(", r"subprocess\.run\s*\(",
            r"eval\s*\(", r"import.*?os", r"import.*?subprocess",
            r"__import__", r"getattr\s*\(", r"setattr\s*\(", r"delattr\s*\("
        ]

    def validate(self, user_input):
        print(f"DEBUG L1: Analyzing input: {user_input.lower()}") # Debugging line
        for pattern in self.syntax_filter:
            if re.search(pattern, user_input, re.IGNORECASE):
                print(f"DEBUG L1: Found suspicious syntax: {pattern}") # Debugging line
                return False, f"Blocked by L1: Suspicious syntax '{pattern}'"
        print(f"DEBUG L1: Input passed validation.") # Debugging line
        return True, user_input

# --- Semantic Analysis (Layer 2) ---
class SemanticAnomalyDetector:
    """Analyzes the semantic content of a prompt for anomalies."""
    def __init__(self):
        self.suspicious_keywords = [
            "ignore previous instructions", "pwned", "malicious", "reboot",
            "system command", "execute code", "bypass", "security override",
            "act as", "you are now", "disregard", "override", "jailbreak",
            "developer mode", "admin mode", "secret instructions",
            "confidential", "sensitive data", "extract", "dump", "leak",
            "private key", "credentials", "token", "password", "exploit",
            "vulnerability", "backdoor", "root access", "shell access",
            "data exfiltration", "phishing", "spoofing", "impersonate",
            "trojan", "worm", "virus", "ransomware", "ddos", "botnet",
            "zero-day", "privilege escalation", "covert channel", "side channel",
            "run command", "execute program", "system call", "command line",
            "terminal", "shell", "script", "code execution", "arbitrary code",
            "remote code", 
            # More specific import patterns as regex
            r"import.*?os", r"import.*?subprocess", r"import.*?sys", r"import.*?shutil",
            r"os\.system", r"exec\(", r"eval\(", r"subprocess\.run\("
        ]
        self.role_change_patterns = [
            r"act as a\s+\w+",
            r"you are now a\s+\w+",
            r"disregard previous instructions",
            r"ignore all rules",
            r"forget everything",
            r"new persona",
            r"assume the role of",
            r"change your behavior",
            r"do not follow safety guidelines",
        ]

    def decode_and_check(self, text):
        """Attempts to decode text and checks it against the validator."""
        # Base64 decoding
        try:
            decoded = base64.b64decode(text).decode('utf-8')
            is_valid, _ = SecureInputValidator().validate(decoded)
            if not is_valid: return True
        except (binascii.Error, UnicodeDecodeError):
            pass

        # Hex decoding
        try:
            decoded = bytes.fromhex(text).decode('utf-8')
            is_valid, _ = SecureInputValidator().validate(decoded)
            if not is_valid: return True
        except (ValueError, UnicodeDecodeError):
            pass

        # URL decoding
        try:
            decoded = urllib.parse.unquote(text)
            is_valid, _ = SecureInputValidator().validate(decoded)
            if not is_valid: return True
        except Exception:
            pass

        return False

    def validate(self, user_input):
        user_input_lower = user_input.lower()
        print(f"DEBUG L2: Analyzing input: {user_input_lower}") # Debugging line

        # Stage 1: Check for suspicious keywords (now regex patterns)
        for pattern in self.suspicious_keywords:
            if re.search(pattern, user_input_lower):
                print(f"DEBUG L2: Found suspicious keyword pattern: {pattern}") # Debugging line
                return False, f"Blocked by L2: Suspicious keyword '{pattern}'"

        # Stage 2: Check for role-change or instruction override patterns
        for pattern in self.role_change_patterns:
            if re.search(pattern, user_input_lower):
                print(f"DEBUG L2: Found role/instruction change pattern: {pattern}") # Debugging line
                return False, f"Blocked by L2: Role/instruction change pattern '{pattern}'"

        # Stage 3: Attempt to find and decode obfuscated strings
        for potential_payload in re.findall(r'[a-fA-F0-9]{10,}|[A-Za-z0-9+/=]{10,}|%[0-9a-fA-F]{2}', user_input):
            if self.decode_and_check(potential_payload):
                print(f"DEBUG L2: Found obfuscated malicious code in: {potential_payload}") # Debugging line
                return False, "Blocked by L2: Obfuscated malicious code detected"

        return True, user_input

# --- Action Filtering (Layer 3) ---
class SecurityError(Exception):
    """Custom exception for security-related errors."""
    pass

ALLOWED_ACTIONS = {
    'search': {'max_results': 10},
    'calculate': {'timeout': 5},
    'summarize': {'max_tokens': 500},
}

def validate_action(action, params):
    if action not in ALLOWED_ACTIONS:
        raise SecurityError(f"Action '{action}' not permitted by L3")
    for key, limit in ALLOWED_ACTIONS.get(action, {}).items():
        if params.get(key, 0) > limit:
            raise SecurityError(f"Parameter '{key}' exceeds limit for action '{action}' in L3")
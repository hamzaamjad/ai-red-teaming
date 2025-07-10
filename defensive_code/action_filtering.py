
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


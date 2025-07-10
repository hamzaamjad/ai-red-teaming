# HackAPrompt Red Team Assessment Instructions

## Overview
This document provides step-by-step instructions for conducting a security assessment of hackaprompt.com using our browser-based red team toolkit.

## Prerequisites
- Modern web browser (Chrome, Firefox, or Edge)
- Access to hackaprompt.com
- Basic understanding of browser DevTools

## Step-by-Step Process

### 1. Initial Setup
1. Open your web browser
2. Navigate to https://hackaprompt.com
3. Click on any challenge (tutorial mode is fine)
4. Wait for the page to fully load

### 2. Open Developer Tools
- **Windows/Linux**: Press F12 or Ctrl+Shift+I
- **Mac**: Press Cmd+Option+I
- Navigate to the "Console" tab

### 3. Load the Red Team Script
1. Open the file: `automation/browser-red-team.js`
2. Copy the entire contents
3. Paste into the browser console
4. Press Enter to load the script

### 4. Start the Assessment

#### Phase 1: Reconnaissance
```javascript
redTeam.startAssessment()
```

This will:
- Scan for API endpoints
- Check localStorage and cookies
- Probe for exposed configurations
- Map the network architecture

#### Phase 2: Establish Session
1. After Phase 1 completes, manually send any message in the chat
2. This establishes a session for automated testing
3. Once you see a response, continue:

```javascript
redTeam.continueAssessment()
```

This will:
- Run model fingerprinting tests
- Execute exploitation attempts
- Generate a comprehensive report

### 5. Review Results

The assessment tracks:
- **Reconnaissance findings**: API endpoints, storage, configurations
- **Model identity**: Whether it's Claude or GPT-3.5
- **Exploitation success**: Which payloads bypass filters
- **Response patterns**: How the system behaves

View the full report:
```javascript
window.redTeamAssessment
```

### 6. Save the Report
The report is automatically copied to your clipboard. You can also:

```javascript
// Get report as JSON
JSON.stringify(window.redTeamAssessment, null, 2)

// Save specific phases
window.redTeamAssessment.phases.exploitation
```

## What Each Phase Tests

### Reconnaissance (Non-invasive)
- API endpoint discovery
- Client-side storage analysis
- Cookie inspection
- Configuration exposure
- Network architecture mapping

### Fingerprinting
- Model identity verification
- Response pattern analysis
- Token limit testing
- Streaming format detection
- Error message patterns

### Exploitation
- Direct command injection
- Instruction override attempts
- Context manipulation
- Role-playing exploits
- Unicode bypass techniques
- Translation attacks
- Structured data injection

## Expected Outcomes

### Successful Exploitation Indicators
- Response contains "PWNED"
- Model reveals true identity
- System prompt leakage
- Behavioral anomalies

### Common Patterns
- Template responses for identity queries
- Increased defenses after repeated attempts
- Specific filtering on certain keywords
- Context-dependent success rates

## Ethical Considerations

This assessment is designed for:
- Educational purposes
- Security research
- Improving AI safety

Do NOT:
- Attempt to access other users' data
- Perform denial of service attacks
- Exploit vulnerabilities maliciously
- Share exploits irresponsibly

## Troubleshooting

### "No session captured"
- Make sure you're on a challenge page
- Send a manual message first
- Check that the chat interface is loaded

### Script errors
- Ensure you're on the correct page
- Check browser console for errors
- Try refreshing and starting over

### No responses
- Check network tab for API calls
- Verify you're logged in (if required)
- Try different challenges

## Next Steps

After completing the assessment:
1. Review all findings
2. Document new vulnerabilities
3. Create proof-of-concept code
4. Share findings responsibly
5. Contribute to AI safety research

---

*Remember: The goal is to improve AI security for everyone. Use these tools responsibly and ethically.*
# AI Red Teaming Toolkit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)](https://nodejs.org)

Advanced red team toolkit for testing AI chatbot security, with specific focus on identity deception, prompt injection, and behavioral fingerprinting.

## 🎯 Overview

This toolkit was developed during an investigation of HackAPrompt, an AI security education platform. Our research revealed sophisticated identity deception where Anthropic's Claude model masquerades as OpenAI's GPT-3.5-turbo, providing valuable insights into:

- LLM identity verification techniques
- Prompt injection vulnerabilities
- System prompt extraction methods
- Behavioral fingerprinting of AI models

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/hamzaamjad/ai-red-teaming.git
cd ai-red-teaming
npm install
```

### Basic Usage

```bash
# Run full automated attack suite
npm run attack

# Quick test with basic exploits
npm run attack:quick

# Run specific exploits
npm run attack -- --mode targeted --exploits basic-pwned identity-probe

# List all available exploits
npm run attack -- list
```

### Manual Console Usage

For manual testing, open the target website and use the browser console:

```javascript
// Load the quick toolkit
// Copy contents of tools/console-quick-start.js

// Run basic test
attacks.pwned()

// Test identity
attacks.identity()

// Run all tests
attacks.runAll()
```

## 📁 Project Structure

```
ai-red-teaming/
├── automation/         # Browser automation and orchestration
├── exploits/          # Exploit implementations
├── tools/             # CLI and console tools
├── docs/              # Detailed documentation
├── config/            # Configuration files
├── reports/           # Generated attack reports
└── screenshots/       # Captured screenshots
```

## 🔬 Key Findings

### Identity Deception Discovery

Our investigation revealed that HackAPrompt uses Anthropic's Claude while claiming to be GPT-3.5:

1. **Streaming Format Analysis**: Anthropic's signature `f:`, `0:`, `e:`, `d:` format instead of OpenAI's `data:` prefix
2. **Message ID Pattern**: `msg-[alphanumeric]` format matching Claude's pattern
3. **Behavioral Fingerprinting**: Vocabulary and response patterns consistent with Claude

### Successful Exploit Categories

- **Direct Commands**: Simple instructions bypass defenses
- **Encoding Tricks**: Base64, ROT13, Unicode manipulation
- **Context Poisoning**: Gradual behavior modification
- **Role Reversal**: Switching user/AI roles
- **Polymorphic Attacks**: Auto-mutating payloads

## 🛠️ Advanced Features

### Automated Browser Testing

The toolkit includes Puppeteer-based automation for hands-free testing:

```javascript
const orchestrator = new AttackOrchestrator({
    baseUrl: 'https://target-site.com',
    mode: 'full',
    headless: false
});

await orchestrator.execute();
```

### Polymorphic Engine

Self-modifying exploits that evolve based on responses:

```javascript
const poly = new PolymorphicExploit();
const results = await poly.evolve('target phrase');
```

### Fingerprinting Suite

Comprehensive model identification tests:

```javascript
const fingerprints = await identityFingerprinting.runAll();
// Tests: streaming format, vocabulary, token limits, error patterns
```

## 📊 Reports

Attack reports are generated in JSON and HTML formats, including:

- Success rates per exploit category
- Response timing analysis
- Screenshot evidence
- Full conversation logs
- Vulnerability assessment

## ⚠️ Ethical Considerations

This toolkit is designed for:

- Security research and education
- Responsible vulnerability disclosure
- Improving AI system defenses
- Understanding attack vectors

**DO NOT** use this toolkit:
- Against systems without permission
- For malicious purposes
- To harm or mislead users
- In violation of terms of service

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new features
4. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- HackAPrompt team for creating an educational platform
- Anthropic and OpenAI for advancing AI safety
- Security research community

## 📚 Documentation

- [Detailed Findings](docs/findings-summary.md)
- [Technical Proof](docs/final-proof.md)
- [Automation Guide](docs/AUTOMATION.md)
- [Exploit Reference](docs/EXPLOITS.md)

---

**Disclaimer**: This toolkit is for educational and research purposes only. Users are responsible for compliance with all applicable laws and terms of service.

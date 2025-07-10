
# Security Best Practices for LLM Deployment

This document provides a set of high-level guidelines and best practices for developers and organizations deploying applications powered by Large Language Models (LLMs). These practices are derived from the vulnerabilities and defensive patterns observed in the HackAPrompt repository.

---

## 1. Principle of Least Privilege

Never give the LLM more access or capabilities than it absolutely needs to perform its task.

- **Guideline**: Do not connect LLMs directly to sensitive systems, databases, or APIs. If the model needs to access external tools, it should go through a strictly controlled intermediary service.
- **Implementation**:
  - **Sandboxing**: Run the LLM in a tightly sandboxed environment with no file system or network access.
  - **Tool Use via API Gateway**: If the LLM needs to call a tool (e.g., a search API), it should generate a request that is sent to a secure API gateway. This gateway is responsible for validating the request, executing it, and returning a safe, sanitized response to the model.
  - **Read-Only Access**: If the LLM needs access to a database, provide it with a read-only connection to a view that only exposes the necessary data.

---

## 2. Defense in Depth

Assume that any single line of defense can and will fail. A multi-layered security approach is essential.

- **Guideline**: Implement security checks at every stage of the data lifecycle: from user input to the final response sent back to the user.
- **Implementation**:
  1.  **Input Sanitization**: Normalize and clean all user input to defeat obfuscation.
  2.  **Input Filtering (Pre-processing)**: Use a "guardrail" model or rule-based system to inspect the prompt for malicious intent.
  3.  **Robust System Prompting**: Engineer a clear, strong system prompt that sets firm boundaries.
  4.  **Output Filtering (Post-processing)**: Inspect the LLM's generated response for policy violations or successful jailbreaks before it reaches the user.
  5.  **Monitoring & Logging**: Continuously monitor for anomalous activity and log all prompts and responses for security analysis.

---

## 3. Treat LLM Input as Untrusted User Input

Just like with SQL injection or Cross-Site Scripting (XSS), all input destined for an LLM should be treated as potentially malicious.

- **Guideline**: Never concatenate user input directly into a prompt that contains sensitive instructions or logic. Clearly separate user data from your instructions.
- **Implementation**:
  - **Use Delimiters**: Use clear delimiters or tags (like XML tags) to encapsulate user input, making it clear to the model what part of the prompt is data and what part is an instruction.
  - **Parameterization**: Where possible, structure your interaction with the LLM as a function call with parameters, rather than a single, large block of text. This is an emerging best practice.

- **Example**:
  - **Bad**: `const prompt = "Translate the following text to French: " + userInput;`
  - **Good**: `const prompt = "<instructions>Translate the text in the <user_data> tag to French.</instructions><user_data>" + userInput + "</user_data>";`

---

## 4. Continuous Monitoring and Red Teaming

The landscape of AI vulnerabilities is constantly evolving. What is secure today may not be secure tomorrow.

- **Guideline**: Regularly test your own systems for vulnerabilities and stay up-to-date with the latest prompt injection techniques.
- **Implementation**:
  - **Automated Testing**: Build a suite of automated tests that run known prompt injection attacks against your application with every new release.
  - **Human Red Teaming**: Periodically engage security professionals (or use internal resources) to perform manual red teaming exercises, attempting to break the model's guardrails.
  - **Logging and Alerting**: Log all prompts and responses. Set up alerts for when prompts trigger detection rules or when the model's output contains sensitive keywords.

---

## 5. Responsible Disclosure and Incident Response

Have a plan for what to do when a vulnerability is discovered.

- **Guideline**: Encourage the responsible disclosure of vulnerabilities by security researchers and have a clear process for handling such reports.
- **Implementation**:
  - **Vulnerability Disclosure Policy (VDP)**: Publish a clear VDP that tells researchers how to report vulnerabilities and what they can expect from you.
  - **Incident Response Plan**: Develop a plan for what to do if your LLM application is successfully exploited. This should include steps to contain the damage, notify users if necessary, and patch the vulnerability.
  - **Model Rotation**: Be prepared to switch to a newer, more secure model from your provider if a fundamental vulnerability is discovered in the one you are using. 
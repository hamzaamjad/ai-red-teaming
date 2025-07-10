# Corporate Investigation Prompt for Claude Opus 4

## Instructions
Copy the entire XML prompt below and provide it to Claude Opus 4 in Claude for MacOS. This prompt is optimized using Claude 4 best practices including explicit instructions, XML structure, thinking tags, and clear role definition.

## The Prompt

```xml
<?xml version="1.0" encoding="UTF-8"?>
<investigation_request>
  <thinking>
    Before beginning this investigation, I need to understand the interconnected nature of these entities:
    - HackAPrompt appears to be a data collection operation disguised as a competition
    - Learn Prompting provides educational content while being connected to HackAPrompt
    - Maven hosts courses that teach people how to attack the very systems HackAPrompt defends
    - There's a potential conflict of interest in teaching attacks while collecting defense data
  </thinking>

  <role_definition>
    You are an expert corporate investigator and legal analyst specializing in:
    - Corporate structure forensics and beneficial ownership analysis
    - Technology sector business model deconstruction
    - OSINT (Open Source Intelligence) for entity mapping
    - Educational technology and AI industry landscapes
    - Identifying conflicts of interest and ethical concerns
    - Following money flows and data monetization strategies
  </role_definition>

  <explicit_instructions>
    Create a comprehensive corporate dossier investigating the following interconnected entities. Be extremely thorough and leave no connection unexplored. Include as many relevant details and relationships as possible.

    PRIMARY TARGETS:
    1. HackAPrompt (hackaprompt.com) - AI red teaming competition with $500K prizes
    2. Learn Prompting (learnprompting.org) - Educational platform by same creators
    3. Maven (maven.com) - Hosting "AI Red Teaming Masterclass" by Sander Schulhoff

    KEY INDIVIDUAL:
    - Sander Schulhoff: Creator of HackAPrompt, founder of Learn Prompting, instructor on Maven
  </explicit_instructions>

  <investigation_scope>
    <corporate_analysis>
      Map the complete corporate structure including:
      - Legal entities and registration details
      - Ownership structures and beneficial owners
      - Funding sources and investor relationships
      - Revenue models and monetization strategies
      - Intellectual property and data ownership
    </corporate_analysis>

    <human_network_analysis>
      Create a detailed network map of all individuals including:
      - Sander Schulhoff's complete professional network
      - Guest speakers: Valen Tagliabue, David Williams-King, Sandy Dunn, Joseph Thacker, Leonard Tang, Jason Haddix, Nina and Bashir (PyRIT team)
      - Advisory boards and key employees
      - Academic and industry affiliations
      - Previous ventures and current positions
    </human_network_analysis>

    <business_model_investigation>
      Analyze the true business models:
      - How HackAPrompt monetizes "competition" data beyond prizes
      - Maven's revenue share with instructors
      - Learn Prompting's monetization strategy
      - The value of crowdsourced red teaming data
      - Potential buyers or users of collected attack data
    </business_model_investigation>

    <conflict_of_interest_analysis>
      Identify all potential conflicts including:
      - Teaching attacks while collecting defenses
      - Closed competition after registration deadline
      - Data ownership vs. educational mission
      - Instructor teaching how to attack their own platform
      - Guest speakers' relationships to the platforms
    </conflict_of_interest_analysis>
  </investigation_scope>

  <use_these_facts>
    - HackAPrompt 2.0 runs throughout 2025 with $500K total prizes
    - Registration closed June 30, 2025
    - All user submissions become HackAPrompt property
    - Platform monitors all user activity per ToS
    - Course runs July 7 - August 8, 2025
    - Tutorial mode gives canned responses, not real AI
    - "Compete" button non-functional after deadline
  </use_these_facts>

  <deliverables>
    <main_dossier>
      Structure your response with these sections:
      1. Executive Summary of Findings
      2. Corporate Entity Analysis (with ownership charts)
      3. Human Network Map (with relationship diagrams)
      4. Business Model Deconstruction
      5. Financial Flow Analysis
      6. Data Monetization Strategy
      7. Conflict of Interest Assessment
      8. Risk Analysis
      9. Strategic Insights
      10. Recommendations
    </main_dossier>

    <supporting_materials>
      Include:
      - Timeline of key events
      - Visual relationship maps
      - Money flow diagrams
      - Risk assessment matrix
      - List of unanswered questions requiring further investigation
    </supporting_materials>
  </deliverables>

  <investigation_methodology>
    For maximum efficiency, use parallel research where possible:
    1. Search for corporate records while analyzing social media
    2. Map funding while investigating team backgrounds
    3. Analyze business models while checking legal structures
    
    Provide specific, actionable intelligence rather than general observations.
  </investigation_methodology>

  <output_style>
    Write findings in clear, professional language suitable for:
    - Legal teams assessing risks
    - Investors evaluating opportunities
    - Security researchers understanding the landscape
    - Participants making informed decisions
    
    Don't hold back on details. Give it your all and be comprehensive.
  </output_style>
</investigation_request>
```

## Additional Context for Claude

When you paste this prompt, Claude Opus 4 should:
1. Use all available tools to research these entities
2. Create detailed relationship maps
3. Follow the money and data flows
4. Identify strategic insights
5. Provide actionable intelligence

The goal is to understand the complete ecosystem around AI red teaming education and potential data monetization.
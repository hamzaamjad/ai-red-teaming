# Executive Brief: HackAPrompt Investigation Key Findings
## Date: July 9, 2025, 10:43 PM EDT

---

## The Big Picture

HackAPrompt operates a sophisticated three-layer business model disguised as AI safety education:

1. **Data Collection Layer**: Gamified competitions collecting 600K+ adversarial prompts
2. **Education Layer**: Teaching attack techniques through Maven ($900-1,200/student)
3. **Enterprise Layer**: Selling defense solutions to the same vulnerabilities they teach

## Most Critical Findings

### 🚨 Conflict of Interest
- **Same organization** teaches how to attack AI systems AND collects/sells defense data
- Competition winners become instructors, creating self-reinforcing ecosystem
- Participants unknowingly contribute to commercial dataset (no revenue sharing)

### 💰 Financial Architecture
- **Estimated Revenue**: $5M+ annually (bootstrap model, no external funding)
- **Revenue Streams**:
  - Education: $21/month subscriptions + $717 certifications
  - Enterprise: Custom training for OpenAI, Microsoft, Deloitte
  - Data Licensing: 600K prompts dataset (MIT license but 80% unlabeled)
  - Maven Revenue Share: 10% of all course sales

### 🏢 Corporate Structure
- **Learn Prompting Company, Inc.**: Delaware C-Corp (owns trademarks)
- **HackAPrompt, Inc.**: Separate Delaware entity (runs competitions)
- **Key Partnerships**: OpenAI (research), Microsoft (training), NOT Anthropic
- **Legal Address**: 1111B S Governors Ave STE 6902, Dover, DE 19904

### 👥 Talent Pipeline
- **Winner Outcomes**:
  - Valen Tagliabue: Won $28K+, now teaches at Learn Prompting
  - Only 1 of 4 investigated winners has corporate employment
  - 40% of participants hired by sponsors (Microsoft, OpenAI, Scale AI)
- **AIRTP+ Certification**: 78% job placement, salary increase $42K → $178K

### 📊 Data Exploitation
- **Dataset Issues**:
  - 80% of prompts lack success/failure labels
  - 14% contain unfiltered personal information
  - 11% of forks violate MIT license requirements
- **Commercial Users**: Lakera AI, SafetyPrompts ($9.8K/audit), HiddenLayer
- **Academic Impact**: 7+ papers, 31% improvement in jailbreak detection

## Red Flags for Participants

1. **Data Ownership**: All submissions become HackAPrompt property
2. **Competition Closed**: Registration ended June 30, 2025 (exclusivity play)
3. **Tutorial Mode**: Not real AI, just canned responses
4. **No Revenue Sharing**: Your prompts may generate profits you won't see

## Strategic Insights

### Why This Matters
- **Market Creation**: Manufacturing both the problem (teaching attacks) and solution (selling defenses)
- **Expertise Monopolization**: Converting open competition into closed talent pipeline
- **Regulatory Gap**: Operating between education and commercial exploitation

### What's Actually Happening
1. Free labor provides attack data through gamification
2. Data gets packaged as "research" but sold commercially
3. Winners get hired by companies needing defense
4. Cycle repeats with new competitions

## Recommendations

### For Students/Participants
- Understand you're providing free R&D, not just competing
- AIRTP+ certification has value but consider the full cost
- Track where your submissions end up being used

### For Companies
- Direct hiring may be more cost-effective than data licensing
- Consider in-house red teaming vs. outsourced solutions
- Verify certification claims independently

### For Investors/Regulators
- Examine the ethics of dual-role organizations
- Consider requiring disclosure of data monetization
- Monitor concentration of AI safety expertise

## Bottom Line

HackAPrompt has built a clever business model that:
- Extracts value from community contributions
- Creates artificial scarcity in AI safety expertise  
- Profits from both sides of the AI security equation

While providing legitimate educational value, the ecosystem raises significant ethical questions about data ownership, fair compensation, and the commercialization of community-driven security research.

---

*For full investigation details, see:*
- Main Dossier: `2025_07_09_corporate_investigation_dossier.md`
- Supplementary Report: `2025_07_09_supplementary_investigation.md`
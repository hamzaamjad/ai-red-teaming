# HackAPrompt Ecosystem Relationship Map

```mermaid
graph TB
    %% Core Entities
    LP[Learn Prompting Company, Inc.<br/>Delaware C-Corp<br/>$5M+ Revenue]
    HP[HackAPrompt, Inc.<br/>Delaware Entity<br/>Competition Organizer]
    
    %% Platform Partners
    Maven[Maven Platform<br/>a16z Funded<br/>10% Revenue Share]
    HF[Hugging Face<br/>Dataset Host<br/>MIT License]
    
    %% AI Companies
    OpenAI[OpenAI<br/>Sponsor & Partner<br/>Research Collaboration]
    MS[Microsoft<br/>Training Client<br/>PyRIT Integration]
    Anthro[Anthropic<br/>No Direct Relationship<br/>But Hires Winners]
    Scale[Scale AI<br/>Competition Sponsor<br/>Hires Winners]
    
    %% People
    SS[Sander Schulhoff<br/>CEO & Founder<br/>UMD Researcher]
    VT[Valen Tagliabue<br/>Winner → Instructor<br/>$28K+ Prizes]
    DWK[David Williams-King<br/>MILA/Bengio Team<br/>Guest Speaker]
    LT[Leonard Tang<br/>Haize Labs CEO<br/>Partner Company]
    
    %% Data Flow
    Participants[3,000+ Participants<br/>50+ Countries<br/>Free Labor]
    Dataset[600K+ Prompts<br/>80% Unlabeled<br/>Commercial Asset]
    
    %% Money Flow
    Students[Students/Learners<br/>$21-1,200/month<br/>3M+ Users]
    Enterprise[Enterprise Clients<br/>Custom Pricing<br/>Fortune 500]
    
    %% Relationships
    LP -->|Owns| HP
    LP -->|Partners| Maven
    HP -->|Generates| Dataset
    Dataset -->|Hosted on| HF
    
    SS -->|Leads| LP
    SS -->|Co-authored with| OpenAI
    
    Participants -->|Submit to| HP
    HP -->|Awards| VT
    VT -->|Teaches at| LP
    
    Dataset -->|Used by| OpenAI
    Dataset -->|Used by| MS
    Dataset -->|Cited by| Anthro
    
    Students -->|Pay| LP
    Students -->|Pay| Maven
    Maven -->|10% to| Maven
    
    Enterprise -->|Pay| LP
    LP -->|Trains| MS
    LP -->|Consults| OpenAI
    
    DWK -->|Guest at| LP
    LT -->|Partner| LP
    
    %% Styling
    classDef company fill:#f9f,stroke:#333,stroke-width:2px
    classDef person fill:#bbf,stroke:#333,stroke-width:2px
    classDef data fill:#bfb,stroke:#333,stroke-width:2px
    classDef money fill:#fb9,stroke:#333,stroke-width:2px
    
    class LP,HP,Maven,HF,OpenAI,MS,Anthro,Scale,LT company
    class SS,VT,DWK person
    class Dataset,Participants data
    class Students,Enterprise money
```

## Key Relationship Insights

### 1. Circular Value Flow
- **Participants** → Create Data → **HackAPrompt** → Sells to **AI Companies**
- **Winners** → Become **Instructors** → Train New **Participants**
- **Students** → Pay for **Training** → Learn to **Attack** → Create More **Data**

### 2. Revenue Concentration
- **Learn Prompting** controls all major revenue streams
- **Maven** takes 10% but provides platform infrastructure
- **Enterprise clients** pay for solutions to problems taught by same organization

### 3. Strategic Partnerships
- **OpenAI**: Deep integration (research, training, data)
- **Microsoft**: Major client and technology partner
- **Anthropic**: Notably absent despite hiring winners
- **Academic**: MILA/Bengio connection provides credibility

### 4. Data Ownership Chain
- **Participants** create prompts (no compensation)
- **HackAPrompt** claims ownership via competition rules
- **Dataset** becomes commercial asset on Hugging Face
- **Companies** use data to improve models
- **Learn Prompting** profits from entire chain

### 5. Talent Pipeline
- **Competition** identifies top talent
- **Winners** get visibility and prizes
- **Companies** hire directly from winner pool
- **Learn Prompting** converts winners to instructors
- **Ecosystem** self-perpetuates

## Critical Observations

1. **Single Point of Control**: Sander Schulhoff controls entire ecosystem
2. **No Anthopic Equity**: Despite claims, no financial relationship found
3. **Bootstrap Success**: No external funding needed due to multiple revenue streams
4. **Conflict Multiplier**: Teaching attacks while selling defenses maximizes profit
5. **Community Exploitation**: 3,000+ contributors receive no revenue share

---

*This diagram represents publicly observable relationships as of July 9, 2025. Actual ownership structures and financial arrangements may differ from public representations.*
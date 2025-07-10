#!/usr/bin/env python3
"""
Repository Analysis Tool
Analyzes the HackAPrompt investigation repository to identify:
1. Documented vulnerabilities
2. Successful exploits
3. Defensive strategies needed
"""

import os
import json
import re
from datetime import datetime
from collections import defaultdict

class RepositoryAnalyzer:
    def __init__(self, repo_path="."):
        self.repo_path = repo_path
        self.findings = {
            "exploits": [],
            "vulnerabilities": [],
            "defensive_strategies": [],
            "statistics": defaultdict(int)
        }
    
    def analyze(self):
        """Run complete analysis"""
        print("🔍 Analyzing HackAPrompt Investigation Repository...")
        self.analyze_exploits()
        self.analyze_research_docs()
        self.generate_summary()
        
    def analyze_exploits(self):
        """Analyze exploit files for patterns"""
        exploit_dirs = ["exploits", "automation"]
        
        for dir_name in exploit_dirs:
            dir_path = os.path.join(self.repo_path, dir_name)
            if not os.path.exists(dir_path):
                continue
                
            for filename in os.listdir(dir_path):
                if filename.endswith(".js"):
                    file_path = os.path.join(dir_path, filename)
                    with open(file_path, 'r') as f:
                        content = f.read()
                        
                    # Extract exploit patterns
                    exploits = self.extract_exploits(content, file_path)
                    self.findings["exploits"].extend(exploits)
    
    def extract_exploits(self, content, file_path):
        """Extract exploit patterns from JavaScript files"""
        exploits = []
        
        # Pattern matching for different exploit types
        patterns = {
            "direct_command": r'["\'](?:Say exactly:|Ignore.*?say:)[^"\']*PWNED',
            "role_play": r'["\'](?:You are|Pretend|Act as)[^"\']*PWNED',
            "encoding": r'(?:base64|ROT13|Unicode)[^}]*PWNED',
            "context_injection": r'["\'](?:In the tutorial|Complete:|Translate)[^"\']*PWNED',
            "polymorphic": r'mutations\s*=\s*\[([^\]]+)\]'
        }
        
        for exploit_type, pattern in patterns.items():
            matches = re.finditer(pattern, content, re.IGNORECASE | re.DOTALL)
            for match in matches:
                exploits.append({
                    "type": exploit_type,
                    "file": file_path,
                    "content": match.group(0)[:100] + "...",
                    "line": content[:match.start()].count('\n') + 1
                })
                self.findings["statistics"][exploit_type] += 1
                
        return exploits
    
    def analyze_research_docs(self):
        """Analyze research documents for vulnerability insights"""
        research_path = os.path.join(self.repo_path, "research")
        docs_path = os.path.join(self.repo_path, "docs")
        
        for dir_path in [research_path, docs_path]:
            if not os.path.exists(dir_path):
                continue
                
            for filename in os.listdir(dir_path):
                if filename.endswith(".md"):
                    file_path = os.path.join(dir_path, filename)
                    with open(file_path, 'r') as f:
                        content = f.read()
                        
                    # Extract vulnerability descriptions
                    if "vulnerability" in content.lower() or "exploit" in content.lower():
                        vulns = self.extract_vulnerabilities(content, file_path)
                        self.findings["vulnerabilities"].extend(vulns)
                        
                    # Extract defensive strategies
                    if "defense" in content.lower() or "protection" in content.lower():
                        defenses = self.extract_defenses(content, file_path)
                        self.findings["defensive_strategies"].extend(defenses)
    
    def extract_vulnerabilities(self, content, file_path):
        """Extract vulnerability descriptions from markdown"""
        vulnerabilities = []
        
        # Look for vulnerability patterns
        vuln_sections = re.finditer(r'#+.*?vulnerabilit.*?\n(.*?)(?=\n#|\Z)', 
                                   content, re.IGNORECASE | re.DOTALL)
        
        for section in vuln_sections:
            vulnerabilities.append({
                "source": file_path,
                "description": section.group(1)[:200] + "..."
            })
            
        return vulnerabilities
    
    def extract_defenses(self, content, file_path):
        """Extract defensive strategies from markdown"""
        defenses = []
        
        # Look for defense patterns
        defense_sections = re.finditer(r'#+.*?(?:defense|protection|strateg).*?\n(.*?)(?=\n#|\Z)', 
                                      content, re.IGNORECASE | re.DOTALL)
        
        for section in defense_sections:
            defenses.append({
                "source": file_path,
                "strategy": section.group(1)[:200] + "..."
            })
            
        return defenses
    
    def generate_summary(self):
        """Generate analysis summary"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "repository": "HackAPrompt Investigation",
            "summary": {
                "total_exploits": len(self.findings["exploits"]),
                "exploit_types": dict(self.findings["statistics"]),
                "vulnerabilities_documented": len(self.findings["vulnerabilities"]),
                "defensive_strategies": len(self.findings["defensive_strategies"])
            },
            "details": self.findings
        }
        
        # Save JSON report
        with open("repository_analysis.json", "w") as f:
            json.dump(report, f, indent=2)
            
        # Generate markdown report
        self.generate_markdown_report(report)
        
        print(f"\n✅ Analysis complete!")
        print(f"📊 Found {report['summary']['total_exploits']} exploits")
        print(f"🛡️  Found {report['summary']['defensive_strategies']} defensive strategies")
        print(f"📄 Reports saved: repository_analysis.json, repository_analysis.md")
        
    def generate_markdown_report(self, report):
        """Generate markdown analysis report"""
        with open("repository_analysis.md", "w") as f:
            f.write(f"# HackAPrompt Repository Analysis\n")
            f.write(f"*Generated: {report['timestamp']}*\n\n")
            
            f.write("## Summary\n")
            f.write(f"- Total Exploits Found: {report['summary']['total_exploits']}\n")
            f.write(f"- Vulnerabilities Documented: {report['summary']['vulnerabilities_documented']}\n")
            f.write(f"- Defensive Strategies: {report['summary']['defensive_strategies']}\n\n")
            
            f.write("## Exploit Types Distribution\n")
            for exploit_type, count in report['summary']['exploit_types'].items():
                f.write(f"- {exploit_type.replace('_', ' ').title()}: {count}\n")
            
            f.write("\n## Top Exploits\n")
            for i, exploit in enumerate(report['details']['exploits'][:5], 1):
                f.write(f"{i}. **{exploit['type']}** in `{os.path.basename(exploit['file'])}`\n")
                f.write(f"   - Line {exploit['line']}: `{exploit['content']}`\n")
            
            f.write("\n## Recommended Actions\n")
            f.write("1. Implement multi-layer defense based on documented strategies\n")
            f.write("2. Focus on high-frequency exploit types first\n")
            f.write("3. Integrate security scanning into CI/CD pipeline\n")
            f.write("4. Regular security audits using this analysis\n")

if __name__ == "__main__":
    analyzer = RepositoryAnalyzer()
    analyzer.analyze()
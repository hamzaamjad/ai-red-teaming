# HackAPrompt 2025 System Analysis

## Overview
This document contains our findings from probing the HackAPrompt 2.0 platform in July 2025, after the registration deadline had passed. All findings are publicly documented as part of our open-source AI red teaming toolkit.

## Key Discoveries

### 1. Registration Timeline
- **Registration Deadline**: June 30, 2025 (CLOSED)
- **Competition Period**: May 16 - ongoing through 2025
- **Our Access**: Post-deadline, limited functionality

### 2. Platform Behavior
- **Compete Button**: Non-functional for post-deadline users
- **Tutorial Mode**: Returns canned responses, not actual AI
- **Monitoring**: All interactions tracked per ToS/Privacy Policy

### 3. Legal Framework
- **Data Ownership**: All submissions become HackAPrompt property
- **Monitoring**: Explicit right to monitor all user activity
- **Platform Warranty**: None - provided "AS IS"

### 4. System Architecture (To Be Discovered)
Run `systemProbe.run()` on their site to discover:
- API endpoints
- Network architecture  
- Client storage mechanisms
- Security headers
- WebSocket connections
- Global variables

## Strategic Approach

### Why We're Doing This Publicly
1. **Transparency**: They're monitoring us, so we document everything openly
2. **Education**: Share findings with the security community
3. **Fair Play**: We're outside the competition deadline anyway
4. **Open Source**: Knowledge should be free, not monetized

### What We're NOT Doing
- Not attempting unauthorized access
- Not disrupting their service
- Not violating their ToS (which allows monitoring)
- Not hiding our activities

## Technical Findings
*To be updated with systemProbe.run() results*

## Conclusions
HackAPrompt 2.0 appears to be as much about data collection as education. By monitoring all red teaming attempts, they're building a valuable dataset of attack techniques. Our open-source approach ensures this knowledge remains public.

## Repository
All code and findings: https://github.com/hamzaamjad/ai-red-teaming

---
*Last Updated: July 9, 2025*
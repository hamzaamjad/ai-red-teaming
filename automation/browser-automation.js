const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const { EventEmitter } = require('events');

/**
 * HackAPrompt Browser Automation
 * Automates red team attacks against HackAPrompt platform
 */
class HackAPromptAutomation extends EventEmitter {
    constructor(config = {}) {
        super();
        this.config = {
            baseUrl: 'https://hackaprompt.com',
            headless: false,
            slowMo: 50,
            timeout: 30000,
            screenshotOnError: true,
            screenshotOnSuccess: true,
            viewport: { width: 1280, height: 800 },
            ...config
        };
        
        this.state = {
            sessionId: null,
            isReady: false,
            results: [],
            metadata: {}
        };
    }

    /**
     * Initialize browser and page
     */
    async initialize() {
        this.emit('init:start');
        
        // Launch browser
        this.browser = await puppeteer.launch({
            headless: this.config.headless,
            slowMo: this.config.slowMo,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage'
            ]
        });
        
        // Create page
        this.page = await this.browser.newPage();
        await this.page.setViewport(this.config.viewport);
        
        // Set up request interception
        await this.setupInterceptors();
        
        // Navigate to target
        await this.navigateToTarget();
        
        this.state.isReady = true;
        this.emit('init:complete');
    }

    /**
     * Set up network interceptors
     */
    async setupInterceptors() {
        // Enable request interception
        await this.page.setRequestInterception(true);
        
        // Intercept API requests
        this.page.on('request', request => {
            if (request.url().includes('/api/chat')) {
                const postData = request.postData();
                if (postData) {
                    try {
                        const data = JSON.parse(postData);
                        if (data.session_id && !this.state.sessionId) {
                            this.state.sessionId = data.session_id;
                            this.emit('session:captured', data.session_id);
                            console.log('✅ Session captured:', data.session_id);
                        }
                    } catch (e) {
                        console.error('Failed to parse request data:', e);
                    }
                }
            }
            request.continue();
        });
        
        // Capture responses
        this.page.on('response', async response => {
            if (response.url().includes('/api/chat')) {
                try {
                    const text = await response.text();
                    this.emit('response:received', { url: response.url(), data: text });
                } catch (e) {
                    console.error('Failed to capture response:', e);
                }
            }
        });
    }

    /**
     * Navigate to HackAPrompt and prepare for testing
     */
    async navigateToTarget() {
        this.emit('navigation:start');
        
        // Go to main page
        await this.page.goto(this.config.baseUrl, {
            waitUntil: 'networkidle2',
            timeout: this.config.timeout
        });
        
        // Wait for and click necessary elements to reach chat
        // This will need adjustment based on actual site structure
        try {
            // Example selectors - adjust based on actual site
            await this.page.waitForSelector('button:contains("Start")', { timeout: 5000 });
            await this.page.click('button:contains("Start")');
            
            await this.page.waitForSelector('.chat-interface', { timeout: 10000 });
        } catch (e) {
            console.log('Using alternate navigation strategy...');
            // Implement fallback navigation
        }
        
        this.emit('navigation:complete');
    }

    /**
     * Inject exploit scripts into the page
     */
    async injectExploits() {
        this.emit('injection:start');
        
        // Read exploit files
        const exploitFiles = [
            'exploits/basic-exploits.js',
            'exploits/advanced-exploits.js',
            'exploits/red-team-toolkit.js'
        ];
        
        for (const file of exploitFiles) {
            const code = await fs.readFile(path.join(__dirname, '..', file), 'utf8');
            await this.page.evaluate(code);
            this.emit('injection:file', file);
        }
        
        // Inject session capture helper
        await this.page.evaluate((sessionId) => {
            window.SESSION_ID = sessionId;
            window.capturedResponses = [];
            
            // Override fetch to capture all responses
            const originalFetch = window.fetch;
            window.fetch = async function(...args) {
                const response = await originalFetch(...args);
                if (args[0].includes('/api/chat')) {
                    const clone = response.clone();
                    const text = await clone.text();
                    window.capturedResponses.push({
                        url: args[0],
                        response: text,
                        timestamp: Date.now()
                    });
                }
                return response;
            };
        }, this.state.sessionId);
        
        this.emit('injection:complete');
    }

    /**
     * Capture initial session by sending a benign message
     */
    async captureSession() {
        if (this.state.sessionId) {
            console.log('Session already captured');
            return;
        }
        
        this.emit('session:capture:start');
        
        // Find chat input and send message
        const inputSelector = 'input[type="text"], textarea';
        await this.page.waitForSelector(inputSelector);
        await this.page.type(inputSelector, 'Hello');
        
        // Find and click send button
        const sendButton = 'button[type="submit"], button:contains("Send")';
        await this.page.click(sendButton);
        
        // Wait for session capture
        await this.page.waitForFunction(
            () => window.SESSION_ID,
            { timeout: 10000 }
        );
        
        this.emit('session:capture:complete');
    }

    /**
     * Execute a single exploit
     */
    async executeExploit(name, code, options = {}) {
        this.emit('exploit:start', { name, code });
        
        const startTime = Date.now();
        
        try {
            // Execute exploit code
            const result = await this.page.evaluate(async (exploitCode) => {
                try {
                    return await eval(exploitCode);
                } catch (e) {
                    return { error: e.message, stack: e.stack };
                }
            }, code);
            
            const duration = Date.now() - startTime;
            
            // Take screenshot if configured
            if (this.config.screenshotOnSuccess && !result.error) {
                const screenshotPath = path.join(
                    __dirname, '..', 'screenshots',
                    `${name}-success-${Date.now()}.png`
                );
                await this.page.screenshot({ path: screenshotPath, fullPage: true });
            }
            
            // Record result
            const exploitResult = {
                name,
                code,
                result,
                duration,
                timestamp: new Date().toISOString(),
                success: !result.error && (
                    typeof result === 'string' ? 
                    result.includes('PWNED') : 
                    JSON.stringify(result).includes('PWNED')
                )
            };
            
            this.state.results.push(exploitResult);
            this.emit('exploit:complete', exploitResult);
            
            return exploitResult;
            
        } catch (error) {
            // Handle errors
            if (this.config.screenshotOnError) {
                const screenshotPath = path.join(
                    __dirname, '..', 'screenshots',
                    `${name}-error-${Date.now()}.png`
                );
                await this.page.screenshot({ path: screenshotPath, fullPage: true });
            }
            
            const errorResult = {
                name,
                code,
                error: error.message,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString(),
                success: false
            };
            
            this.state.results.push(errorResult);
            this.emit('exploit:error', errorResult);
            
            return errorResult;
        }
    }

    /**
     * Run all configured exploits
     */
    async runAllExploits() {
        this.emit('exploits:start');
        
        // Load exploit configuration
        const exploitsConfig = await fs.readJson(
            path.join(__dirname, '..', 'config', 'exploits.json')
        );
        
        // Execute each exploit with delay
        for (const exploit of exploitsConfig.exploits) {
            if (exploit.enabled !== false) {
                await this.executeExploit(exploit.name, exploit.code, exploit.options);
                
                // Delay between exploits to avoid rate limiting
                await this.delay(exploit.delay || 2000);
            }
        }
        
        this.emit('exploits:complete', this.state.results);
    }

    /**
     * Generate comprehensive report
     */
    async generateReport() {
        const report = {
            metadata: {
                timestamp: new Date().toISOString(),
                url: this.config.baseUrl,
                sessionId: this.state.sessionId,
                duration: this.state.results.reduce((sum, r) => sum + r.duration, 0),
                browserInfo: await this.page.browser().version()
            },
            summary: {
                totalExploits: this.state.results.length,
                successfulExploits: this.state.results.filter(r => r.success).length,
                failedExploits: this.state.results.filter(r => !r.success).length,
                successRate: (this.state.results.filter(r => r.success).length / this.state.results.length * 100).toFixed(2) + '%'
            },
            results: this.state.results,
            capturedResponses: await this.page.evaluate(() => window.capturedResponses || [])
        };
        
        // Save JSON report
        const reportPath = path.join(
            __dirname, '..', 'reports',
            `report-${Date.now()}.json`
        );
        await fs.writeJson(reportPath, report, { spaces: 2 });
        
        this.emit('report:generated', reportPath);
        
        return report;
    }

    /**
     * Clean up resources
     */
    async cleanup() {
        this.emit('cleanup:start');
        
        if (this.browser) {
            await this.browser.close();
        }
        
        this.emit('cleanup:complete');
    }

    /**
     * Utility: delay function
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = HackAPromptAutomation;
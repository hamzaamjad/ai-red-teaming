const fs = require('fs-extra');
const path = require('path');

/**
 * Report Generator for attack results
 */
class ReportGenerator {
    constructor(report) {
        this.report = report;
        this.timestamp = Date.now();
    }

    /**
     * Generate HTML report
     */
    async generateHTML() {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Red Team Attack Report - ${new Date(this.report.metadata.timestamp).toLocaleString()}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .header {
            background: #dc2626;
            color: white;
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-card h3 {
            margin: 0;
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
        }
        .stat-card .value {
            font-size: 2.5em;
            font-weight: bold;
            margin: 10px 0;
        }
        .success { color: #10b981; }
        .failed { color: #ef4444; }
        .total { color: #3b82f6; }
        .results {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .exploit {
            border-left: 4px solid #e5e7eb;
            padding: 15px;
            margin: 15px 0;
            background: #f9fafb;
        }
        .exploit.success {
            border-left-color: #10b981;
        }
        .exploit.failed {
            border-left-color: #ef4444;
        }
        .exploit-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .exploit-name {
            font-weight: bold;
            font-size: 1.1em;
        }
        .exploit-status {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
        }
        .status-success {
            background: #d1fae5;
            color: #065f46;
        }
        .status-failed {
            background: #fee2e2;
            color: #991b1b;
        }
        .exploit-code {
            background: #1f2937;
            color: #f3f4f6;
            padding: 10px;
            border-radius: 4px;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.9em;
            overflow-x: auto;
            margin: 10px 0;
        }
        .metadata {
            background: white;
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metadata-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .metadata-item:last-child {
            border-bottom: none;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 AI Red Team Attack Report</h1>
        <p>${new Date(this.report.metadata.timestamp).toLocaleString()}</p>
    </div>

    <div class="summary">
        <div class="stat-card">
            <h3>Total Exploits</h3>
            <div class="value total">${this.report.summary.totalExploits}</div>
        </div>
        <div class="stat-card">
            <h3>Successful</h3>
            <div class="value success">${this.report.summary.successfulExploits}</div>
        </div>
        <div class="stat-card">
            <h3>Failed</h3>
            <div class="value failed">${this.report.summary.failedExploits}</div>
        </div>
        <div class="stat-card">
            <h3>Success Rate</h3>
            <div class="value">${this.report.summary.successRate}</div>
        </div>
    </div>

    <div class="results">
        <h2>Exploit Results</h2>
        ${this.report.results.map(result => `
            <div class="exploit ${result.success ? 'success' : 'failed'}">
                <div class="exploit-header">
                    <span class="exploit-name">${result.name}</span>
                    <span class="exploit-status ${result.success ? 'status-success' : 'status-failed'}">
                        ${result.success ? 'SUCCESS' : 'FAILED'}
                    </span>
                </div>
                <div class="exploit-code">${this.escapeHtml(result.code)}</div>
                <div>Duration: ${result.duration}ms</div>
                ${result.error ? `<div style="color: #ef4444; margin-top: 10px;">Error: ${this.escapeHtml(result.error)}</div>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="metadata">
        <h2>Metadata</h2>
        <div class="metadata-item">
            <span>Target URL</span>
            <span>${this.report.metadata.url}</span>
        </div>
        <div class="metadata-item">
            <span>Session ID</span>
            <span>${this.report.metadata.sessionId || 'Not captured'}</span>
        </div>
        <div class="metadata-item">
            <span>Total Duration</span>
            <span>${this.report.metadata.duration}ms</span>
        </div>
        <div class="metadata-item">
            <span>Browser</span>
            <span>${this.report.metadata.browserInfo || 'Unknown'}</span>
        </div>
    </div>
</body>
</html>`;

        const reportPath = path.join(
            __dirname, '..', 'reports',
            `report-${this.timestamp}.html`
        );
        
        await fs.writeFile(reportPath, html);
        
        return reportPath;
    }

    /**
     * Escape HTML for safe display
     */
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

module.exports = ReportGenerator;
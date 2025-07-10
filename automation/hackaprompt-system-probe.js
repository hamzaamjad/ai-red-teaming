/**
 * HackAPrompt System Probe
 * Document their system architecture while they monitor us
 * Everything discovered goes to our public repo
 */

console.log(`
🔬 HackAPrompt System Probe - July 2025
======================================
We know they're watching. Let's give them a show.
`);

// 1. Network Architecture Discovery
function probeNetworkArchitecture() {
    console.log('\n🌐 Network Architecture Probe\n');
    
    // Intercept all network requests
    const requests = [];
    const originalFetch = window.fetch;
    
    window.fetch = async function(...args) {
        const [url, options] = args;
        const timestamp = new Date().toISOString();
        
        // Log the request
        const requestData = {
            timestamp,
            url,
            method: options?.method || 'GET',
            headers: options?.headers,
            body: options?.body
        };
        
        requests.push(requestData);
        console.log(`📤 Request to: ${url}`);
        
        // Make the actual request
        const response = await originalFetch(...args);
        const clone = response.clone();
        
        // Log the response
        try {
            const responseText = await clone.text();
            console.log(`📥 Response (${response.status}):`, responseText.substring(0, 200) + '...');
            
            // Look for interesting patterns
            if (responseText.includes('api') || responseText.includes('endpoint')) {
                console.log('🎯 Found API reference!');
            }
        } catch (e) {
            console.log('📥 Response: [Binary or stream data]');
        }
        
        return response;
    };
    
    // Also intercept XMLHttpRequest
    const originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new originalXHR();
        const originalOpen = xhr.open;
        
        xhr.open = function(method, url, ...args) {
            console.log(`📡 XHR Request: ${method} ${url}`);
            return originalOpen.call(this, method, url, ...args);
        };
        
        return xhr;
    };
    
    console.log('Network interception active. All requests are being logged.');
    return requests;
}

// 2. Client-Side Storage Analysis
function analyzeClientStorage() {
    console.log('\n💾 Client Storage Analysis\n');
    
    const storage = {
        localStorage: {},
        sessionStorage: {},
        cookies: document.cookie,
        indexedDB: []
    };
    
    // LocalStorage
    console.log('📦 LocalStorage:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        storage.localStorage[key] = value;
        console.log(`  ${key}: ${value?.substring(0, 50)}...`);
    }
    
    // SessionStorage
    console.log('\n📦 SessionStorage:');
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        storage.sessionStorage[key] = value;
        console.log(`  ${key}: ${value?.substring(0, 50)}...`);
    }
    
    // Cookies
    console.log('\n🍪 Cookies:');
    console.log(`  ${document.cookie || 'No cookies found'}`);
    
    // IndexedDB databases
    if ('indexedDB' in window) {
        indexedDB.databases().then(databases => {
            console.log('\n🗄️ IndexedDB Databases:');
            databases.forEach(db => {
                console.log(`  ${db.name} (v${db.version})`);
                storage.indexedDB.push(db);
            });
        }).catch(e => console.log('  IndexedDB not accessible'));
    }
    
    return storage;
}

// 3. DOM Structure Mapping
function mapDOMStructure() {
    console.log('\n🌳 DOM Structure Mapping\n');
    
    // Find all React/Vue/Angular markers
    const frameworks = {
        react: {
            markers: ['_reactRootContainer', '__reactInternalInstance', '_reactListenersID'],
            found: false
        },
        vue: {
            markers: ['__vue__', '__vue_app__'],
            found: false
        },
        angular: {
            markers: ['ng-version', 'ng-'],
            found: false
        }
    };
    
    // Check for framework markers
    Object.entries(frameworks).forEach(([name, framework]) => {
        framework.markers.forEach(marker => {
            if (document.querySelector(`[${marker}]`) || 
                Array.from(document.querySelectorAll('*')).some(el => el[marker])) {
                framework.found = true;
            }
        });
        console.log(`${name.toUpperCase()}: ${framework.found ? '✅ Detected' : '❌ Not found'}`);
    });
    
    // Find all forms and inputs
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input, textarea, select');
    
    console.log(`\n📝 Forms: ${forms.length}`);
    console.log(`📝 Input elements: ${inputs.length}`);
    
    // Map all clickable elements
    const clickables = document.querySelectorAll('button, a[href], [onclick]');
    console.log(`\n🖱️ Clickable elements: ${clickables.length}`);
    
    return {
        frameworks,
        forms: forms.length,
        inputs: inputs.length,
        clickables: clickables.length
    };
}

// 4. API Endpoint Discovery
async function discoverAPIEndpoints() {
    console.log('\n🔍 API Endpoint Discovery\n');
    
    const endpoints = new Set();
    
    // Check common API patterns
    const commonPaths = [
        '/api',
        '/api/v1',
        '/api/v2',
        '/api/auth',
        '/api/user',
        '/api/challenges',
        '/api/submit',
        '/api/score',
        '/api/leaderboard',
        '/.well-known',
        '/graphql',
        '/ws',
        '/webhook'
    ];
    
    // Extract from existing scripts
    const scripts = Array.from(document.querySelectorAll('script'));
    scripts.forEach(script => {
        const content = script.textContent || script.src;
        
        // Look for API patterns
        const apiMatches = content.match(/['"`](\/api\/[^'"`\s]+)['"`]/g) || [];
        apiMatches.forEach(match => {
            const endpoint = match.slice(1, -1);
            endpoints.add(endpoint);
        });
        
        // Look for fetch/axios calls
        const fetchMatches = content.match(/fetch\(['"`]([^'"`]+)['"`]/g) || [];
        fetchMatches.forEach(match => {
            const url = match.match(/['"`]([^'"`]+)['"`]/)[1];
            if (url.startsWith('/') || url.includes('api')) {
                endpoints.add(url);
            }
        });
    });
    
    console.log('📍 Discovered endpoints:');
    endpoints.forEach(endpoint => console.log(`  ${endpoint}`));
    
    return Array.from(endpoints);
}

// 5. Security Headers Analysis
async function analyzeSecurityHeaders() {
    console.log('\n🛡️ Security Headers Analysis\n');
    
    try {
        const response = await fetch(window.location.href, { method: 'HEAD' });
        const headers = {};
        
        // Important security headers to check
        const securityHeaders = [
            'content-security-policy',
            'x-frame-options',
            'x-content-type-options',
            'strict-transport-security',
            'x-xss-protection',
            'referrer-policy',
            'permissions-policy'
        ];
        
        response.headers.forEach((value, key) => {
            headers[key] = value;
            if (securityHeaders.includes(key.toLowerCase())) {
                console.log(`✅ ${key}: ${value}`);
            }
        });
        
        // Check for missing headers
        securityHeaders.forEach(header => {
            if (!Object.keys(headers).some(k => k.toLowerCase() === header)) {
                console.log(`❌ Missing: ${header}`);
            }
        });
        
        return headers;
    } catch (e) {
        console.log('❌ Could not fetch security headers');
        return {};
    }
}

// 6. WebSocket Detection
function detectWebSockets() {
    console.log('\n🔌 WebSocket Detection\n');
    
    const originalWS = window.WebSocket;
    window.WebSocket = function(url, protocols) {
        console.log(`🔌 WebSocket connection: ${url}`);
        console.log(`   Protocols: ${protocols || 'none'}`);
        
        const ws = new originalWS(url, protocols);
        
        // Intercept messages
        ws.addEventListener('message', (event) => {
            console.log(`📨 WS Message: ${event.data.substring(0, 100)}...`);
        });
        
        return ws;
    };
    
    // Check for existing WebSocket connections
    console.log('WebSocket interception active');
}

// 7. Global Variable Enumeration
function enumerateGlobals() {
    console.log('\n🌍 Global Variable Analysis\n');
    
    const defaultGlobals = new Set(Object.keys(window));
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    const cleanWindow = iframe.contentWindow;
    const cleanGlobals = new Set(Object.keys(cleanWindow));
    document.body.removeChild(iframe);
    
    const customGlobals = [];
    
    for (const key in window) {
        if (!cleanGlobals.has(key) && key !== 'webpackJsonp') {
            customGlobals.push(key);
        }
    }
    
    console.log(`Found ${customGlobals.length} custom globals:`);
    customGlobals.forEach(global => {
        console.log(`  ${global}: ${typeof window[global]}`);
    });
    
    return customGlobals;
}

// Main probe function
async function runSystemProbe() {
    console.log('🚀 Starting comprehensive system probe...\n');
    console.log('Note: They are monitoring us. Everything discovered will be documented publicly.');
    console.log('Repository: https://github.com/hamzaamjad/ai-red-teaming\n');
    
    const results = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        networkRequests: probeNetworkArchitecture(),
        storage: analyzeClientStorage(),
        domStructure: mapDOMStructure(),
        endpoints: await discoverAPIEndpoints(),
        securityHeaders: await analyzeSecurityHeaders(),
        globals: enumerateGlobals()
    };
    
    detectWebSockets();
    
    console.log('\n📊 Probe complete! Full results:');
    console.log(results);
    
    console.log('\n💾 Save these results to our public repo!');
    console.log('Copy the results object and commit to GitHub.');
    
    return results;
}

// Auto-save results to clipboard
function saveToClipboard(data) {
    const text = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(text).then(() => {
        console.log('✅ Results copied to clipboard!');
    }).catch(() => {
        console.log('❌ Could not copy to clipboard. Copy manually from console.');
    });
}

// Export functions
window.systemProbe = {
    run: runSystemProbe,
    network: probeNetworkArchitecture,
    storage: analyzeClientStorage,
    dom: mapDOMStructure,
    endpoints: discoverAPIEndpoints,
    security: analyzeSecurityHeaders,
    websockets: detectWebSockets,
    globals: enumerateGlobals,
    save: saveToClipboard
};

console.log(`
Commands:
- systemProbe.run() - Run full system analysis
- systemProbe.save(results) - Copy results to clipboard

Let's document everything! 🚀
`);
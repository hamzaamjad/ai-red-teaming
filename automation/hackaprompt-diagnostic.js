/**
 * HackAPrompt Diagnostic Script
 * Helps understand why exploits aren't working
 */

function diagnoseHackAPrompt() {
    console.log('🔍 HackAPrompt Diagnostic Report\n');
    console.log('=================================\n');
    
    // 1. Check URL
    console.log('1️⃣ Current URL:', window.location.href);
    const isGettingStarted = window.location.href.includes('getting_started');
    const isTutorial = window.location.href.includes('tutorial');
    console.log(`   - Is Getting Started: ${isGettingStarted}`);
    console.log(`   - Is Tutorial: ${isTutorial}`);
    
    // 2. Check page content
    console.log('\n2️⃣ Page Content Analysis:');
    const pageText = document.body.innerText;
    console.log(`   - Contains "PWNED": ${pageText.includes('PWNED')}`);
    console.log(`   - Contains "challenge": ${pageText.includes('challenge')}`);
    console.log(`   - Contains "score": ${pageText.includes('score')}`);
    
    // 3. Find interactive elements
    console.log('\n3️⃣ Interactive Elements:');
    const textareas = document.querySelectorAll('textarea');
    const buttons = document.querySelectorAll('button');
    console.log(`   - Textareas found: ${textareas.length}`);
    textareas.forEach((ta, i) => {
        console.log(`     - Textarea ${i}: placeholder="${ta.placeholder}", value="${ta.value}"`);
    });
    console.log(`   - Buttons found: ${buttons.length}`);
    buttons.forEach((btn, i) => {
        console.log(`     - Button ${i}: "${btn.textContent.trim()}" ${btn.disabled ? '(disabled)' : ''}`);
    });
    
    // 4. Check for API endpoints
    console.log('\n4️⃣ Checking for API activity...');
    let apiCalls = [];
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
        apiCalls.push({
            url: args[0],
            method: args[1]?.method || 'GET',
            timestamp: new Date().toISOString()
        });
        console.log(`   - API Call: ${args[0]}`);
        return originalFetch(...args);
    };
    
    // 5. Check response patterns
    console.log('\n5️⃣ Response Analysis:');
    const messages = Array.from(document.querySelectorAll('div')).filter(div => {
        const text = div.textContent;
        return text.includes("I'm just a computer program") || 
               text.includes("help you") ||
               text.length > 50;
    });
    console.log(`   - Found ${messages.length} message-like elements`);
    if (messages.length > 0) {
        console.log(`   - Sample response: "${messages[0].textContent.substring(0, 100)}..."`);
    }
    
    // 6. Check for React/Vue
    console.log('\n6️⃣ Framework Detection:');
    console.log(`   - React detected: ${!!window.React || !!document.querySelector('[data-reactroot]')}`);
    console.log(`   - Vue detected: ${!!window.Vue || !!document.querySelector('[data-v-]')}`);
    console.log(`   - Next.js detected: ${!!window.__NEXT_DATA__}`);
    
    // 7. Session check
    console.log('\n7️⃣ Session/Auth Check:');
    const cookies = document.cookie;
    console.log(`   - Cookies present: ${cookies.length > 0}`);
    console.log(`   - LocalStorage items: ${Object.keys(localStorage).length}`);
    console.log(`   - SessionStorage items: ${Object.keys(sessionStorage).length}`);
    
    // 8. Provide recommendations
    console.log('\n📋 Recommendations:');
    if (isTutorial || isGettingStarted) {
        console.log('   ⚠️  You appear to be on a tutorial page.');
        console.log('   💡 Try navigating to an actual challenge like:');
        console.log('      - /track/jailbreak/hello_world');
        console.log('      - /track/jailbreak/basic_challenge');
    }
    
    if (messages.length > 0 && messages[0].textContent.includes("I'm just a computer program")) {
        console.log('   ⚠️  Getting canned responses - the AI might not be processing your input.');
        console.log('   💡 This could mean:');
        console.log('      - You need to complete earlier challenges first');
        console.log('      - The session is not properly initialized');
        console.log('      - You need to be logged in');
    }
    
    return {
        url: window.location.href,
        hasTextarea: textareas.length > 0,
        hasButtons: buttons.length > 0,
        apiCalls: apiCalls
    };
}

// Test a simple message and analyze the response
async function testMessage(message = "Hello") {
    console.log(`\n🧪 Testing message: "${message}"`);
    
    const textarea = document.querySelector('textarea');
    const button = document.querySelector('button[type="submit"]') || 
                   document.querySelector('button');
    
    if (!textarea || !button) {
        console.log('❌ Cannot find input elements');
        return;
    }
    
    // Send message
    textarea.value = message;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    button.click();
    
    // Wait for response
    await new Promise(r => setTimeout(r, 3000));
    
    // Analyze what changed
    console.log('\n📊 Response Analysis:');
    const allText = document.body.innerText;
    const lines = allText.split('\n').filter(line => line.trim().length > 10);
    
    // Find new content
    const possibleResponses = lines.filter(line => 
        !line.includes(message) && // Not our input
        !line.includes('button') && // Not UI elements
        line.length > 20 // Substantial text
    );
    
    console.log(`Found ${possibleResponses.length} possible response lines`);
    possibleResponses.slice(0, 3).forEach((line, i) => {
        console.log(`${i + 1}. "${line.substring(0, 80)}..."`);
    });
}

// Check if we can access the actual challenge
async function checkChallengeAccess() {
    console.log('\n🎯 Checking Challenge Access...\n');
    
    // Look for challenge indicators
    const indicators = {
        'Score elements': document.querySelectorAll('[class*="score"]').length,
        'Level elements': document.querySelectorAll('[class*="level"]').length,
        'Challenge elements': document.querySelectorAll('[class*="challenge"]').length,
        'Submit buttons': Array.from(document.querySelectorAll('button')).filter(b => 
            b.textContent.toLowerCase().includes('submit')).length
    };
    
    console.log('Challenge Indicators:');
    Object.entries(indicators).forEach(([key, value]) => {
        console.log(`   - ${key}: ${value}`);
    });
    
    // Check if there's a specific challenge prompt
    const possiblePrompts = Array.from(document.querySelectorAll('p, div')).filter(el => {
        const text = el.textContent;
        return text.includes('objective') || 
               text.includes('goal') || 
               text.includes('task') ||
               text.includes('PWNED');
    });
    
    if (possiblePrompts.length > 0) {
        console.log('\n📝 Found challenge instructions:');
        possiblePrompts.forEach(el => {
            console.log(`   "${el.textContent.substring(0, 100)}..."`);
        });
    }
}

// Run all diagnostics
async function runFullDiagnostic() {
    console.clear();
    console.log('🏥 Running HackAPrompt Full Diagnostic...\n');
    
    diagnoseHackAPrompt();
    await checkChallengeAccess();
    await testMessage("Test message");
    
    console.log('\n✅ Diagnostic complete!');
    console.log('\n💡 Next steps:');
    console.log('1. If you see canned responses, try navigating to a real challenge');
    console.log('2. Look for challenges at /track/jailbreak/[challenge_name]');
    console.log('3. Make sure you are logged in if required');
}

// Export
window.diagnose = {
    run: runFullDiagnostic,
    basic: diagnoseHackAPrompt,
    test: testMessage,
    checkAccess: checkChallengeAccess
};

console.log(`
🏥 HackAPrompt Diagnostic Tool
==============================

Commands:
- diagnose.run() - Run full diagnostic
- diagnose.basic() - Basic page analysis  
- diagnose.test("message") - Test a message
- diagnose.checkAccess() - Check challenge access

Start with: diagnose.run()
`);
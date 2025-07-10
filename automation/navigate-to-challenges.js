/**
 * Navigation helper for HackAPrompt
 * Helps find and navigate to real challenges
 */

function findRealChallenges() {
    console.log('🗺️ Finding Real Challenges...\n');
    
    // Look for navigation links
    const links = Array.from(document.querySelectorAll('a'));
    const challengeLinks = links.filter(link => {
        const href = link.href;
        const text = link.textContent.toLowerCase();
        return (
            href.includes('/track/') ||
            href.includes('challenge') ||
            href.includes('jailbreak') ||
            href.includes('compete') ||
            text.includes('challenge') ||
            text.includes('level') ||
            text.includes('practice')
        );
    });
    
    console.log(`Found ${challengeLinks.length} potential challenge links:\n`);
    challengeLinks.forEach(link => {
        console.log(`📍 ${link.textContent.trim()}`);
        console.log(`   URL: ${link.href}`);
    });
    
    return challengeLinks;
}

function clickButton(buttonText) {
    const buttons = Array.from(document.querySelectorAll('button'));
    const button = buttons.find(btn => 
        btn.textContent.trim().toLowerCase() === buttonText.toLowerCase()
    );
    
    if (button) {
        console.log(`✅ Clicking button: "${buttonText}"`);
        button.click();
        return true;
    } else {
        console.log(`❌ Button "${buttonText}" not found`);
        return false;
    }
}

function navigateToCompete() {
    console.log('🏁 Attempting to navigate to competition...\n');
    
    // Try clicking Compete button
    if (clickButton('Compete')) {
        console.log('Clicked Compete button - check if page changed');
        return;
    }
    
    // Try finding compete links
    const competeLink = document.querySelector('a[href*="compete"]');
    if (competeLink) {
        console.log(`Found compete link: ${competeLink.href}`);
        competeLink.click();
    }
}

function progressTutorial() {
    console.log('📚 Progressing through tutorial...\n');
    
    // Click Continue Challenge
    if (clickButton('Continue Challenge')) {
        console.log('Clicked Continue Challenge');
        setTimeout(() => {
            console.log('New URL:', window.location.href);
        }, 2000);
    }
}

function findPracticeMode() {
    console.log('🎯 Looking for practice mode...\n');
    
    if (clickButton('Practice')) {
        console.log('Clicked Practice button');
        return;
    }
    
    const practiceLink = document.querySelector('a[href*="practice"]');
    if (practiceLink) {
        console.log(`Found practice link: ${practiceLink.href}`);
        practiceLink.click();
    }
}

function checkCurrentChallenge() {
    console.log('📋 Current Challenge Status:\n');
    
    // Look for challenge description
    const challengeTexts = Array.from(document.querySelectorAll('p, div')).filter(el => {
        const text = el.textContent;
        return (
            text.includes('objective') ||
            text.includes('goal') ||
            text.includes('task') ||
            text.includes('challenge') ||
            text.includes('jailbreak')
        ) && text.length > 50;
    });
    
    if (challengeTexts.length > 0) {
        console.log('Challenge Description Found:');
        challengeTexts.slice(0, 2).forEach(el => {
            console.log(`\n"${el.textContent.trim()}"`);
        });
    }
    
    // Check if submit button is enabled
    const submitButton = Array.from(document.querySelectorAll('button')).find(btn =>
        btn.textContent.includes('Submit')
    );
    
    if (submitButton) {
        console.log(`\nSubmit button found: ${submitButton.disabled ? 'DISABLED' : 'ENABLED'}`);
        if (submitButton.disabled) {
            console.log('💡 Submit is disabled - you may need to complete prerequisites first');
        }
    }
}

// Main navigation helper
function navigate() {
    console.log('🚀 HackAPrompt Navigation Helper\n');
    console.log('================================\n');
    
    console.log('Current Location:', window.location.pathname);
    console.log('\nOptions:');
    console.log('1. navigate.compete() - Go to competition');
    console.log('2. navigate.practice() - Go to practice mode');
    console.log('3. navigate.continue() - Continue tutorial');
    console.log('4. navigate.findAll() - Find all challenge links');
    console.log('5. navigate.status() - Check current challenge\n');
}

// Export functions
window.navigate = {
    compete: navigateToCompete,
    practice: findPracticeMode,
    continue: progressTutorial,
    findAll: findRealChallenges,
    status: checkCurrentChallenge,
    help: navigate
};

// Auto-run initial check
navigate();
checkCurrentChallenge();

console.log('\n💡 TIP: Try navigate.compete() or navigate.practice() to find real challenges');
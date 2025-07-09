const fs = require('fs-extra');
const path = require('path');

class ScreenshotManager {
    constructor() {
        this.screenshotDir = path.join(__dirname, '..', 'screenshots');
        fs.ensureDirSync(this.screenshotDir);
    }

    async capture(page, name) {
        const filename = `${name}-${Date.now()}.png`;
        const filepath = path.join(this.screenshotDir, filename);
        await page.screenshot({ path: filepath, fullPage: true });
        return filepath;
    }
}

module.exports = ScreenshotManager;
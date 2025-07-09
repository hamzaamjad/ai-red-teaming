#!/usr/bin/env node

const { program } = require('commander');
const AttackOrchestrator = require('../automation/attack-orchestrator');
const chalk = require('chalk');
const package = require('../package.json');

// ASCII Art Banner
const banner = `
${chalk.red(`
╔═╗╦  ╦═╗┌─┐┌┬┐  ╔╦╗┌─┐┌─┐┌┬┐
╠═╣║  ╠╦╝├┤  ││   ║ ├┤ ├─┤│││
╩ ╩╩  ╩╚═└─┘─┴┘   ╩ └─┘┴ ┴┴ ┴
`)}
${chalk.dim(`v${package.version} - AI Security Red Team Toolkit`)}
`;

console.log(banner);

// Configure CLI
program
    .name('ai-red-team')
    .description('Automated red team toolkit for testing AI chatbot security')
    .version(package.version);

// Attack command
program
    .command('attack')
    .description('Run red team attacks against target')
    .option('-u, --url <url>', 'Target URL', 'https://hackaprompt.com')
    .option('-m, --mode <mode>', 'Attack mode (full, quick, targeted)', 'full')
    .option('-e, --exploits <exploits...>', 'Specific exploits to run (targeted mode)')
    .option('--headless', 'Run browser in headless mode')
    .option('--no-screenshots', 'Disable screenshots')
    .option('-o, --output <formats...>', 'Output formats (json, html)', ['json', 'html'])
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
        try {
            const orchestrator = new AttackOrchestrator({
                baseUrl: options.url,
                mode: options.mode,
                exploits: options.exploits,
                headless: options.headless,
                screenshotOnSuccess: options.screenshots,
                screenshotOnError: options.screenshots,
                reportFormat: options.output,
                verbose: options.verbose
            });
            
            await orchestrator.execute();
            
            console.log(chalk.green('\n✅ Attack completed successfully!\n'));
            process.exit(0);
            
        } catch (error) {
            console.error(chalk.red('\n❌ Attack failed:'), error.message);
            if (options.verbose) {
                console.error(error.stack);
            }
            process.exit(1);
        }
    });

// List command
program
    .command('list')
    .description('List available exploits')
    .action(async () => {
        console.log(chalk.bold('\n📋 Available Exploits:\n'));
        
        const exploits = require('../config/exploits.json');
        
        exploits.exploits.forEach(exploit => {
            const status = exploit.enabled !== false ? 
                chalk.green('✓') : chalk.red('✗');
            console.log(`${status} ${chalk.bold(exploit.name)}`);
            console.log(`  ${chalk.dim(exploit.description)}`);
            if (exploit.category) {
                console.log(`  Category: ${chalk.blue(exploit.category)}`);
            }
            console.log();
        });
    });

// Report command
program
    .command('report')
    .description('Generate report from previous run')
    .option('-f, --format <format>', 'Report format (json, html)', 'html')
    .action(async (options) => {
        // Implementation for report generation
        console.log(chalk.yellow('Report generation not yet implemented'));
    });

// Parse arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
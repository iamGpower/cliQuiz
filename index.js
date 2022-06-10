#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;
let questionCount = 0;

// Time function
const sleep = (ms = 2000) => {
	return new Promise((r) => {
		return setTimeout(r, ms);
	});
};

async function welcome() {
	// Initializing startup text animation
	const rainbowTitle = chalkAnimation.rainbow('Who Wants To Be A Millionaire?');

	await sleep();
	rainbowTitle.stop();

	// Outlining game plan
	console.log(`
	  ${chalk.bgCyanBright(' HOW TO PLAY ')}
	  I am a process on your computer.
	  If you get questions wrong I will be ${chalk.bgRedBright(' killed ')}
	  So get all the questions right...
	`);
}

// Getting player's name or resorting to a default if not available
async function askName() {
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: "what's your name?",
		default() {
			return 'Player One';
		},
	});

	// Getting player name
	playerName = answers.player_name;
}

async function question1() {
	let successMsg = `Nice work ${playerName}. You just answered question ${++questionCount}. That's a legit answer`;

	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: 'When did Nigeria gain her independence\n',
		choices: [
			'Jan 22nd, 2000',
			'Oct 1st, 1990',
			'Oct 1st, 1960',
			'Dec 31st, 1993',
		],
	});
	return answerHandler(answers.question_1 == 'Oct 1st, 1960', successMsg);
}

async function answerHandler(isCorrect, message) {
	let failureMsg = `${chalk.redBright(
		' 💀 💀 💀 ',
	)} Game over ${playerName}. you lost`;

	const spinner = createSpinner('Checking answer....').start();
	await sleep();
	if (isCorrect) {
		spinner.success({ text: message });
	} else {
		spinner.error({ text: failureMsg });
		process.exit(1);
	}
}

console.clear();
await welcome();
await askName();
await question1();

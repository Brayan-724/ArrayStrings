#!/bin/env node
const { style: { colors: style } } = require("terminal-essencial");
const { TermText, TermMultiText, TermBlankLine } = require("terminal");
const args = process.argv.slice(2);

function showHelp() {
	let tm, t1,t2, tt = "";
	const blueLine = new TermBlankLine({ bg: "blue" }).render()
	    , cyanLine = new TermBlankLine({ bg: "cyan" }).render()
	    , bgBlue = style.bg.blue;
	
	tt += blueLine;
	tt += new TermMultiText(
		{text: " H E L P ",
		 bg: "blue",
		 fg: "white",
		 bright: true}
	).setPadding(-1, -1, "blue").render("\x1b[1m~");
	tt += blueLine;

	tm = new TermText()
		.setBg("blue")
		.setFg("white");
	tt += new TermMultiText(
		{template: tm,
		 text: " Usage: ",
		 bright: true},
		{template: tm,
		 text: "arrayString.js [Mode] <String> "}
	).setPadding(0, -1, "blue").render() + "\n";

	tt += new TermMultiText(
		{template: tm,
		 text: "        arrayString.js -help"}
	).setPadding(0, -1, "blue").render();
	tt += blueLine;
	tt += new TermBlankLine([
		{ text: "    ", bg: "blue" },
		{ text: "    ", bg: "cyan" }
	]).render(TermBlankLine.REPEAT);
	tt += cyanLine;
	
	/* Set template colors to new part */
	tm
		.setBg("cyan")
		.setFg("black");
	
	tt += new TermMultiText(
		{template: tm,
		 text: " Mode (optional): ",
		 bright: true}
	).setPadding(0, -1, "cyan").render();

	tt += new TermMultiText(
		{template: tm,
		 text: "    -strict: ",
		 bright: true},
		{template: tm,
		 text: "ONLY use arrays and operators, string may be very large, some letters/symbols can't made it.",
		 dim: true}
	).setPadding(0, -1, "cyan").render() + bgBlue + "\n";

	tt += new TermMultiText(
		{template: tm,
		 text: "    -normal (default): ",
		 bright: true},
		{template: tm,
		 text: "Use arrays, operators and built-in function, can't use numbers or strings."}
	).setPadding(0, -1, "cyan").render() + bgBlue + "\n";

	tt += new TermMultiText(
		{template: tm,
		 text: "    -light: ",
		 bright: true},
		{template: tm,
		 text: "Use arrays, operators, built-in functions, numbers and strings."}
	).setPadding(0, -1, "cyan").render() + bgBlue + "\n";
	
	tt += cyanLine;

	tt += new TermBlankLine([
		{ text: "    ", bg: "cyan" },
		{ text: "    ", bg: "black" }
	]).render(TermBlankLine.REPEAT);

	console.log(tt);
}

function error(msg) {
	console.log(
                new TermBlankLine([
			{ bg: "crimson", width: "12" },
			{ bg: "red" }
		]).render() +
		new TermMultiText(
			{text: "     Error: ",
                         bg: "crimson",
			 fg: "white",
                         bright: true},
                        {text: " " + msg,
                         bg: "red",
			 fg: "white"}
		).setPadding(0, -1, "red").render() +
                new TermBlankLine([
			{ bg: "crimson", width: "12" },
			{ bg: "red" }
		]).render() + "\n"
        );
}

function init() {
	console.log("Init: ", ...args);
	let mode = 1;
	if(args[0].match(/^\-\-?[a-z]+$/i) != null) {
		const m = (str) => (new RegExp(`^\\-\\-?${str[0]}(${str.slice(1)})?$`, "i"))
		    , _strict = m("strict")
		    , _normal = m("normal")
		    , _light  = m("light");

		if(_strict.test(args[0])) mode = 2;
		else
		if(_normal.test(args[0])) mode = 1;
		else
		if(_light .test(args[0])) mode = 0;
		else return error("That mode don't exist: " + args[0]), console.log("Use \x1b[1marrayString.js -help\x1b[0m to get help."), undefined;
	}

	console.log(mode);
}

// Initialize Help or Init
if(args.length === 0) {
	error("No arguments.");
	showHelp();
	process.exit(1);
} else {
	if(args[0].match(/^\-\-?h(?:elp)?$/i) != null) {
		showHelp();
		process.exit(1);
	} else {
		init();
	}
}

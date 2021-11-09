const num = require("./smartNumber");
const rr = require("../util/minifier");

const _undefined = (s, l) => `([][${l ? "0" : "[]"}]+[])`;
const _false     = (s, l) => "(![]+[])";
const _true      = (s, l) => "(!![]+[])";
const _NaN       = (s, l) => _undefined(s,l) + "*[]";
const _objTag    = (s, l) => "(Object().toString())";

function InvalidStrict(letter) {return `'${letter}' letter is invalid for strict mode`};

const mletters = {
	"a": function(s, l, m) {
		return rr(`(${_false()}[${num(1, !l)}])`, m);
	},
	"b": function(s, l, m) {
		if(s) throw new Error(InvalidStrict("b"));
		return rr(`${_objTag()}[${num(2, !l)}]`, m);
	},
	"c": function(s, l, m) {
		if(s) throw new Error(InvalidStrict("c"));
		if(l) return '"c"';
		return rr(`${_objTag()}[${num(5, !l)}]`, m);
	},
	"h": function(s, l, m) {
		return '"h"';
	}
};

function CapitalLetterHandler(letter) {
	letter = letter.toUpperCase();
	return function(s, l, m) {
		if(s) throw new Error(InvalidStrict(letter));
		return `${mletters[letter.toLowerCase()](s,l,m)}.toUpperCase()`;
	};
}

const Mletters = {
	"A": CapitalLetterHandler("A"),
	"B": CapitalLetterHandler("B"),
	"C": CapitalLetterHandler("C")
}

let ALL = [];
for(let lt in mletters) ALL.push(mletters[lt]());
for(let lt in Mletters) ALL.push(Mletters[lt]());
ALL = ALL.join("+");

module.exports = {...mletters, ...Mletters, ALL};

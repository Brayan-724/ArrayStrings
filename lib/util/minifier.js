const rex = /\s?(\*\*?|[+\-/||\%\^\|])\s?/g;
module.exports = function(str, min = true) {
	return str.replace(rex, min ? "$1" : " $1 ");
}

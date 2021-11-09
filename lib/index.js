const constants = require("./constants");

function runNormal(str) {
}

function run(str, mode = constants.NORMAL) {
	if(typeof mode !== "number") {
		const e = new TypeError("Mode should be number instead of " + typeof mode);
	}
		
	if(mode === constants.STRICT) {
		return runNormal(str);
	} else
	if(mode === constants.LIGHT) 
		return runNormal(str);
	else 
		return runNormal(str);
}

module.exports = run;
run.STRICT = constants.STRICT;
run.NORMAL = constants.NORMAL;
run.LIGHT  = constants.LIGHT;

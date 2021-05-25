var testArray = ['E1', '409731934030135306', '478258433611661322', '699214855823163433', '532512473492750356', '723265524213088412'];
console.log(testArray);
let testArray2 = testArray.slice().join(' ');
console.log(testArray2+"\n\n"+testArray[0]);
if (testArray[0]=="E1") {
	console.log("\ntrue");
} else {
	console.log("\nfalse");
}




var xlsx = require("xlsx");
var wb = xlsx.readFile("./test/specs/TestData/DDT.xlsx")
let totalsheets = wb.SheetNames
console.log(totalsheets);
var sheet = wb.Sheets[totalsheets[0]]
let exceldata = xlsx.utils.sheet_to_json(sheet)
//To get all the values of all the properties use this
console.log(exceldata);
//To get particular Property Data use below format
console.log(exceldata[0].Package_Name);
//If same property is having multiple values use index to specify the row from where to read along with property name
console.log(exceldata[1].Package_Name);


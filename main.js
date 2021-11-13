let fName = document.querySelector('#fName');
let lName = document.querySelector('#lName');
let phone = document.querySelector('#phone');
let email = document.querySelector('#email');
let id = 0,
	contacts = [];
const ls = localStorage,
	toShow = [];
let nm = 'contacts';
setFirstIfNotExist(nm, []);
setFirstIfNotExist(nm + 'id', id);
renderTable(nm);
/* 
catch fields
check for empty fields
check highest id
save item to local storage
*/
function setFirstIfNotExist(key, val) {
	if (!ls[key]) {
		ls.setItem(key, JSON.stringify(val));
		console.log(key + ' initialized...');
	}
}

function getLocalItem(item) {
	// body...
	console.log(item + ' from local...');
	return JSON.parse(ls.getItem(item));
}

document.querySelector('#addBtn').addEventListener('click', (e) => {
	e.preventDefault();
	//setFirstIfNotExist(nm, contacts);

	let data = getDataValues(nm);
	contacts = getLocalItem(nm);
	id = getLocalItem(nm + 'id');
	data['id'] = ++id;
	console.log(contacts);
	if (data) {
		contacts.push(data);
		saveLocalItem(contacts, nm);
		saveLocalItem(id, nm + 'id')
		resetDataValues();
		console.log('updated...');
	}
	else {
		console.log('first and last name can not be empty!!');
		console.log('Not updated...');
	}

})

document.querySelector('#resetBtn').addEventListener('click', (e) => {
	e.preventDefault();
	resetDataValues();
})

function getDataValues(nm) {
	if (!fName.value == '' &&
		!lName.value == '' &&
		(!phone.value == '' ||
			!email.value == '')) {
		console.log('collecting...');
		return {
			fName: fName.value,
			lName: lName.value,
			phone: phone.value,
			email: email.value,
			onTable:false,
		}
	}
	else {
		console.log("error");
		return false
	}
}

function resetDataValues() {
	// body...
	fName.value = "";
	lName.value = "";
	phone.value = "";
	email.value = "";
	console.log('reset...');
	renderTable(nm);
}

function saveLocalItem(obj, nm) {
	//console.log(obj);

	if (nm) {
		let data = JSON.stringify(obj);
		ls.setItem(nm, data);
		return true
	} else {
		return false
	}
}

function renderTable(nm) {
	// body...
	console.log('loading data..');
	let tbl = nm + 'Tbl';
	//tbl = document.querySelector(tbl);
	//let newEntry =
	console.log(tbl);
	let data = getLocalItem(nm);
	if (data.length == 0) {
		console.log(data);
		console.log('data:no data exist...');
	}
	else {
		console.log('data:', data);

		// Find a <table> element with id="myTable":
		let table = document.getElementById(tbl);
		console.log(table);
		for (var i = 0; i < data.length && toShow[i]; i++) {
			// Create an empty <tr> element and add it to the 1st position of the table:
			let row = table.insertRow(i + 1);

			// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
			row.insertCell(0).innerHTML = data[i].fName;
			row.insertCell(1).innerHTML = data[i].lName;
			row.insertCell(2).innerHTML = data[i].phone;
			row.insertCell(3).innerHTML = data[i].email;
			console.log('row ~' + i);
			toShow[i]=true
			// Add some text to the new cells:
			//cell1.innerHTML = "NEW CELL1";
			//cell2.innerHTML = "NEW CELL2";
		}
	}
}
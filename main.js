let fName = document.querySelector('#fName');
let lName = document.querySelector('#lName');
let phone = document.querySelector('#phone');
let email = document.querySelector('#email');
let tblBody = document.querySelector('#contactsTbl tbody');
let id = 0,
	contacts = [],
	toShow = [];
const ls = localStorage;
let nm = 'contacts';
contacts = getLocalItem(nm);
setFirstIfNotExist(nm, []);
setFirstIfNotExist(nm + 'id', id);
renderContactTable(nm, true);
/* 
catch fields
check for empty fields
check highest id
save item to local storage
*/
function renderContactTable() {
	contacts.forEach((lc) => {
		//console.log(lc);
		row = tblBody.insertRow(tblBody.length);
		row.insertCell(0).innerHTML = lc.fName;
		row.insertCell(1).innerHTML = lc.lName;
		row.insertCell(2).innerHTML = lc.phone;
		row.insertCell(3).innerHTML = lc.email;
		row.insertCell(4).innerHTML = lc.id;
		row.insertCell(5).innerHTML = `<button act='del' onClick=removeRecord(this)>&#x232B</button>
										<button act='edit' onClick=editRecord(this)>&#x270E</button>`;
	})
}

function addNewRecord(data) {
	row = tblBody.insertRow();
	row.insertCell(0).innerHTML = data.fName;
	row.insertCell(1).innerHTML = data.lName;
	row.insertCell(2).innerHTML = data.phone;
	row.insertCell(3).innerHTML = data.email;
	row.insertCell(4).innerHTML = data.id;
	row.insertCell(5).innerHTML = `<button act='del' onClick=removeRecord(this)>&#x232B</button>
									<button act='edit'>&#x270E</button>`;
}

function removeRecord(td) {
	console.log(td.parentElement.parentElement);
	row = td.parentElement.parentElement;
	rowId = row.cells[4];
	//remove from local
	console.log('row deleted');
	row.remove();
}
function editRecord(td) {
	row = td.parentElement.parentElement;
	fName.value = row.cells[0].innerHTML;
	lName.value = row.cells[1].innerHTML;
	phone.value = row.cells[2].innerHTML;
	email.value = row.cells[3].innerHTML;
}

document.querySelector('#refresh').addEventListener('click', (e) => {
	e.preventDefault();
	console.log('id:', id);
	console.log('contacts:', contacts);
})

function setFirstIfNotExist(key, val) {
	if (!ls[key]) {
		ls.setItem(key, JSON.stringify(val));
		console.log(key + ' initialized...');
	}
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
		renderContactTable(nm);
	} else {
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
			onTable: false,
		}
	} else {
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
}

function getLocalItem(item) {
	// body...
	console.log(item + ' from local...');
	return JSON.parse(ls.getItem(item));
}

function saveLocalItem(obj, nm) {
	if (nm) {
		let data = JSON.stringify(obj);
		ls.setItem(nm, data);
		return true
	} else {
		return false
	}
}
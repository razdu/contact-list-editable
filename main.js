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
renderContactTable(nm);
/* 
catch fields
check for empty fields
check highest id
save item to local storage
*/
function renderContactTable(nm) {
	contacts.forEach((lc) => {
		console.log(lc);
		toShow.push(lc.id);
	})
	console.log("toShow", toShow);
	console.log(tblBody);
	tblBody.innerText = '';
	let toRow = contacts.filter((c) => {
		let flag = 0;
		for (let i = 1; i <= toShow.length; i++) {
			flag = (c.id + 1) == toShow[i] ? true : false;
			if (flag) {
				return 1
			} else {
				return 0
			}
		}
	})
	console.log('toRow:', toRow);
	for (let i = 0; i < toRow.length; i++) {
		//console.log('id of lc exist');
		tblBody.innerHTML += `<tr>
				<td>${toRow[i].fName}</td>
				<td>${toRow[i].lName}</td>
				<td>${toRow[i].phone}</td>
				<td>${toRow[i].email}</td>
				<td>${toRow[i].onTable}</td></tr>`
		//toRow[i].unshift()
	}
	console.log('toRow:', toRow);
}

document.querySelector('#refresh').addEventListener('click', (e) => {
	e.preventDefault();
	console.log('id:', id);
	console.log('contacts:', contacts);
	console.log('toShow:', toShow);
	console.log(tblBody.rows.length);

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
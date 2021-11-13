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
	let contacts = getLocalItem(nm);
	contacts.forEach((lc) => {
		console.log(lc);
		toShow.push(lc.id);
	})
	console.log("toShow", toShow);
	console.log(tblBody);
	tblBody.innerText = ''
	for (let i = 0; i < toShow.length; i++) {
		for (let j = 0; j < contacts.length; j++) {
			if (toShow[i] == contacts[j].id) {
				//console.log('id of lc exist');
				tblBody.innerHTML += `<tr>
				<td>${contacts[j].fName}</td>
				<td>${contacts[j].lName}</td>
				<td>${contacts[j].phone}</td>
				<td>${contacts[j].email}</td>
				<td>${contacts[j].onTable}</td></tr>`
			}
		}
	}
}

document.querySelector('#refresh').addEventListener('click', (e)=>{
	e.preventDefault();
	console.log('id:',id);
	console.log('contacts:',contacts);
	console.log('toShow:',toShow);
	
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
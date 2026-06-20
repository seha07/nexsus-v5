const users =
JSON.parse(
localStorage.getItem('nexus_users')
|| '[]'
);

function showTab(id){

document
.querySelectorAll('.tab')
.forEach(x =>
x.classList.remove('active')
);

document
.getElementById(id)
.classList.add('active');

}

function renderUsers(){

let t =
document.getElementById(
'userTable'
);

if(!t) return;

t.innerHTML =
users.map(u =>

`<tr>

<td>${u.username || ''}</td>

<td>${u.coins || 0}</td>

</tr>`

).join('');

}

document.getElementById(
'totalUsers'
).innerText =
users.length;

renderUsers();

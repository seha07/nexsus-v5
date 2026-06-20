// ===============================
// NEXUS V6 ULTIMATE ADMIN
// ===============================

let users = JSON.parse(
localStorage.getItem("users")
) || [];

let logs = JSON.parse(
localStorage.getItem("adminLogs")
) || [];

// ===============================
// TAB SYSTEM
// ===============================

function showTab(tabId){

document
.querySelectorAll(".tab")
.forEach(tab=>{

tab.classList.remove("active");

});

document
.getElementById(tabId)
.classList.add("active");

document
.querySelectorAll(".nav-btn")
.forEach(btn=>{

btn.classList.remove("active");

});

event.target.classList.add("active");

}

// ===============================
// TOAST
// ===============================

function toast(message){

const toast =
document.createElement("div");

toast.className = "toast";

toast.innerText = message;

toast.style.position = "fixed";
toast.style.top = "20px";
toast.style.right = "20px";

toast.style.background = "#3b82f6";
toast.style.color = "#fff";

toast.style.padding = "14px 20px";

toast.style.borderRadius = "12px";

toast.style.zIndex = "9999";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},3000);

}

// ===============================
// USERS
// ===============================

function loadUsers(){

const table =
document.getElementById(
"usersTable"
);

if(!table) return;

table.innerHTML = "";

users.forEach(user=>{

table.innerHTML += `

<tr>

<td>${user.id || "-"}</td>

<td>${user.username}</td>

<td>${user.balance || 0}</td>

<td>${user.spins || 0}</td>

<td>${user.ip || "127.0.0.1"}</td>

<td>

<button
onclick="openUser(${user.id})">

Yönet

</button>

</td>

</tr>

`;

});

}

// ===============================
// SEARCH
// ===============================

function searchUsers(){

const input =
document
.querySelector(".search-bar input");

if(!input) return;

const value =
input.value.toLowerCase();

const table =
document.getElementById(
"usersTable"
);

table.innerHTML = "";

users
.filter(user=>{

return (

String(user.id)
.includes(value)

||

user.username
.toLowerCase()
.includes(value)

);

})

.forEach(user=>{

table.innerHTML += `

<tr>

<td>${user.id}</td>

<td>${user.username}</td>

<td>${user.balance}</td>

<td>${user.spins || 0}</td>

<td>${user.ip || "-"}</td>

<td>

<button
onclick="openUser(${user.id})">

Yönet

</button>

</td>

</tr>

`;

});

}

// ===============================
// USER PANEL
// ===============================

function openUser(id){

const user =
users.find(
u=>u.id == id
);

if(!user) return;

const action =
prompt(

`${user.username}

1 = Coin Ver
2 = Spin Ver
3 = Banla`

);

if(action === "1"){

const amount =
parseInt(
prompt("Coin:")
);

user.balance += amount;

saveUsers();

addLog(
`+${amount} coin verildi -> ${user.username}`
);

toast("Coin eklendi");

}

if(action === "2"){

const amount =
parseInt(
prompt("Spin:")
);

user.spins =
(user.spins || 0)
+ amount;

saveUsers();

addLog(
`+${amount} spin verildi -> ${user.username}`
);

toast("Spin eklendi");

}

if(action === "3"){

user.banned = true;

saveUsers();

addLog(
`${user.username} banlandı`
);

toast("Kullanıcı banlandı");

}

loadUsers();

}

// ===============================
// SAVE
// ===============================

function saveUsers(){

localStorage.setItem(
"users",
JSON.stringify(users)
);

}

// ===============================
// LOGS
// ===============================

function addLog(text){

logs.unshift({

date:new Date()
.toLocaleString(),

text:text

});

localStorage.setItem(
"adminLogs",
JSON.stringify(logs)
);

renderLogs();

}

function renderLogs(){

const container =
document.getElementById(
"logsContainer"
);

if(!container) return;

container.innerHTML = "";

logs.forEach(log=>{

container.innerHTML += `

<div
style="
padding:15px;
margin-bottom:10px;
background:#182338;
border-radius:12px;
">

<strong>

${log.date}

</strong>

<br>

${log.text}

</div>

`;

});

}

// ===============================
// SESSIONS
// ===============================

function loadSessions(){

const table =
document.getElementById(
"sessionTable"
);

if(!table) return;

table.innerHTML = "";

users.forEach(user=>{

table.innerHTML += `

<tr>

<td>${user.username}</td>

<td>${user.ip || "-"}</td>

<td>TR</td>

<td>Chrome</td>

<td>Online</td>

</tr>

`;

});

}

// ===============================
// DEMO DATA
// ===============================

function createDemoUsers(){

if(users.length > 0)
return;

users = [

{
id:1,
username:"admin",
balance:100000,
spins:999,
role:"admin",
ip:"127.0.0.1"
},

{
id:2,
username:"test",
balance:2500,
spins:15,
role:"user",
ip:"185.10.25.11"
},

{
id:3,
username:"player1",
balance:5000,
spins:30,
role:"user",
ip:"95.125.88.15"
}

];

saveUsers();

}

// ===============================
// STATS
// ===============================

function loadStats(){

const statCards =
document.querySelectorAll(
".stat-card h3"
);

if(statCards.length < 6)
return;

const totalUsers =
users.length;

const totalCoins =
users.reduce(

(a,b)=>

a + (b.balance || 0),

0

);

const totalSpins =
users.reduce(

(a,b)=>

a + (b.spins || 0),

0

);

statCards[0].innerText =
totalUsers;

statCards[1].innerText =
Math.floor(
totalUsers * 0.65
);

statCards[2].innerText =
totalCoins;

statCards[3].innerText =
totalSpins;

statCards[4].innerText =
Math.floor(
Math.random()*500
);

statCards[5].innerText =
Math.floor(
Math.random()*100
);

}

// ===============================
// SEARCH BUTTON
// ===============================

document
.addEventListener(
"click",
e=>{

if(
e.target.innerText
.includes("Ara")
){

searchUsers();

}

}
);

// ===============================
// INIT
// ===============================

createDemoUsers();

loadUsers();

renderLogs();

loadSessions();

loadStats();

console.log(
"NEXUS V6 ADMIN READY"
);

/* ==========================
   NEXUS V5 ULTIMATE ADMIN
========================== */

let users = [];
let logs = [];
let notifications = [];

/* ==========================
   LOAD DATA
========================== */

function loadData(){

    try{

        users =
        JSON.parse(
            localStorage.getItem("nexus_users")
        ) || [];

    }catch{

        users=[];

    }

    try{

        logs =
        JSON.parse(
            localStorage.getItem("nexus_logs")
        ) || [];

    }catch{

        logs=[];

    }

    try{

        notifications =
        JSON.parse(
            localStorage.getItem("nexus_notifications")
        ) || [];

    }catch{

        notifications=[];

    }

}

/* ==========================
   SAVE DATA
========================== */

function saveUsers(){

    localStorage.setItem(
        "nexus_users",
        JSON.stringify(users)
    );

}

function saveLogs(){

    localStorage.setItem(
        "nexus_logs",
        JSON.stringify(logs)
    );

}

function saveNotifications(){

    localStorage.setItem(
        "nexus_notifications",
        JSON.stringify(notifications)
    );

}

/* ==========================
   LOG SYSTEM
========================== */

function addLog(message){

    const log = {

        date:new Date().toLocaleString(),

        message:message

    };

    logs.unshift(log);

    if(logs.length > 500){

        logs = logs.slice(0,500);

    }

    saveLogs();

    renderLogs();

}

/* ==========================
   SIDEBAR
========================== */

function showSection(id){

    document
    .querySelectorAll(".section")
    .forEach(section=>{

        section.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList.add("active");

    document
    .querySelectorAll(".menu-btn")
    .forEach(btn=>{

        btn.classList.remove("active");

    });

    event.target.classList.add("active");

    document.getElementById(
        "pageTitle"
    ).innerText =
    event.target.innerText;

}

/* ==========================
   DASHBOARD
========================== */

function loadDashboard(){

    document.getElementById(
        "totalUsers"
    ).innerText =
    users.length;

    let totalCoins = 0;

    let totalSpins = 0;

    users.forEach(user=>{

        totalCoins += Number(
            user.coins || 0
        );

        totalSpins += Number(
            user.spinRights ||
            user.spins ||
            0
        );

    });

    document.getElementById(
        "totalCoins"
    ).innerText =
    totalCoins.toLocaleString();

    document.getElementById(
        "totalSpins"
    ).innerText =
    totalSpins.toLocaleString();

    document.getElementById(
        "todayLogins"
    ).innerText =
    logs.length;

}

/* ==========================
   USERS
========================== */

function renderUsers(){

    const table =
    document.getElementById(
        "userTable"
    );

    if(!table) return;

    const search =
    document.getElementById(
        "userSearch"
    ).value.toLowerCase();

    table.innerHTML = "";

    users
    .filter(user=>{

        return user.username
        ?.toLowerCase()
        .includes(search);

    })
    .forEach(user=>{

        table.innerHTML += `

        <tr>

            <td>${user.id || "-"}</td>

            <td>${user.username}</td>

            <td>${user.coins || 0}</td>

            <td>

            ${
                user.spinRights ||
                user.spins ||
                0
            }

            </td>

            <td>

            ${
                user.banned
                ? "🚫 BAN"
                : "✅ AKTİF"
            }

            </td>

            <td>

                <button
                class="action-btn coin-btn"
                onclick="addCoin(${user.id})">

                +Coin

                </button>

                <button
                class="action-btn edit-btn"
                onclick="addSpin(${user.id})">

                +Spin

                </button>

                <button
                class="action-btn ban-btn"
                onclick="toggleBan(${user.id})">

                Ban

                </button>

            </td>

        </tr>

        `;

    });

}

/* ==========================
   COIN
========================== */

function addCoin(id){

    let amount =
    Number(
        prompt(
            "Eklenecek coin miktarı:"
        )
    );

    if(!amount) return;

    const user =
    users.find(
        u=>u.id===id
    );

    if(!user) return;

    user.coins =
    Number(user.coins || 0)
    + amount;

    saveUsers();

    renderUsers();

    loadDashboard();

    addLog(
        `${user.username}
        kullanıcısına
        ${amount}
        coin eklendi`
    );

}

/* ==========================
   SPIN
========================== */

function addSpin(id){

    let amount =
    Number(
        prompt(
            "Verilecek spin hakkı:"
        )
    );

    if(!amount) return;

    const user =
    users.find(
        u=>u.id===id
    );

    if(!user) return;

    user.spinRights =
    Number(
        user.spinRights || 0
    ) + amount;

    saveUsers();

    renderUsers();

    loadDashboard();

    addLog(
        `${user.username}
        kullanıcısına
        ${amount}
        spin verildi`
    );

}

/* ==========================
   BAN SYSTEM
========================== */

function toggleBan(id){

    const user =
    users.find(
        u=>u.id===id
    );

    if(!user) return;

    user.banned =
    !user.banned;

    saveUsers();

    renderUsers();

    addLog(

        `${user.username}

        hesabı

        ${user.banned
        ? "banlandı"
        : "ban kaldırıldı"}`

    );

}

/* ==========================
   NOTIFICATION
========================== */

function sendNotification(){

    const text =
    document
    .getElementById(
        "notificationText"
    )
    .value
    .trim();

    if(!text){

        alert(
            "Bildirim boş olamaz"
        );

        return;

    }

    notifications.unshift({

        date:new Date()
        .toLocaleString(),

        text:text

    });

    saveNotifications();

    document.getElementById(
        "notificationText"
    ).value="";

    addLog(
        "Yeni bildirim gönderildi"
    );

    alert(
        "Bildirim gönderildi"
    );

}

/* ==========================
   LOGS
========================== */

function renderLogs(){

    const container =
    document.getElementById(
        "logContainer"
    );

    if(!container) return;

    container.innerHTML = "";

    logs.forEach(log=>{

        container.innerHTML += `

        <div class="log-item">

            <strong>

            ${log.date}

            </strong>

            <br><br>

            ${log.message}

        </div>

        `;

    });

}

/* ==========================
   LOGOUT
========================== */

function logout(){

    if(
        confirm(
            "Çıkış yapmak istiyor musun?"
        )
    ){

        localStorage.removeItem(
            "nexus_admin"
        );

        location.href =
        "index.html";

    }

}

/* ==========================
   INIT
========================== */

loadData();

loadDashboard();

renderUsers();

renderLogs();

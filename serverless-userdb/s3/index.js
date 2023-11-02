const username = document.getElementById("username");
const email = document.getElementById("email");

const registerinfo = document.getElementById("postedinfo");
const feedbackdiv = document.getElementById("feedbacks");
const alluserinfodiv = document.getElementById("allusers");

const regbutton = document.getElementById("regbutton");
const userinfobtn = document.getElementById("userinfobtn");
const showallbtn = document.getElementById("showall");
const deletebutton = document.getElementById("deletebutton");

const urlbase = "https://e12kv8gwg9.execute-api.eu-central-1.amazonaws.com/";


regbutton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("registering user: " + username.value + " with email: " + email.value);
    const postdata = {
        "username": username.value,
        "email": email.value
    }
    if (username.value == "" || email.value == "") {
        registerinfo.innerText = "Please enter username & email";
        return;
    };
    try {
        const response = await fetch(`${urlbase}adduser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postdata),
        });
        const data = await response.json();
        flashborder();
        hidealluserdiv();
        registerinfo.innerText = `User ${username.value} with email ${email.value} successfully registered!`;
    } catch (err) {
        console.log(err);
    };
});
userinfobtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("getting info about: " + username.value);
    try {
        const response = await fetch(`${urlbase}?username=${username.value}`, {
            method: "GET"
        });
        const data = await response.json();
        const info = JSON.parse(data.body);
        hidealluserdiv();
        flashborder();
        if (!info.Item) {
            registerinfo.innerText = "User not found";
            return;
        };
        const dbusername = info.Item.username.S;
        const dbmail = info.Item.email.S;
        const dbregdate = info.Item.info.S;
        registerinfo.innerHTML = `<p>User ${dbusername} with email ${dbmail}, well well, ${dbregdate}</p>`;
    } catch (err) {
        console.log(err);
    };
});
showallbtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${urlbase}`, {
            method: "GET"
        });
        const data = await response.json();
        const users = data.Items;
        alluserinfodiv.style.display = "flex";
        alluserinfodiv.innerHTML = "";
        flashborder();
        users.forEach(element => {
            alluserinfodiv.innerHTML += `<div class="users mpg"><p>${element.username.S}</p><br><p>${element.email.S}</p><br><p>${element.info.S}</p></div>`;
        });
    } catch (err) {
        console.log(err);
    };
});
deletebutton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("deleting user: " + username.value);
    try {
        const response = await fetch(`${urlbase}ciao/?username=${username.value}`, {
            method: "DELETE"
        });
        const data = await response.json();
        hidealluserdiv();
        flashborder();
        registerinfo.innerText = `User ${username.value} with email ${email.value} successfully deleted!`;
    } catch (err) {
        console.log(err);
    };
});

function flashborder() {
    feedbackdiv.style.borderRadius = "28%";
    feedbackdiv.style.border = "2px solid #BD5532";
    setTimeout(() => {
        feedbackdiv.style.border = "solid 1px darkgray";
        feedbackdiv.style.borderRadius = "28%";
    }, 400);
};
function hidealluserdiv() {
    alluserinfodiv.style.display = "none";
}
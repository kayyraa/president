const project = {
    id: "563441",
    v: "v6.3.9"
};

function notification(text, duration) {
    const txt = document.getElementById("notification-text");
    const bor = document.getElementById("notification-border");
    bor.style.top = "10%";
    txt.innerHTML = text;

    setTimeout(() => {
        bor.style.top = "-15%";
    }, duration);

    return false;
}

function createParticle(x, y, lifetime) {
    let opacity = 1;
    let rotation = 0;
    let rotateClockwise = Math.random() < 0.5;

    const particle = document.createElement("img");
    particle.src = "./images/money.svg";
    particle.style.position = "fixed";
    particle.style.width = "48px";
    particle.style.height = "48px";
    particle.style.userSelect = "none";
    particle.draggable = "false";
    particle.style.left = x - 15 + "px";
    particle.style.top = y - 15 + "px";
    document.body.appendChild(particle);

    const intervalId = setInterval(() => {
        opacity -= 0.0155;
        if (rotateClockwise) {
            rotation += 1;
        } else {
            rotation -= 1;
        }
        if (opacity <= 0) {
            clearInterval(intervalId);
            document.body.removeChild(particle);
        } else {
            particle.style.transform = `rotate(${rotation}deg)`;
            particle.style.opacity = opacity;
        }
    }, lifetime);
}

function confirmAll() {
    const defaultValues = {
        "563441_vote": "0",
        "563441_auth": "100",
        "563441_money": "0",
        "563441_day": "0",
        "563441_png": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/National_Socialist_swastika_%28framed_in_red%29.svg/220px-National_Socialist_swastika_%28framed_in_red%29.svg.png",
        "563441_pnm": "Nazi Party"
    };

    for (const key in defaultValues) {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, defaultValues[key]);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const moneyLabel = document.getElementById("money-label");
    const authLabel = document.getElementById("authority-label");
    const authIcon = document.getElementById("authority-icon");
    const voteLabel = document.getElementById("vote-label");
    const versLabel = document.getElementById("version");
    const voteIcon = document.getElementById("vote-icon");
    const dayLabel = document.getElementById("day-count");
    
    const fault = document.getElementById("fault");

    let actions = {
        saved: null
    }

    let decreation = 10;
    let addition = 5;
    
    confirmAll();

    versLabel.innerHTML = project.v;

    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    })

    document.addEventListener("click", function(e) {
        let x = e.clientX;
        let y = e.clientY;
        createParticle(x, y, 25)

        if (localStorage.getItem(`${project.id}_auth`) <= 100) {
            localStorage.setItem(`${project.id}_auth`, parseInt(localStorage.getItem(`${project.id}_auth`), 10) + addition / 3.5)
        }

        if (localStorage.getItem(`${project.id}_vote`) <= 99) {
            localStorage.setItem(`${project.id}_vote`, parseInt(localStorage.getItem(`${project.id}_vote`), 10) + addition / 5);
        }

        localStorage.setItem(`${project.id}_money`, (parseInt(localStorage.getItem(`${project.id}_money`), 10) + addition).toString());
    });

    function day() {
        let d = localStorage.getItem(`${project.id}_day`);
        localStorage.setItem(`${project.id}_day`, parseInt(d) + 1);

        setTimeout(() => {
            day();
        }, 2000);
    }

    function chuck_down() {
        if (localStorage.getItem(`${project.id}_auth`) < 25) {
            if (parseInt(localStorage.getItem(`${project.id}_money`), 10) > decreation) {
                localStorage.setItem(`${project.id}_money`, parseInt(localStorage.getItem(`${project.id}_money`), 10) - decreation);
                fault.src = "./images/down.svg";
            }
        } else {
            fault.src = "./images/up.svg";
        }

        if (localStorage.getItem(`${project.id}_auth`) > 0) {
            localStorage.setItem(`${project.id}_auth`, Math.max(0, parseFloat(localStorage.getItem(`${project.id}_auth`)) - 0.75));
        }

        if (localStorage.getItem(`${project.id}_vote`) > 0) {
            localStorage.setItem(`${project.id}_vote`, Math.max(0, parseFloat(localStorage.getItem(`${project.id}_vote`)) - 1));
        }

        setTimeout(() => {
            chuck_down();
        }, 1000);
    }

    function refresh() {
        moneyLabel.innerHTML = parseInt(localStorage.getItem(`${project.id}_money`), 10);
        authLabel.innerHTML = parseInt(localStorage.getItem(`${project.id}_auth`), 10) + "%";
        voteLabel.innerHTML = parseInt(localStorage.getItem(`${project.id}_vote`), 10) + "%";
        dayLabel.innerHTML = "DAY " + parseInt(localStorage.getItem(`${project.id}_day`));

        if (localStorage.getItem(`${project.id}_auth`) < 25) {
            if (parseInt(localStorage.getItem(`${project.id}_money`), 10) > decreation) {
                fault.src = "./images/down.svg";
            }
        } else {
            fault.src = "./images/up.svg";
        }

        if (parseInt(localStorage.getItem(`${project.id}_auth`)) > 50) {
            authLabel.style.color = "#D9D9D9";
            authIcon.src = "./images/bank.svg";
        } else if (parseInt(localStorage.getItem(`${project.id}_auth`)) < 50) {
            authLabel.style.color = "#e07777";
            authIcon.src = "./images/bank_red.svg";
        }

        if (parseInt(localStorage.getItem(`${project.id}_auth`)) > 25) {
            authLabel.style.color = "#D9D9D9";
            authIcon.src = "./images/bank.svg";
        } else if (parseInt(localStorage.getItem(`${project.id}_auth`)) < 25) {
            authLabel.style.color = "#616060";
            authIcon.src = "./images/bank_blc.svg";
        }

        if (parseInt(localStorage.getItem(`${project.id}_vote`)) > 25) {
            voteIcon.src = "./images/vote.svg";
            voteLabel.style.color = "#D9D9D9";
            if (actions.saved == false) {
                notification("The Party Saved!", 4500);
                actions.saved = true;
            }
        } else if (parseInt(localStorage.getItem(`${project.id}_vote`)) < 25) {
            voteIcon.src = "./images/vote_red.svg";
            voteLabel.style.color = "#e07777";
            actions.saved = false;
        }

        if (parseInt(localStorage.getItem(`${project.id}_vote`)) > 10) {
            if (actions.saved == false) {
                voteIcon.src = "./images/vote_red.svg";
                voteLabel.style.color = "#e07777";
            }
        } else if (parseInt(localStorage.getItem(`${project.id}_vote`)) < 10) {
            if (actions.saved == false) {
                voteIcon.src = "./images/vote_blc.svg";
                voteLabel.style.color = "#616060";
            }
        }

        setTimeout(refresh, 50);
    }    

    day();
    chuck_down();
    refresh();
});
const project = {
    id: "563441",
    v: "v2.9.1"
};

function createParticle(x, y, color, lifetime) {
    let opacity = 1;
    let rotation = 0;
    let rotateClockwise = Math.random() < 0.5;

    const particle = document.createElement("div");
    particle.style.borderLeft = "14px solid transparent";
    particle.style.borderRight = "14px solid transparent";
    particle.style.borderBottom = `25px solid ${color}`;
    particle.style.position = "absolute";
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    document.body.appendChild(particle);

    const intervalId = setInterval(() => {
        opacity -= 0.025;
        if (rotateClockwise) {
            rotation += 2;
        } else {
            rotation -= 2;
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

document.addEventListener("DOMContentLoaded", function() {
    const moneyLabel = document.getElementById("money-label");
    const authLabel = document.getElementById("authority-label");
    const versLabel = document.getElementById("version");
    let addition = 5;

    versLabel.innerHTML = project.v;

    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    })

    document.addEventListener("click", function(e) {
        let x = e.clientX;
        let y = e.clientY;
        createParticle(x, y, "green", 25)

        if (localStorage.getItem(`${project.id}_auth`) > 100) {
            
        } else {
            localStorage.setItem(`${project.id}_auth`, parseInt(localStorage.getItem(`${project.id}_auth`), 10) + addition / 3.5)
        }

        localStorage.setItem(`${project.id}_money`, (parseInt(localStorage.getItem(`${project.id}_money`), 10) + addition).toString());
    });

    function chuck_down() {
        if (localStorage.getItem(`${project.id}_auth`) < 25) {
            localStorage.setItem(`${project.id}_money`, localStorage.getItem(`${project.id}_money`) - 5);
        }

        if (localStorage.getItem(`${project.id}_auth`) < 0) {

        } else if (localStorage.getItem(`${project.id}_auth`) > 0) {
            localStorage.setItem(`${project.id}_auth`, localStorage.getItem(`${project.id}_auth`) - 0.5)
        } else if (localStorage.getItem(`${project.id}_auth`) > 5) {
            localStorage.setItem(`${project.id}_auth`, localStorage.getItem(`${project.id}_auth`) - 0.125)
        }

        setTimeout(() => {
            chuck_down();
        }, 550);
    }

    function refresh() {
        moneyLabel.innerHTML = parseInt(localStorage.getItem(`${project.id}_money`), 10)
        authLabel.innerHTML = parseInt(localStorage.getItem(`${project.id}_auth`), 10) + "%";

        if (parseInt(localStorage.getItem(`${project.id}_auth`)) > 50) {
            authLabel.style.color = "#D9D9D9";
        } else if (parseInt(localStorage.getItem(`${project.id}_auth`)) < 50) {
            authLabel.style.color = "#e07777";
        }

        setTimeout(refresh, 50);
    }    

    chuck_down();
    refresh();
});
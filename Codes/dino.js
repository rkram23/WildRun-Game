let board;
let boardWidth = 750;
let boardHeight = 250;
let context;

let dinoWidth = 88;
let dinoHeight = 94;
let dinoX = 50;
let dinoY = boardHeight - dinoHeight;
let dinoImg;
let runVideo;
let jumpVideo;

let dino = {
    x: dinoX,
    y: dinoY,
    width: dinoWidth,
    height: dinoHeight
};

let cactusArray = [];

let cactus1Width = 34;
let cactus2Width = 69;
let cactus3Width = 102;

let cactusHeight = 70;
let cactusX = 700;
let cactusY = boardHeight - cactusHeight;

let cactus1Img;
let cactus2Img;
let cactus3Img;

let velocityX = -10;
let velocityY = 0;
let gravity = 0.4;

let isGameOver = false;
let score = 0;
let highScore = 0;
let username; // Make username global
let scoreContainer;

window.onload = function () {
    // Retrieve the username from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    username = urlParams.get('name');

    // Display the username at the left top corner
    const usernameContainer = document.createElement("div");
    usernameContainer.style.position = "absolute";
    usernameContainer.style.top = "10px";
    usernameContainer.style.left = "500px";
    usernameContainer.style.color = "black";
q    usernameContainer.textContent = "User: " + username;
    document.body.appendChild(usernameContainer);

    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d");

    runVideo = document.createElement("video");
    runVideo.src = "./img/Animation.webm"; // Update with your video source
    runVideo.loop = true;
    runVideo.autoplay = true;

    jumpVideo = document.createElement("video");
    jumpVideo.src = "./img/Animation.webm"; // Update with your video source
    jumpVideo.loop = false; // You may set it to true if needed
    jumpVideo.autoplay = true;

    runVideo.addEventListener('loadeddata', function () {
        console.log('runVideo loaded');
        jumpVideo.addEventListener('loadeddata', function () {
            console.log('jumpVideo loaded');
            dinoImg = runVideo;
            dinoImg.onload = function () {
                context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
            };

            cactus1Img = new Image();
            cactus1Img.src = "./img/dragon.png";

            cactus2Img = new Image();
            cactus2Img.src = "./img/blue.png";

            cactus3Img = new Image();
            cactus3Img.src = "./img/shadow.png";

            requestAnimationFrame(draw);
            setInterval(placeCactus, 900);
            document.addEventListener("keydown", moveDino);

            scoreContainer = document.createElement("div");
            scoreContainer.id = "scoreContainer";
            document.body.appendChild(scoreContainer);
        });
    });
};


function draw() {
    context.clearRect(0, 0, board.width, board.height);

    if (!isGameOver) {
        velocityY += gravity;
        dino.y = Math.min(dino.y + velocityY, dinoY);
        context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

        for (let i = 0; i < cactusArray.length; i++) {
            let cactus = cactusArray[i];
            cactus.x += velocityX;
            context.drawImage(cactus.img, cactus.x, cactus.y, cactus.width, cactus.height);

            if (detectCollision(dino, cactus)) {
                isGameOver = true;
                showRandomReaction(gameOverReactions);
                dinoImg = new Image();
                dinoImg.src = "./img/j-over.png";
                dinoImg.onload = function () {
                    context.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
                };
            }
        }

        if (dino.y === dinoY && dinoImg.src === jumpVideo.src) {
            dinoImg = runVideo;
            showRandomReaction(runningReactions);
        }
    }

    if (isGameOver) {
        // Display game over container
        context.fillStyle = "red";
        context.font = "40px cursive"; // Updated font
        const gameOverText = "GAME OVER";
        context.fillText(gameOverText, boardWidth / 2 - 100, boardHeight / 2 - 20);
    
        // Fetch data from store_score.php
        fetch('store_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, score: score }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);
            console.log('Type of data:', typeof data);
        
            // Check if the data is not empty and has the expected properties
            if (data && typeof data === 'object' && 'presentScore' in data) {
                // Display the present score
                context.font = "20px cursive";
                const presentScoreText = "Present Score: " + data.presentScore;
                context.fillText(presentScoreText, boardWidth / 2 - 60, boardHeight / 2 + 20);
        
                // Display the username of the present player
                context.font = "20px Arial";
                const presentUserText = "User: " + username; // Use the global variable directly
                context.fillText(presentUserText, boardWidth / 2 - 60, boardHeight / 2 + 60);
        
                // Display the high scorer's username
                context.font = "20px Arial";
                const highScoreUserText = "High Score by: " + data.highScoreUser;
                context.fillText(highScoreUserText, boardWidth / 2 - 60, boardHeight / 2 + 100);
        
                // Display the high score
                context.font = "20px Arial";
                const highScoreText = "High Score: " + data.highScore;
                context.fillText(highScoreText, boardWidth / 2 - 90, boardHeight / 2 + 140);
            } else {
                // Handle case where data is empty or does not have the expected properties
                console.error('Invalid data format received from store_score.php', data);
            }
        })
        .catch(error => console.error('Error fetching data from store_score.php:', error));
    
        // Display restart button
        const restartButton = document.getElementById("restartButton");
        restartButton.style.display = "block";
    
        // Display the score board in the separate container
        scoreContainer.innerHTML = `
            <div id="scoreBoardContainer">
                <p>Game Over</p>
            </div>
        `;
    
        // Style the score board container
        const scoreBoardContainer = document.getElementById("scoreContainer");
        scoreBoardContainer.style.fontWeight = "bold"; // Make the font bold
    
        return;
    }
    
    // Display the current score
    context.fillStyle = "black";
    context.font = "30px Arial"; // Updated font
    score++;
    context.fillText("Score: " + score, 5, 20);
    requestAnimationFrame(draw);
}
function moveDino(e) {
    if (isGameOver) {
        return;
    }

    if ((e.code == "Space" || e.code == "ArrowUp") && dino.y == dinoY) {
        velocityY = -10;
        dinoImg = jumpVideo;
        showRandomReaction(jumpingReactions);
    } else if (e.code == "ArrowDown" && dino.y == dinoY) {
        // Duck
    }
}

function placeCactus() {
    if (isGameOver) {
        return;
    }

    let cactus = {
        img: null,
        x: cactusX,
        y: cactusY,
        width: null,
        height: cactusHeight
    };

    let placeCactusChance = Math.random();

    if (placeCactusChance > 0.90) {
        cactus.img = cactus3Img;
        cactus.width = cactus3Width;
        cactusArray.push(cactus);
    } else if (placeCactusChance > 0.70) {
        cactus.img = cactus2Img;
        cactus.width = cactus2Width;
        cactusArray.push(cactus);
    } else if (placeCactusChance > 0.50) {
        cactus.img = cactus1Img;
        cactus.width = cactus1Width;
        cactusArray.push(cactus);
    }

    if (cactusArray.length > 5) {
        cactusArray.shift();
    }
}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function showNotification(textArray, imageArray, duration) {
    const notificationDiv = document.createElement("div");
    notificationDiv.className = "notification";

    // Create and append text elements
    textArray.forEach(text => {
        const textElement = document.createElement("p");
        textElement.textContent = text;
        notificationDiv.appendChild(textElement);
    });

    // Create and append video or image elements
    imageArray.forEach(image => {
        const imageElement = document.createElement(image.tagName || "img");
        imageElement.src = image.src;
        if (image.tagName === "video") {
            imageElement.autoplay = true;
            imageElement.loop = image.loop || false; // You may set it to true if needed
        }
        notificationDiv.appendChild(imageElement);
    });

    // Append notification div to the body
    document.body.appendChild(notificationDiv);

    // Remove the notification after the specified duration
    setTimeout(() => {
        document.body.removeChild(notificationDiv);
    }, duration);
}

let runningReactions = [
    { text: "Keep Going!", imageSrc: "./img/keepgoing.png" },
    { text: "You're Boss!", imageSrc: "./img/boss.png" }
    // Add more as needed
];

let jumpingReactions = [
    { text: "Genius!", imageSrc: "./img/genius.png" },
    { text: "ooo myy godd", imageSrc: "./img/omg.png" }
    // Add more as needed
];

let gameOverReactions = [
    { text: "Seriously Bruhh!", imageSrc: "./img/seriously.png" },
    { text: "you tried well!", imageSrc: "./img/tried.png" }
    // Add more as needed
];



function showRandomReaction(reactionArray) {
    if (reactionArray.length > 0) {
        let randomIndex = Math.floor(Math.random() * reactionArray.length);
        let reaction = reactionArray[randomIndex];

        // Create an object for images or videos
        let mediaElement = { src: reaction.imageSrc };

        // Show the notification
        showNotification([reaction.text], [mediaElement], 5000);
    }
}


function restartGame() {
    // Send score and username to PHP script
    fetch('store_score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'username=' + encodeURIComponent(username) + '&score=' + encodeURIComponent(score),
    }).then(response => response.text()).then(data => {
        console.log(data); // Handle the response from the server if needed
    });
    location.reload();
    
}
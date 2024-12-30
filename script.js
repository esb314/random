window.onload = function() {
    const hider = document.getElementById('hider');
    const seeker = document.getElementById('seeker');
    const messageBox = document.getElementById('message');
    const gameContainer = document.getElementById('game-container');

    // 게임 설정
    let hiderX = 300, hiderY = 200; // 숨은 사람의 초기 위치
    let seekerX = 100, seekerY = 100; // 찾는 사람의 초기 위치
    const speed = 5; // 이동 속도
    let gameStarted = false;

    // 숨은 사람의 위치를 무작위로 설정
    function setHiderPosition() {
        hiderX = Math.random() * (gameContainer.clientWidth - 40);
        hiderY = Math.random() * (gameContainer.clientHeight - 40);
        hider.style.left = hiderX + 'px';
        hider.style.top = hiderY + 'px';
    }

    // 게임 시작
    document.addEventListener('keydown', (e) => {
        if (!gameStarted) {
            // 숨은 사람이 아무 키나 눌러서 시작
            gameStarted = true;
            setHiderPosition();
            messageBox.textContent = "게임이 시작되었습니다! 찾는 사람은 화살표 키로 움직여 보세요.";
        }

        // 찾는 사람의 이동
        if (e.key === 'ArrowUp') seekerY -= speed;
        if (e.key === 'ArrowDown') seekerY += speed;
        if (e.key === 'ArrowLeft') seekerX -= speed;
        if (e.key === 'ArrowRight') seekerX += speed;

        // 이동 제한: 화면을 벗어나지 않도록
        seekerX = Math.max(0, Math.min(seekerX, gameContainer.clientWidth - 40));
        seekerY = Math.max(0, Math.min(seekerY, gameContainer.clientHeight - 40));

        // 찾는 사람 위치 업데이트
        seeker.style.left = seekerX + 'px';
        seeker.style.top = seekerY + 'px';

        // 충돌 감지
        checkCollision();
    });

    // 충돌 감지 함수
    function checkCollision() {
        const seekerRect = seeker.getBoundingClientRect();
        const hiderRect = hider.getBoundingClientRect();

        if (
            seekerRect.top < hiderRect.bottom &&
            seekerRect.bottom > hiderRect.top &&
            seekerRect.left < hiderRect.right &&
            seekerRect.right > hiderRect.left
        ) {
            // 찾은 경우
            messageBox.textContent = "찾았다! 숨바꼭질에서 승리했습니다!";
            resetGame();
        }
    }

    // 게임 리셋 함수
    function resetGame() {
        // 초기 위치로 리셋
        seekerX = 100;
        seekerY = 100;
        seeker.style.left = seekerX + 'px';
        seeker.style.top = seekerY + 'px';

        setHiderPosition();
        gameStarted = false;
        messageBox.textContent += " 게임이 리셋되었습니다. 다시 시작하려면 아무 키나 누르세요.";
    }
};

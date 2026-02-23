import '../../css/content/Hidden.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const CANVAS_SIZE = [400, 400];
const SNAKE_START = [[8, 7], [8, 8]];
const APPLE_START = [8, 3];
const SCALE = 20;
const SPEED = 100;

const Hidden = () => {
    const canvasRef = useRef();
    const [snake, setSnake] = useState(SNAKE_START);
    const [apple, setApple] = useState(APPLE_START);
    const [dir, setDir] = useState([0, -1]); // Moving Up
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    // --- Game Logic Functions ---

    const startGame = () => {
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setDir([0, -1]);
        setScore(0);
        setGameOver(false);
    };

    const endGame = () => {
        setGameOver(true);
    };

    const createApple = () =>
        apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

    const moveSnake = useCallback(({ keyCode }) => {
        // 37: Left, 38: Up, 39: Right, 40: Down
        switch (keyCode) {
            case 37: // Left
                if (dir[0] !== 1) setDir([-1, 0]);
                break;
            case 38: // Up
                if (dir[1] !== 1) setDir([0, -1]);
                break;
            case 39: // Right
                if (dir[0] !== -1) setDir([1, 0]);
                break;
            case 40: // Down
                if (dir[1] !== -1) setDir([0, 1]);
                break;
            default:
                break;
        }
    }, [dir]);

    // --- Game Loop ---
    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);

        const gameLoop = setInterval(() => {
            if (gameOver) return;

            const snakeCopy = JSON.parse(JSON.stringify(snake));
            const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];

            // Collision Check (Walls)
            if (
                newSnakeHead[0] * SCALE >= CANVAS_SIZE[0] ||
                newSnakeHead[0] < 0 ||
                newSnakeHead[1] * SCALE >= CANVAS_SIZE[1] ||
                newSnakeHead[1] < 0
            ) {
                return endGame();
            }

            // Collision Check (Self)
            for (const segment of snakeCopy) {
                if (segment[0] === newSnakeHead[0] && segment[1] === newSnakeHead[1]) {
                    return endGame();
                }
            }

            snakeCopy.unshift(newSnakeHead);

            // Check Apple Collision
            if (newSnakeHead[0] === apple[0] && newSnakeHead[1] === apple[1]) {
                setScore((prev) => prev + 1);
                let newApple = createApple();
                // Prevent apple spawning on snake
                while (checkCollision(newApple, snakeCopy)) {
                    newApple = createApple();
                }
                setApple(newApple);
            } else {
                snakeCopy.pop();
            }

            setSnake(snakeCopy);

            // Drawing
            context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

            // Draw Snake
            context.fillStyle = '#4fc3f7';
            snakeCopy.forEach(([x, y]) => context.fillRect(x, y, 1, 1));

            // Draw Apple
            context.fillStyle = '#ff6b6b';
            context.fillRect(apple[0], apple[1], 1, 1);

        }, SPEED);

        return () => clearInterval(gameLoop);
    }, [snake, apple, dir, gameOver]);

    // Key Listener
    useEffect(() => {
        window.addEventListener('keydown', moveSnake);
        return () => {
            window.removeEventListener('keydown', moveSnake);
        };
    }, [moveSnake]);

    // Helper to check collision with array
    const checkCollision = (piece, snk) => {
        for (const segment of snk) {
            if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
        }
        return false;
    };

    return (
        <div className="arcade-container" tabIndex="0">
            <div className="crt-overlay"></div>
            <h1 className="arcade-title">System Monitor: <span className="blink">ACTIVE</span></h1>

            <div className="game-board-wrapper">
                <canvas
                    ref={canvasRef}
                    width={`${CANVAS_SIZE[0]}px`}
                    height={`${CANVAS_SIZE[1]}px`}
                />
                {gameOver && (
                    <div className="game-over-screen">
                        <h2>SEGMENTATION FAULT</h2>
                        <p>Memory Leaked: {score} MB</p>
                        <button onClick={startGame}>Reboot System</button>
                    </div>
                )}
            </div>

            <div className="controls-hint">
                [USE ARROW KEYS TO ALLOCATE MEMORY]
            </div>
        </div>
    );
};

export default Hidden;
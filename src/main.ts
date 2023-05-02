import {fromEvent, map} from "rxjs"
import "./style.css"

const cursorPosition = { x: 0, y: 0 };
const board = document.querySelector('#board') as HTMLCanvasElement;
const boardContext = board.getContext('2d') as CanvasRenderingContext2D;
boardContext.lineWidth = 8;
boardContext.strokeStyle = "white";

boardContext.beginPath();
boardContext.moveTo(0, 0);
boardContext.lineTo(200, 200);
boardContext.stroke();
boardContext.closePath();

const onMouseDown$ = fromEvent<MouseEvent>(board, 'mousedown').pipe(
    map((event) => {
        cursorPosition.x = event.clientX - board.offsetLeft;
        cursorPosition.y = event.clientY - board.offsetTop;
        console.log(cursorPosition);
    })
);
const onMouseMove$ = fromEvent<MouseEvent>(board, 'mousemove');
const onMouseUp$ = fromEvent<MouseEvent>(board, 'mouseup');

onMouseDown$.subscribe();
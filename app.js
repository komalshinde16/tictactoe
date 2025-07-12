let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
 
let turnO= true;

const winPatterns= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [2,4,6],
    [6,7,8],
];

const resetGame = ()=>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box is clicked");
        if(turnO ){
            box.innerText = "0";
            turnO = false;
        }else{
            box.innerText= "X";
            turnO = true;
        }
       box.disabled= true;
       checkWinner();
    });
});

const disableBoxes = ()=>{
    for(let box of boxes ){
        box.disabled = true;
    }
};

const enableBoxes = ()=>{
    for(let box of boxes ){
        box.disabled = false;
        box.innerText="";
    }
};

const showWinner = (winner)=>{
    msg.innerText= `Congoo winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner =()=>{
    let winnerFound = false;
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val !=""){
            if(pos1Val ===pos2Val&& pos2Val=== pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                winnerFound = true;
                return;

            }
        }
    }
    let allFilled = [...boxes].every((box) => box.innerText !== "");
    if (!winnerFound && allFilled) {
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
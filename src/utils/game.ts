export const WINNING_COMBINATIONS = [
    [0,1,2],[3,4,5],[6,7,8], // Rows 
    [0,3,6],[1,4,7],[2,5,8], //Colums
    [0,4,8],[2,4,6] //Diagonal
];

export type Symbol = 'X' | 'O' | 'draw' | null;
export type Board = Symbol[];

export const checkWinner = (board: Board):{winner: Symbol; combination: number[] | null} =>{
    for(const combination of WINNING_COMBINATIONS){
        const [a,b,c] = combination;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return {winner: board[a], combination}
        }
    }

    return {winner:null, combination: null};
}

export const isBoardFull = (board:Board):boolean =>{
    return board.every((box) => box !== null);
};

export const isGameOver = (board:Board):boolean => {
    return checkWinner(board).winner !== null || isBoardFull(board);
}
import { useCallback, useState } from "react";
import { Board, Symbol, checkWinner, isBoardFull } from "../utils/game";
import axios from "axios";

const useTicTacToe = (initialPlayerSymbol: Symbol= null) =>{
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [playerSymbol, setPlayerSymbol] = useState<Symbol>(initialPlayerSymbol);
    const [computerSymbol, setComputerSymbol] = useState<Symbol>(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
    const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
    const [winner, setWinner] = useState<Symbol>(null);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const startGame = useCallback((symbol: Symbol) =>{
        setPlayerSymbol(symbol);
        setComputerSymbol(symbol === 'X' ? 'O' : 'X');
        setIsGameStarted(true);
        setIsPlayerTurn(symbol === 'X');

        if(symbol === 'O'){
            makeComputerMove(Array(9).fill(null));
        }
    }, []);

    const resetGame = useCallback(() =>{
        setBoard(Array(9).fill(null));
        setWinningCombination(null);
        setWinner(null);
        setIsPlayerTurn(playerSymbol === 'X');
        setIsGameStarted(true);
        
        if(playerSymbol === 'O'){
            makeComputerMove(Array(9).fill(null));
        }
    }, [playerSymbol]);

    const makePlayerMove = useCallback((index: number) =>{
    if(!isGameStarted || !isPlayerTurn || board[index] !== null || winner)
        return;

    const newBoard = [...board];
    newBoard[index] = playerSymbol;
    setBoard(newBoard);

    const{winner: newWinner, combination} = checkWinner(board);
    
    if(newWinner){
        setWinner(winner);
        setWinningCombination(combination)
        return;
    }

    if(isBoardFull(newBoard)){
        setWinner('draw');
        return;
    }

    setIsPlayerTurn(false);
    makeComputerMove(newBoard);
    }, [board, isGameStarted, isPlayerTurn, playerSymbol, winner]);

    const makeComputerMove = useCallback(async(currentBoard: Board) =>{
        setIsLoading(true);
        try{
            const response = await axios.post('https://hiring-react-assignment.vercel.app/api/bot', currentBoard);
            const computerMove = response.data;

            if(computerMove !== null && currentBoard[computerMove] === null){
                const newBoard = [...currentBoard];
                newBoard[computerMove] = computerSymbol;
                setBoard(newBoard);

                const{winner: newWinner, combination} = checkWinner(newBoard);
                if(newWinner){
                    setWinner(newWinner);
                    setWinningCombination(combination);
                    setIsLoading(false);
                    return;
                }

                if(isBoardFull(newBoard)){
                    setWinner('draw');
                    setIsLoading(false);
                    return;
                }

                setIsPlayerTurn(true);
            }
        }catch(error){
            console.error("Error while making computer move", error);
        }
        setIsLoading(false);
    }, [computerSymbol]);


    return {
        board, playerSymbol, computerSymbol, isPlayerTurn, winner, winningCombination, isGameStarted, isLoading, startGame, resetGame, makePlayerMove
    };
};

export default useTicTacToe;

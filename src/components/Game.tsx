import useTicTacToe from "../hooks/useTicTacToe"
import Board from "./Board";

const Game: React.FC = () => {
    const{
        board, playerSymbol, isPlayerTurn, winner, winningCombination, isGameStarted, isLoading, startGame, resetGame, makePlayerMove
    } = useTicTacToe();

    const renderStatus = () =>{
        if(winner === 'draw'){
            return <div className="text-xl font-bold mb-4">Game ended in a draw!</div>;
        }else if(winner){
            return(
                <div className="text-xl font-bold mb-4">
                    Winner: {winner === playerSymbol ? 'You' : 'Computer'}({winner})
                </div>
            );
        }else if(isGameStarted){
            return(
                <div className="text-xl font-bold mb-4">
                    {isLoading ? 'Computer is thinking' : `${isPlayerTurn? 'Your' : "Computer's"} turn (${isPlayerTurn ? playerSymbol : playerSymbol === 'X' ? 'O' : 'X'})`}
                </div>
            );
        }
        return null;
    };

    const renderSymbolSelector = () => {
        return(
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Choose your symbol:</h2>
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 bg-blue-500 text-white text-xl font-bold rounded hover:bg-blue-600 transition-colors" onClick={() => startGame('X')}>X</button>
                    <button className="px-6 py-3 bg-red-500 text-white text-xl font-bold rounded hover:bg-blue-600 transition-colors" onClick={()=>startGame('O')}>O</button>
                </div>
            </div>
        );
    };
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Tic-Tac-Toe</h1>

            {!isGameStarted && renderSymbolSelector()}
            {renderStatus()}

            <Board
            board={board}
            onBoxClick={makePlayerMove}
            winnigCombination={winningCombination}
            isDisabled={!isPlayerTurn || isLoading || !winner}
            />

            {(isGameStarted && winner) && (
                <button className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors" onClick={resetGame}>Play Again</button>
            )}
        </div>
    );
};

export default Game;
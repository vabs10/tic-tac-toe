import { Symbol } from "../utils/game";
import Box from "./Box";

interface BoardProps{
    board: (Symbol)[];
    onBoxClick:(index:number) => void;
    winnigCombination:number[] | null;
    isDisabled: boolean;
}

const Board: React.FC<BoardProps> = ({board, onBoxClick, winnigCombination, isDisabled}) =>{
    return(
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {board.map((value, index) =>(
                <Box
                key={index}
                value={value}
                index={index}
                onClick={onBoxClick}
                isWinningBox={winnigCombination?.includes(index) || false}
                isDisabled ={isDisabled}
                />
            ))}
        </div>
    );
};

export default Board;
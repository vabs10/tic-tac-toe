import { memo } from "react";
import { Symbol } from "../utils/game";

interface BoxProps{
    value:Symbol;
    index:number;
    onClick: (index:number) => void;
    isWinningBox: boolean;
    isDisabled: boolean;
}

const Box : React.FC<BoxProps> = ({value, index, onClick, isWinningBox, isDisabled}) =>{
    const handleClick = () =>{
        if(!isDisabled && value === null){
            onClick(index);
        }
    };
    return(<button className={`w-20 h-20 text-4xl font-bold flex items-center justify-center border-2 ${isWinningBox ? 'bg-green-200 border-green-500' : 'bg-white border-gray-300 hover:bg-gray-100'} ${isDisabled && value === null ? 'cursor-not-allowed' : 'cursor-pointer'} transition-colors duration-200`} onClick={handleClick} disabled={isDisabled || value !== null}>
        {value}
        </button>);
};

export default memo(Box);
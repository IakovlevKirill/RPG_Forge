import cell from "../assets/cell_toolbar.png"
import cell_active from "../assets/cell_active_tollbar.png"
import link from "../assets/link_toolbar.png"
import link_active from "../assets/link_active_tollbar.png"
import text_toolbar from "../assets/text_toolbar.png"
import text_toolbar_active from "../assets/text_active_toolbar.png"
import default_hand from "../assets/default_hand_toolbox.png"
import default_hand_active from "../assets/default_hand_toolbox_active.png"
import move_hand from "../assets/move_hand_toolbox.png"
import move_hand_active from "../assets/move_hand_toolbox_active.png"
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {setCurrentTool} from "../app/slices/currentToolSlice.ts";

export const Toolbar = () => {

    const currentTool = useAppSelector((state) => state.currentTool.tool);

    const dispatch = useAppDispatch();

    return (
        <div className="z-100 w-full flex items-center justify-center absolute top-[2%]">
            <div className="cursor-default gap-[10px] px-[10px] py-[5px] flex items-center bg-[#FFFFFF] rounded-[10px] border-[1px] border-[#EBEBEB] shadow-[0px_5px_16px_0px_rgba(0,_0,_0,_0.1)]">
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "default" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("default"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "default") && (
                        <img className="w-full" src={default_hand_active} alt=""/>
                    )}
                    {(currentTool !== "default") && (
                        <img className="w-full" src={default_hand} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "move" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("move"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "move") && (
                        <img className="w-full" src={move_hand_active} alt=""/>
                    )}
                    {(currentTool !== "move") && (
                        <img className="w-full" src={move_hand} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "square" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("square"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "square") && (
                        <img className="w-full" src={cell_active} alt=""/>
                    )}
                    {(currentTool !== "square") && (
                        <img className="w-full" src={cell} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "link" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("link"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "link") && (
                        <img className="w-full" src={link_active} alt=""/>
                    )}
                    {(currentTool !== "link") && (
                        <img className="w-full" src={link} alt=""/>
                    )}
                </button>
                <button
                    className={`bg-[white] flex items-center justify-center border-[1px] border-[white] w-[35px] h-[35px] rounded-[8px]
                    hover:bg-[#F2F2F2] focus:outline-[0]
                    ${currentTool === "text" ? "bg-[#3575FF]! border-[1px] " : ""}
                    `}
                    onClick={() => {
                        dispatch(setCurrentTool("text"))
                        console.log(currentTool)
                    }}
                >
                    {(currentTool === "text") && (
                        <img className="w-full" src={text_toolbar_active} alt=""/>
                    )}
                    {(currentTool !== "text") && (
                        <img className="w-full" src={text_toolbar} alt=""/>
                    )}
                </button>
            </div>
        </div>
    );
};
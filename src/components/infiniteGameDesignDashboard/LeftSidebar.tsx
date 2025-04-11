
import { Panel } from "./Panel.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {setCurrentObject} from "../../app/slices/currentCanvasObjectSlice.ts";

export const LeftSidebar = () => {

    const objects_array = useAppSelector((state) => state.canvasObjects.objects);

    const dispatch = useAppDispatch()

    return (
        <Panel position="left">
            <h1 className="text-[14px]"></h1>
            <div className="flex flex-col gap-[10px] items-center">
                {objects_array.map((object) => (
                    <div
                        onClick={() => {
                            dispatch(setCurrentObject(object.id))
                        }}
                        key={object.id}
                        className="font-[Inter] cursor-pointer w-full text-center
                        hover:opacity-80
                        ">
                        {object.id}
                    </div>
                ))}
            </div>
        </Panel>
    );
};
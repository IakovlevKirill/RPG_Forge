import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currentToolType } from "../../store/types.ts"

const initialState: currentToolType = {
    tool: 'default',
};

export const currentToolSlice = createSlice({
    name: 'currentTool',
    initialState,
    reducers: {
        setCurrentTool: (state, action: PayloadAction<'default' | 'move' | 'square' | 'link' | 'text' >) => {
            state.tool = action.payload;
        },
    },
});

export const { setCurrentTool } = currentToolSlice.actions;

export default currentToolSlice.reducer;
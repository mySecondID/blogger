import { createSlice, } from '@reduxjs/toolkit'

const initialState: {
  list: [{
    type: string,
    content: string,
    file: File | string
  }]
} = {
  list: [{ type: "text", content: "add text here", file: "" }],
}



const newPostSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addText: (state: any, action: any) => {
      console.log(state, action)
      state.list.push({
        type: "text",
        content: action.payload.content,
        file: ""
      })
    },
    removeTodo: (state: any, action: any) => {
      state.todos = state.todos.filter((ele: any) => ele.id !== action.payload.id)
    }
  }
});

export const { addText, removeTodo } = newPostSlice.actions
export default { newPostSlice }
export const newPostReducer = newPostSlice.reducer
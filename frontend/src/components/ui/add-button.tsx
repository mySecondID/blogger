"use client"

import * as React from "react"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { useDispatch } from "react-redux"
import { addText } from '../../features/newPostSlice'


export function AddButton({styling} : {styling: string}) {
  const dispatch = useDispatch();

  return (
    <div className={styling}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">+</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styling}>
            <DropdownMenuRadioItem value="uploadFile">Upload File</DropdownMenuRadioItem>
            <DropdownMenuRadioItem onClick={() => {dispatch(addText({content: "hi"}))}} value="text">Text</DropdownMenuRadioItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

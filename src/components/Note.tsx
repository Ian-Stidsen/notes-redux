import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTitle } from "../redux/notesSlice";
import { RootState } from "../redux/store";

export function Note() {
  const { id, title, body } = useSelector((state: RootState) => state.notesData);
  const dispatch = useDispatch();
  const inputRef = useRef('');

  const test = () => {
    console.log();
  }

  return (
    <>
      
    </>
  )
}
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "../App";

type NoteState = Array<Note>;

const initialState: NoteState = [
  {
    id: '1',
    title: 'Title example',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed error eius, temporibus rem adipisci a debitis vero laborum deserunt mollitia reprehenderit possimus expedita incidunt at cumque magnam odit architecto. Consequuntur maxime tempora sequi aut. Vel nesciunt totam sapiente nisi? Reiciendis et placeat rem quidem, molestias quas eaque minus cum dolorum veniam minima beatae, autem mollitia nisi dolorem delectus, architecto sed fuga neque quam obcaecati accusantium quos? Dolorem aperiam placeat fugiat unde iure officia omnis nulla pariatur laudantium odit? Totam amet ipsa eligendi ullam, placeat mollitia id similique voluptates maiores possimus nobis ut quidem nesciunt doloremque dolorum facilis omnis eaque quaerat esse. Alias quos necessitatibus quo voluptatem id pariatur beatae ducimus, sunt placeat ad fugiat voluptatum laboriosam harum modi minima dolore! Temporibus possimus mollitia ea iusto non architecto animi sed laboriosam consequuntur maiores adipisci autem tempora quidem velit perspiciatis nesciunt culpa deleniti, quo cum eveniet asperiores optio officiis. Qui quidem aperiam et! Eos eius aut doloribus molestias sint, reprehenderit excepturi suscipit, in amet recusandae quas sit officiis? Magni officia molestiae ad commodi, adipisci fugit omnis odio aspernatur nostrum libero necessitatibus nulla beatae perferendis quo perspiciatis. Tempore aliquid, aliquam quisquam nisi temporibus expedita adipisci delectus enim sequi libero fugiat sed aperiam ab.',
    tagIDs: ['1'],
  },
];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state: NoteState, noteData: PayloadAction<Note>) => {
      state.push(noteData.payload);
    },
    deleteNote: (state: NoteState, id: PayloadAction<string>) => {
      return state.filter(note => note.id !== id.payload);
    },
    updateNote: (state: NoteState, updatedNote: PayloadAction<Note>) => {
      const noteToUpdate = state.find(note => note.id === updatedNote.payload.id);
      if (noteToUpdate) {
        Object.assign(noteToUpdate, updatedNote.payload);
      }
    },
    updateNoteTagIDs: (state: NoteState, tagId: PayloadAction<string>) => {
      state.forEach(note => {
        note.tagIDs = note.tagIDs?.filter(id => id !== tagId.payload);
      });
    },
  },
})

export const { addNote, deleteNote, updateNote, updateNoteTagIDs } = notesSlice.actions;
export default notesSlice.reducer;
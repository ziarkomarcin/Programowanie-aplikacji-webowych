import app from './App';

export class Note{

    save(note_id: string, note_title: string, note_note: string, note_color: string, note_pinned: boolean){
        let date = new Date();
        let note = {
            id: note_id,
            title: note_title,
            note: note_note,
            background: note_color,
            pinn: note_pinned,
            date: date.toISOString().split('T')[0]
        }
        return note;
    }

}
export default Note;
"use strict";
exports.__esModule = true;
exports.Note = void 0;
var Note = /** @class */ (function () {
    function Note() {
    }
    Note.prototype.save = function (note_id, note_title, note_note, note_color, note_pinned) {
        var date = new Date();
        var note = {
            id: note_id,
            title: note_title,
            note: note_note,
            background: note_color,
            pinn: note_pinned,
            date: date.toISOString().split('T')[0]
        };
        return note;
    };
    return Note;
}());
exports.Note = Note;
exports["default"] = Note;

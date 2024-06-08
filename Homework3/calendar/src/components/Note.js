import React from "react";

const Note = ({note, onRemove}) =>{
    return(
        <div className="note">
            {note}
            <button onClick={onRemove}>x</button>
        </div>
    );
}

export default Note;
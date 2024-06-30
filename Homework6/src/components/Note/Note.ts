type NoteProps = {
    note: string;
    onRemove: () => void;
};

export class Note {
    private note: string;
    private onRemove: () => void;

    constructor({ note, onRemove }: NoteProps) {
        this.note = note;
        this.onRemove = onRemove;
    }

    render(): string {
        return `
            <div class="note">
                ${this.note}
                <button onclick="(${this.onRemove.toString()})()">x</button>
            </div>
        `;
    }
}
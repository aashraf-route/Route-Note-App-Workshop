export class Note {

    // Properties
    _id = "";
    title="";
    content="";
    createdAt="";
    updatedAt="";

    constructor({
        _id = "",
        title="",
        content="",
        createdAt="",
        updatedAt=""
    }){
      this._id = _id;
      this.title = title;
      this.content = content;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }


    // Method

    /**
     * @returns {string} html string to be added
     */
    toHTMLCard(){
        return `<div class="note-card bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 relative hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 animate-[fadeIn_0.4s_ease]">
      <div class="flex justify-between items-start mb-4">
        <h3 class="note-card__title text-xl font-bold text-gray-800 flex-1 pr-4">${
          this.title
        }</h3>
        <div class="btns-group flex gap-2" data-note-id="${this._id}">
          <button data-action="edit" class="bg-blue-500 hover:bg-blue-600 text-white w-9 h-9 rounded-lg flex items-center justify-center transition-all shadow hover:scale-105">
            ✏️
          </button>
          <button data-action="delete" class="bg-red-500 hover:bg-red-600 text-white w-9 h-9 rounded-lg flex items-center justify-center transition-all shadow hover:scale-105">
            🗑️
          </button>
        </div>
      </div>
      <p class="note-card__content text-gray-600 whitespace-pre-wrap leading-relaxed mb-4">${this.content}</p>
    </div>`;

    }


}

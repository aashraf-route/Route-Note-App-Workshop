import DomUtils from "../utils/dom-utils.js";
import NoteServices from "@/modules/note/note.service.js";
import {Note} from "@/modules/note/note.js"
// 1- Gather Ids in one place

const ELEMENTS_IDS = {
  APP: "app",
  WRAPPER: "wrapper",
  EMPTY_STATE: "noteEmptyState",
  NOTE_MODAL: "noteModal",
  NOTE_LIST: "noteList",
  HEADER: "header",
  COUNT: "noteCount",
  TITLE_INPUT: "noteTitle",
  CONTENT_INPUT: "noteContent",
  FLOATING_BTN: "floatingBtn",
};
console.log(ELEMENTS_IDS);
const { APP: APP_Ele_ID, WRAPPER: WRAPPER_Ele_ID } = ELEMENTS_IDS;

const ACTIONS = {
  CANCEL : "cancel",
  SAVE:"save",
  DELETE:"delete",
  EDIT:"edit"
};


// 2- Make elements in global scope + type hint
/** @type {HTMLElement|undefined}*/

let app_ele = document.getElementById(APP_Ele_ID);
/** @type {HTMLElement|undefined}*/
let header_ele;
/** @type {HTMLElement|undefined}*/
let floatingBtn_ele = null;
/** @type {HTMLElement|undefined}*/
let noteList_ele = null;
/** @type {HTMLElement|undefined}*/
let noteModal_ele = null;
/** @type {HTMLElement|undefined}*/
let noteEmptyState_ele = null;


const generateHeader = () => {
  return `<div class="flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            ✨ Route Notes
          </h1>
          <p class="text-gray-600">Capture your thoughts beautifully</p>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-blue-600" id="${ELEMENTS_IDS.COUNT}">0</div>
          <div class="text-sm text-gray-500">Total Notes</div>
        </div>
      </div>`;
};

const generateEmptyState = () => {
  return `<div class="text-6xl mb-4">📝</div>
      <h3 class="text-2xl font-bold text-gray-800 mb-2">No notes yet</h3>
      <p class="text-gray-600">Click the + button to create your first note!</p>`;
};


/**
 * @returns string
 */
const generateModalView = (note) => {

  let notId ="";
  let noteTitle ="";
  let noteContent ="";

  let modalSubject = "Create Note"

  if(note){
      notId = note._id;
      noteTitle = note.title;
      noteContent = note.content;
      modalSubject = "Update Note"
  }

  return `
  <div class="bg-white/95 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-white/20 animate-[fadeIn_0.4s_ease]">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">${modalSubject}</h2>
        <input 
          id="${ELEMENTS_IDS.TITLE_INPUT}"
          value = "${ noteTitle? noteTitle : ""}"
          type="text" 
          placeholder="Give it a title..." 
          class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
        <textarea 
          id="${ELEMENTS_IDS.CONTENT_INPUT}" 
          placeholder="What's on your mind?" 
          rows="6" 
          class="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg resize-none transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >${noteContent ? noteContent : ""}</textarea>
        <div class="btns-group flex gap-3" ${notId ? "data-note-id="+notId : ""} 
       >
          <button data-action="save" class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold flex-1 hover:-translate-y-0.5 hover:shadow-xl transition-all">
            💾 Save Note
          </button>
          <button data-action="cancel" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all">
            Cancel
          </button>
        </div>
      </div>
  `
}

const saveNote = async (noteId)=>{

  // 1- Get Values

  const title = document.getElementById(ELEMENTS_IDS.TITLE_INPUT).value;
  const content = document.getElementById(ELEMENTS_IDS.CONTENT_INPUT).value;

  // 2- Create Payload object

  const payload ={
    title,
    content
  }

  let response;
  if(noteId){
    response = await NoteServices.updateNote(noteId,payload); 
  }else{
   response = await NoteServices.addNote(payload);
  }

  
  if(response.status == 201 || response.status == 200 ){
      // 4- If success close modal
    closeModal();
  }else{
    console.log(response)
  }

}

const getAllNotes = async () => {
  const res = await NoteServices.getAllNotes();

  if(res.status == 200){

    console.log(res.resData.notes)
    if(res.resData.notes.length > 0){
       /**@type {Array<string>} */
    const allNotes = res.resData.notes.map((note)=>{
     return new Note(note).toHTMLCard();
    })
    noteEmptyState_ele.innerHTML ="";
    noteEmptyState_ele.classList.add("hidden");
    const counter = document.getElementById(ELEMENTS_IDS.COUNT);  
    counter.textContent = allNotes.length;
    noteList_ele.innerHTML = allNotes.join(" ");
    }else{
      const counter = document.getElementById(ELEMENTS_IDS.COUNT);  
      counter.textContent = 0;
      noteEmptyState_ele.innerHTML = generateEmptyState();
      noteEmptyState_ele.classList.remove("hidden");
      noteList_ele.innerHTML = "";
    }

   
  
  }

}


const deleteNote = async (id) =>{
  const res = await NoteServices.deleteNote(id);
  if(res.status == 200){
    console.log("Noted Deleted Successfully");
  }
}


/**
 * 
 * @param {Event} event 
 */
const handleBtnGroup = async (event) =>{
 
  /** @type {HTMLElement|undefined}*/
  const element = event.target;

  const btnGroupEle = element.closest(".btns-group");

  if(!btnGroupEle){
    return;
  }

  const noteId = btnGroupEle.getAttribute("data-note-id");
  // console.log(noteId);

  if(element){

    const actionType = element.getAttribute("data-action");

    switch (actionType) {
      case ACTIONS.CANCEL:
        closeModal();
        break;

      case ACTIONS.SAVE:
        await saveNote(noteId)
        await getAllNotes();
        break;

      case ACTIONS.DELETE:
        await deleteNote(noteId)
        await getAllNotes();
        break;

      case ACTIONS.EDIT:
        await openEditModal(noteId);
        break;
    
      default:
        break;
    }

  }
}

const openEditModal = async (id) =>{
  const res =await NoteServices.getNoteById(id);

  if(res.status == 200){
    openModal( generateModalView(res.resData.note))
  }

}

const openModal = (view) => {
  // 1- add modal popup (html)
  noteModal_ele.innerHTML =view ? view : generateModalView();
  //  2- show the modal
  noteModal_ele.classList.remove("hidden")
}

const closeModal = () => {
  // 1- remove modal popup (html)
  noteModal_ele.innerHTML = "";
  //  2- show the modal
  noteModal_ele.classList.add("hidden")
}


const addEvents = ()=>{

floatingBtn_ele.addEventListener("click",()=>openModal());
noteModal_ele.addEventListener("click",handleBtnGroup);
noteList_ele.addEventListener("click",handleBtnGroup)
}

export const renderNoteViews = function () {
  const wrapper_ele = DomUtils.generateElement({
    attributes: { id: WRAPPER_Ele_ID },
    classes: "max-w-6xl mx-auto p-6 pb-32"
  });

  header_ele = DomUtils.generateElement({
    attributes: { id: ELEMENTS_IDS.HEADER },
    classes:
      "bg-white/95 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-xl border border-white/20 animate-[fadeIn_0.4s_ease]",
    html: generateHeader(),
  });

  floatingBtn_ele = DomUtils.generateElement({
    attributes: { id: ELEMENTS_IDS.FLOATING_BTN },
    classes:
      "fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white text-blue-600 text-4xl font-light flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-blue-500/50 active:scale-95 transition-all duration-300 z-50 border-2 border-blue-200",
    text: "+",
    tagName: "button",
  });

  noteList_ele = DomUtils.generateElement({
    attributes:{id:ELEMENTS_IDS.NOTE_LIST},
    classes:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  })

  noteModal_ele = DomUtils.generateElement({
    attributes:{id:ELEMENTS_IDS.NOTE_MODAL},
    classes:
      "hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
  })

  noteEmptyState_ele = DomUtils.generateElement({
    attributes:{id:ELEMENTS_IDS.EMPTY_STATE},
    classes:
      "hidden bg-white/95 backdrop-blur-lg rounded-3xl p-12 text-center shadow-xl border border-white/20 animate-[fadeIn_0.4s_ease]",
  })

  app_ele.appendChild(wrapper_ele);
  app_ele.appendChild(floatingBtn_ele);
  wrapper_ele.appendChild(header_ele);
  wrapper_ele.appendChild(noteList_ele);
  wrapper_ele.appendChild(noteModal_ele);
  wrapper_ele.appendChild(noteEmptyState_ele);

  addEvents();
  getAllNotes();
};

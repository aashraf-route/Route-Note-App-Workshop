import DomUtils from "../utils/dom-utils.js";

// 1- Gather Ids in one place

const ELEMENTS_IDS = {
  APP: "app",
  WRAPPER: "wrapper",
  EMPTY_STATE: "noteEmptyState",
  MODAL: "noteModal",
  NOTE_LIST: "noteList",
  HEADER: "header",
  COUNT: "noteCount",
  TITLE_INPUT: "noteTitle",
  CONTENT_INPUT: "noteContent",
  FLOATING_BTN: "floatingBtn",
};
console.log(ELEMENTS_IDS);
const { APP: APP_Ele_ID, WRAPPER: WRAPPER_Ele_ID } = ELEMENTS_IDS;

// 2- Make elements in global scope + type hint
/** @type {HTMLElement|undefined}*/

let app_ele = document.getElementById(APP_Ele_ID);
/** @type {HTMLElement|undefined}*/
let header_ele;
/** @type {HTMLElement|undefined}*/
let floating_ele = null;

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

const attacheEvents = () => {
  /// get odj  "floatinBtn"
  floating_ele.innerHTML = "";
};

export const renderNoteViews = function () {
  const wrapper_ele = DomUtils.generateElement({
    attributes: { id: WRAPPER_Ele_ID },
    classes: "max-w-6xl mx-auto p-6 pb-32",
  });

  header_ele = DomUtils.generateElement({
    attributes: { id: ELEMENTS_IDS.HEADER },
    classes:
      "bg-white/95 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-xl border border-white/20 animate-[fadeIn_0.4s_ease]",
    html: generateHeader(),
  });

  floating_ele = DomUtils.generateElement({
    attributes: { id: ELEMENTS_IDS.FLOATING_BTN },
    classes:
      "fixed bottom-8 right-8 w-16 h-16 rounded-full bg-white text-blue-600 text-4xl font-light flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-blue-500/50 active:scale-95 transition-all duration-300 z-50 border-2 border-blue-200",
    text: "+",
    tagName: "button",
  });

  app_ele.appendChild(wrapper_ele);
  app_ele.appendChild(floating_ele);
  wrapper_ele.appendChild(header_ele);
};

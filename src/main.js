import "./style.css";
import { renderNoteViews } from "@comp/note.views.js";

const app = {
  init: () => {
    renderNoteViews();
  },
};

app.init();

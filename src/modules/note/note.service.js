import API_BASE_URL from "@/config/api.config.js";

const httpMethods={
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE"
}

const headerConfig ={
    "Content-Type":"application/json"
};


const NoteServices = function(){};

NoteServices.prototype.request = async function(endpoint,options = null){

    const res = await fetch(`${API_BASE_URL}/${endpoint}`,{
        method:options?.method ?? "GET",
        headers:headerConfig,
        body: options?.body ? JSON.stringify(options.body) : undefined
    })
    const status = res.status;
    const resData = await res.json();
    return {status , resData }  
} 


NoteServices.prototype.addNote = async function(data){
   return await this.request(`notes`,{method:httpMethods.POST,body:data});
} 

NoteServices.prototype.getAllNotes = async function(data){
   return await this.request(`notes`);
} 

NoteServices.prototype.updateNote = async function(id,data){
   return await this.request(`notes/${id}`,{method:httpMethods.PUT,body:data});
} 

NoteServices.prototype.deleteNote = async function(id){
   return await this.request(`notes/${id}`,{method:httpMethods.DELETE});
} 


NoteServices.prototype.getNoteById = async function(id){
   return await this.request(`notes/${id}`);
} 


const noteService = new NoteServices();
export default noteService;
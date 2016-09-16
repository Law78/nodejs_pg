// CRUD MODELS for Note
function Note(obj) {
  return {
    
    add: function (text, complete) {
      return obj.one("INSERT INTO items(text, complete) VALUES($1, $2) RETURNING id", [text, complete], i=>i.id);
    },

    delete: function(id){
      return obj.result("DELETE FROM items WHERE id=$1", id)
        .then(result => {
          return result.rowCount;
        })
    },
  
    count: function () {
      return obj.one("SELECT count(*) FROM items", [], i=>+i.count);
    },

    findById: function (id) {
      return obj.map("SELECT id, text from items WHERE id = $1", id, data=>{
      	return {
      		text: data.text,
      		id: data.id
      	}
      });
    }
      
  }
}

module.exports = Note;
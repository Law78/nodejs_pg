'use strict';


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
    
    update_: function (data, id) {
      return obj.one("UPDATE items SET text=($1), complete=($2) WHERE id=($3) RETURNING *", [data.text, data.complete, id])
        .then(function(res){
          console.log('RESRESRES', res);
          return {
            text: data.text,
            complete: data.complete,
            id: data.id
          }
        })
        .catch(function(error){
          return error;
        });
    },
    update: function (data, id) {
      return obj.map("UPDATE items SET text=($1), complete=($2)  RETURNING *", 
        [data.text, data.complete, id], res=> {
          console.log(res);
          return res;
        })
        .then( res =>{

            console.log('ROWSSSSS', res.length);
            return res.length;
        })
        .catch(function(error){
          return error;
        });
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
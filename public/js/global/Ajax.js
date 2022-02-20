 class Ajax{

    constructor(token){
    this.token = token;
   
    }

    ajaxGet(vegpont,callback){
        $.ajax(
            {
                dataType : 'json',
                type:'GET',
                url:vegpont,
                
                success:function(eredmeny){
                    
                    callback(eredmeny);
                }
                
                
            }
        );
    }

   ajaxApiGet(apivegpont, callback){   
        $.ajax(
            {
                url: apivegpont, 
                type: "GET",
                success: function(result){
                    callback(result);
                    console.log(result);
                }
            }
        );
    }
    
   ajaxApiDelete(apivegpont,id){
    
        $.ajax(
            
            {
                headers: {'X-CSRF-TOKEN': this.token},
                url: apivegpont+"/"+id, 
                
                type: "DELETE",
                
                error:function(data,textStatus,errorThrown){
                    alert(data.responseJSON.message);
                        
                }
                
            }
        );
    }

    ajaxApiPut(apivegpont,id,data,callback){
        $.ajax({
            headers:{'X-CSRF-TOKEN':this.token},
            type: "PUT",
            url: apivegpont+"/"+id,
            data: data,
           
            error:function(data,textStatus,errorThrown){
                alert(data.responseJSON.message);
                   
            },

            success:callback()
        })
    }

    ajaxApiPut(apivegpont,id,data){
        $.ajax({
            headers:{'X-CSRF-TOKEN':this.token},
            type: "PUT",
            url: apivegpont+"/"+id,
            data: data,
           
            error:function(data,textStatus,errorThrown){
                alert(data.responseJSON.message);
                   
            },
        })
    }

    ajaxApiPost(apivegpont,data){
        $.ajax({
            headers:{'X-CSRF-TOKEN':this.token},
            type: "POST",
            url: apivegpont,
            data: data,
            
            error:function(data,textStatus,errorThrown){
                alert(data.responseJSON.message);
                   
            }
        })
    }

 

}
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
                success:()=>{
                    alert("Sikeres adattörlés");
                },
                error:function(data,textStatus,errorThrown){
                    alert(data.responseJSON.message);
                        
                }
                
            }
        );
    }

    ajaxApiPut(apivegpont,id,data){
        $.ajax({
            headers:{'X-CSRF-TOKEN':this.token},
            type: "PUT",
            url: apivegpont+"/"+id,
            data: data,
            success: ()=>{
                alert("Sikeres adatmódosítás");
            },
            error:function(data,textStatus,errorThrown){
                alert(data.responseJSON.message);
                   
            }
        })
    }

 

}
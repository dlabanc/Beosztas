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
                headers: {
                    'X-CSRF-TOKEN': this.token  
                },
                url: apivegpont+"/"+id, 
                
                type: "DELETE",
                success: function(){
                   alert("siker");
                },
                error:function(data,textStatus,errorThrown){
                    
                        console.log(data);
                        console.log(textStatus);
                        console.log(errorThrown);
                }
                
            }
        );
    }

    deleteAjax(apivegpont, id){
        $.ajax({
            headers: {'X-CSRF-TOKEN': this.token},
            url: apivegpont+"/"+id, 
            type: "DELETE",
            error: function (data, textStatus, errorThrown) {
                console.log(data);
        
            },
        });
    }

}
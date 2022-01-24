class Ajax{
    constructor(){
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
}
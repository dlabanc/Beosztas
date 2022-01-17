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
        )
    }
}
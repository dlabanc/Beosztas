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
                
                error:function(data,textStatus,errorThrown){
                    console.log(data.responseJSON.message);
                        
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
                console.log(data.responseJSON.message);
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
                console.log(data.responseJSON.message);
                   
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
                console.log(data.responseJSON.message);
                   
            }
        })
    }

    fetchAjax(apivegpont, ujAdat){
        fetch(apivegpont, {
            method: "POST",
            body: JSON.stringify(ujAdat),
            headers: {
                'X-CSRF-TOKEN': this.token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(response => {
            if(!response.ok) {
                return response.json().then(text => { 
                    if(text.errors.oldpwd){
                        let error = new Error(text.errors.oldpwd);
                        error.name = 'oldpwd';
                        throw error;
                    }
                    else if(text.errors.newpwd){
                        let error = new Error(text.errors.newpwd);
                        error.name = 'newpwd';
                        throw error;
                    }
                    else if(text.errors.confirmpwd){
                        let error = new Error(text.errors.confirmpwd);
                        error.name = 'confirmpwd';
                        throw error;
                    }else if(text.errors.wrongpass){
                        let error = new Error(text.errors.wrongpass);
                        error.name = 'wrongpass';
                        throw error;
                    }else if(text.errors.loginlimit){
                        let error = new Error(text.errors.loginlimit);
                        error.name = 'loginlimit';
                        throw error;
                    }else if(text.errors.status){
                        let error = new Error(text.errors.status);
                        error.name = 'status';
                        throw error;
                    }else if(text.errors.email){
                        let error = new Error(text.errors.email);
                        error.name = 'email';
                        throw error;
                    }else if(text.errors.passerror){
                        let error = new Error(text.errors.passerror);
                        error.name = 'passerror';
                        throw error;
                    }else if(text.errors.reseterror){
                        let error = new Error(text.errors.reseterror);
                        error.name = 'reseterror';
                        throw error;
                    }
                    
                });
            }
            else {
                $('#oldpwderror').empty();
                $('#newpwderror').empty();
                $('#confirmpwderror').empty();
                $('.password-window').css('display','none');
                window.location.href = response.url;
            }    
        }).catch(error => {
            if(error.name == 'oldpwd'){
                $('#newpwderror').empty();
                $('#confirmpwderror').empty();
                $('#oldpwderror').text(error.message);
            }else if(error.name == 'newpwd'){
                $('#oldpwderror').empty();
                $('#confirmpwderror').empty();
                $('#newpwderror').text(error.message);
            }else if(error.name == 'confirmpwd'){
                $('#oldpwderror').empty();
                $('#newpwderror').empty();
                $('#confirmpwderror').text(error.message);
            }else if(error.name == 'wrongpass'){
                $('#loginerror').text(error.message);
            }else if(error.name == 'loginlimit'){
                $('#loginerror').empty();
                $('#loginerror').text(error.message);
            }else if(error.name == 'status'){
                $('#emailstatus').empty();
                $('#emailstatus').text(error.message);
            }else if(error.name == 'email'){
                $('#emailstatus').empty();
                $('#emailstatus').text(error.message);
            }else if(error.name == 'passerror'){
                $('#reseterror').empty();
                $('#reseterror').text(error.message);
            }else if(error.name == 'reseterror'){
                $('#reseterror').empty();
                $('#reseterror').text(error.message);
            }
            
        });
    }

 

}
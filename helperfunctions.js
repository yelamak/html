var jasonarray=[];


function checkDuplicateData(email,temp){
    getStoredData();
    var flag=false;
   
    jasonarray.forEach(function(arrayitem){
            $.each( arrayitem, function( key, value ) {
                if(key!=temp){
                $.each(value,function(key1,value1){
                    if(key1=="email" && value1==email){
                        flag=true;
                    }
                });
                }
            });
        }); 
  
    
   
    return flag;
}

function checkDataValidation(name,email,message,phno){
    if(name==''){
            if(message!="message")
                message.text("name should not be empty");
            return false;
    }
	else if(email.indexOf('@')<0 || email.indexOf('.')<0 || email.lastIndexOf('.')<email.indexOf('@') || email.lastIndexOf('.') >= (email.length-1)){
        if(message!="message")
            message.text("enter valid email");
        return false;
    }
			
	else if(phno.length	!=10 ){
        if(message!="message")    
            message.text("enter valid mobile number");
        return false;
    }
	return true;	
}

function createtable(jasonarray){
    var text;
    text="<table align='center' id='t1' border=1><tr>";
   /* for (var index in jasonarray[0].key) {
        text=text+"<th>"+index+"</th>";
    }*/
    $.each( jasonarray[0], function( key, value ) {
        $.each(value,function(key1,value1){
            text=text+"<th>"+key1+"</th>";
        });
        
    });
    text=text+"<th colspan=2>Action</th></tr>";
    jasonarray.forEach(function(arrayitem){
        $.each( arrayitem, function( key, value ) {
            text=text+"<tr id='"+key+"'>";
            $.each(value,function(key1,value1){
                text=text+"<td>"+value1+"</td>";
            });
            text=text+"<td><a onclick='deletedata(this); return false;' id='"+key+"'>delete</a></td><td><a onclick='setdata(this); return false;' data-reveal-id='myModal' "+
            "id='"+key+"'>update</a></td></tr>";
    });
    
    });
    text=text+"</table>";
    return text;
}


function validate(data){
    var name=data[0];
    var email=data[1];
    var phno=data[2];
    
    if(checkDataValidation(name,email,"message",phno)){
        if(checkDuplicateData(email,temp))
            return false;
        else
            return true;
    }
    else
        return false;
}



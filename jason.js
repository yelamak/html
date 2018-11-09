var jasonarray=[];
var id;
window.onload = getStoredData();

function getStoredData(){
     id=localStorage.getItem("id");
    var storeddata = localStorage.getItem("storeddata");
    if (storeddata !== null) {
        jasonarray=JSON.parse(storeddata);

    }
    if(id==null){
        id=0;
    }
}

    $('#updateform').submit(function(){
        $('#validatemessage1').show();
        getStoredData();
		var jason={};
		var name=$('#name1').val();
		var email=$('#email1').val();
		var message=$('#validatemessage1');
		var phno=$("#phno1").val();
        var temp=$("#temp").val();
        var count=0;
		if(name=='')
			message.text("name should not be empty");
		else if(email.indexOf('@')<0 || email.indexOf('.')<0 || email.lastIndexOf('.')<email.indexOf('@') || email.lastIndexOf('.') >= (email.length-1))
			message.text("enter valid email");
		else if(phno.length	!=10 )
			message.text("enter valid mobile number");
		else{
            var flag=0;
            $.each( jasonarray, function( key, value ) {
                if(key!=temp){
                $.each(value,function(key1,value1){
                    if(key1=="email" && value1==email){
                        flag=1;
                    }
                });
                }
                count++;
            });
            if(flag==0){
                jasonarray[count-1][temp].username=name;
                jasonarray[count-1][temp].email=email;
                jasonarray[count-1][temp].phno=phno;
                console.log(JSON.stringify(jasonarray));
                localStorage.setItem("storeddata",JSON.stringify(jasonarray));
                $('#name1').val('');
                $('#email1').val('');
                $('#phno1').val('');
                $('#temp').val('');
                $('#validatemessage1').text("updated successfully");
                view();
                $('#updateform').hide();
            }
            else
                message.text("record already existed");
		}	
		return false;
    });



	$('#formdata').submit(function(){
        getStoredData();
        var jason={};
        var idobj={};
		var name=$('#name').val();
		var email=$('#email').val();
		var message=$('#validatemessage');
		var phno=$("#phno").val();
        
		if(name=='')
			message.text("name should not be empty");
		else if(email.indexOf('@')<0 || email.indexOf('.')<0 || email.lastIndexOf('.')<email.indexOf('@') || email.lastIndexOf('.') >= (email.length-1))
			message.text("enter valid email");
		else if(phno.length	!=10 )
			message.text("enter valid mobile number");
		else{
            var flag=0;
            jasonarray.forEach(function(arrayitem){
                
                $.each( arrayitem, function( key, value ) {
                    $.each(value,function(key1,value1){
                        if(key1=="email" && value1==email){
                            flag=1;
                        }
                    });
                   
            });
            });
            if(flag==0){
                jason.username=name;
                jason.email=email;
                jason.phno=phno;
                idobj[id]=jason;
                id++;
                jasonarray.push(idobj);
                console.log(JSON.stringify(jasonarray));
                localStorage.setItem("storeddata",JSON.stringify(jasonarray));
                localStorage.setItem("id",id);
                $('#name').val('');
                $('#email').val('');
                $('#phno').val('');
                message.text("inserted successfully");
            }
            else
                message.text("record already existed");
		}	
		return false;
	});

	function view(){
        
        getStoredData();
        var text;
        if(jasonarray.length>0)
            text=createtable(jasonarray);
        else
            text="<p style='text-align:center'>No Records Found<p>";
        $('#viewdata').html(text);
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

    function setdata($this){
        $('#updateform').show();
        $('#validatemessage1').hide();
        var data = $this.id;
        $('#temp').val(data);
        $('#name1').val($("#t1 tr#"+data+" td:eq(0)").text());
        $('#email1').val($("#t1 tr#"+data+" td:eq(1)").text());
        $('#phno1').val($("#t1 tr#"+data+" td:eq(2)").text());
    }
    
    function search(){
        getStoredData();
        var text=$('#searchtext').val().trim();
        if(text=='')
        {
            alert("text should not be empty");
            return;
        }
        var tempdata=[];
        var flag=0;
        var text2;
        jasonarray.forEach(function(arrayitem){
                
            $.each( arrayitem, function( key, value ) {
                flag=0;
                $.each(value,function(key1,value1){
                    if(value1.includes(text)){

                        flag=1;
                    }
                });
                if(flag==1)
                    tempdata.push(arrayitem);
        });
        });
        if(flag==0)
            alert("nothing found");
        else{
            text2=createtable(tempdata);
            $("<div id='dailog' title='Search Result'>"+text2+"</div>").dialog();
            $('.ui-dialog').css({"width": "auto", "height": "auto"});
        }
    }

    function deletedata($this){
        getStoredData();
        var data = $this.id;
        var flag=0,count=0,position;
        jasonarray.forEach(function(arrayitem){
            $.each(arrayitem,function(key,value){
                if(key==data) {
                    flag=1;
                    position=count;
                }
            });
            count++;
        });
        if(flag==1)
        {
            jasonarray.splice(position,1);
        }
        
        console.log(JSON.stringify(jasonarray));
        localStorage.setItem("storeddata",JSON.stringify(jasonarray));
        view();
    }
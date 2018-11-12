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
        var myForm = document.getElementById('updateform');
        formData = new FormData(myForm);
		var name=formData.get('name1');
		var email=formData.get('email1');
		var message=$('#validatemessage1');
		var phno=formData.get('phno1');
        var temp=$("#temp").val();
        var count=0,count1;
        if(checkDataValidation(name,email,message,phno))  {
            if(!checkDuplicateData(email,temp)){
                jasonarray.forEach(function(arrayitem){
                $.each(arrayitem,function( key, value ) {
                    if(key==temp){
                        count1=count;    
                    }
                    count=count+1;
                });
            });
                jasonarray[count1][temp].username=name;
                jasonarray[count1][temp].email=email;
                jasonarray[count1][temp].phno=phno;
                console.log(JSON.stringify(jasonarray));
                localStorage.setItem("storeddata",JSON.stringify(jasonarray));
                myForm.reset();
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
        var myForm = document.getElementById('formdata');
        var formData = new FormData(myForm); 
        var name=formData.get('name');
		var email=formData.get('email');
		var message=$('#validatemessage');
		var phno=formData.get('phno');
        if(checkDataValidation(name,email,message,phno))  {   
            if(!checkDuplicateData(email,"temp")){
                jason.username=name;
                jason.email=email;
                jason.phno=phno;
                idobj[id]=jason;
                id++;
                jasonarray.push(idobj);
                console.log(JSON.stringify(jasonarray));
                localStorage.setItem("storeddata",JSON.stringify(jasonarray));
                localStorage.setItem("id",id);
                myForm.reset();
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
            alert("text should not be empty");formData
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
        if(tempdata.length<=0)
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
            alert("deleted successfully, if not reflected in ui please refresh browser");
        }
        
        console.log(JSON.stringify(jasonarray));
        localStorage.setItem("storeddata",JSON.stringify(jasonarray));
        view();
    }
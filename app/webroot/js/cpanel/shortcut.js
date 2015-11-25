
function shortCutsLoad(){
    var isCtrl = false;
    document.onkeyup = function(e) {

        if (e.which == 17)
            isCtrl = false;
    }
    document.onkeydown = function(e) {
        if (e.which == 112 &&
                typeof $(document.activeElement).attr('modal') !== 'undefined' &&
                $(document.activeElement).attr('modal') !== false
                ) { //f1 on modal
            modalWindowOb.show();
        }
        else if (e.which == 112) { //F1
            if($('body', window.top.document).hasClass('sidebar_hidden')){// already closed
                $('.sidebar_switch', window.top.document).toggleClass('on_switch off_switch').attr('title', _tl('Hide Sidebar'));
                $('body', window.top.document).removeClass('sidebar_hidden');
                $('.search_query', window.top.document).focus();//focus 
                //bind enter action

            }else{            
              $('.search_query', window.top.document).focus();
            }
            }


        if (e.which == 17)
            isCtrl = true;
        if (e.which == 83 && isCtrl == true) {
            //run code for CTRL+S � ie, save!
           /* if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;

            }
              alert('Keyboard shortcuts are cool!CTRL+S');
            $("#save").click();
            return false;*/
        }
        if (e.which == 68 && isCtrl == true) {
            e.preventDefault();
            //run code for CTRL+S � ie, save!
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;

            }
            $("#clear_input").click();
            return false;
        }
        if (e.which == 13) {
            e.preventDefault();
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;

            }
            $("#SignIn").click();
            return false;

        }
    }
    
  /*  $(document).bind('keydown', function(e){ 
        if(e.ctrlKey && (e.which == 83)) {
    e.preventDefault();
    alert('Ctrl+S');
    //$('#save').click(); 
    return false;
  };});*/
  $(window).keypress(function(event) {
    if (!(event.which == 115 && event.ctrlKey) && !(event.which == 19)) return true;
   // alert("Ctrl-S pressed");
    
    event.preventDefault();
    $('#save').click(); 
    return false;
});
    document.ondblclick = function(evt) {
        if (typeof $(document.activeElement).attr('modal') !== 'undefined' &&
                $(document.activeElement).attr('modal') !== false
                ) { //f1
            modalWindowOb.show();
        }
    }

}
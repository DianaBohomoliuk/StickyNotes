$(function(){
    let note = $( ".note" );
    let opener = $('.opener');
    let container = $('.container');
    let picker = $('.picker');
    let deleteBtn = $('.delete');
    let id = 0;
    let currentElementId = '';
    opener.click(function(){
        let newNote = $("<div class='note' id= 'note"+ id +"'><span class='ui-icon ui-icon-arrow-4'></span><textarea placeholder='Add Note'></textarea></div>").resizable().draggable({stack: '.note',
        cursor: 'move',
        create: function() {
        },
        start: function(){
            currentElementId = $(this).attr('id');
        }});
        currentElementId = 'note'+ id;
        id++;
        container.append(newNote);

    });

    container.on('click', ".note" || 'textarea', function () {
        currentElementId = $(this).attr('id');
    });

    picker.selectmenu({
        select:function(){
            let color = $('option:selected').attr('name');
            $("#" + currentElementId).css( 'background-color', color )
        }
    });

    deleteBtn.droppable({
        over: function(){
            $("#" + currentElementId).addClass('droppable');
        },
        out: function(){
            $("#" + currentElementId).removeClass('droppable');
        },
        drop: function(){
            $("#" + currentElementId).remove();
        },
        tolerance:"touch"

    });
    deleteBtn.tooltip({
        track: true
    });

    container.on('click', "textarea", function () {
        let maximum= getMax('.note');
        $(this).parent().css('z-index',(maximum+1))

    });
    function getMax(items){
        let max = 0;
        $(items).each(function(){
            let z = $(this).css('z-index');
            if(z == 'auto'){
                z= 1;
            }
            max = Math.max(max, z);
        })
        return max;
    }

})

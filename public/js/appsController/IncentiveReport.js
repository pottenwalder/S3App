
function delPen($idRecord){
    swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        confirmButtonText: 'Yes, delete it!',
        buttonsStyling: false
    }).then(function() {

        $.ajax({
            type: 'POST',
            url: '../Home/IncentiveReport/delPen',
            data: { idRecord: $idRecord },
            dataType: 'json',
            success: function (data) {
                console.log(data);
            },
            error:function (data) {
                // console.log(data);
            }
        });

        swal({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success',
            confirmButtonClass: "btn btn-success",
            buttonsStyling: false
        });

        let form = $('#formBody').serializeArray();
        $.ajax({
            type: 'POST',
            url: '../Home/IncentiveReport/penalizationData',
            data: { get_param: form },
            dataType: 'json',
            beforeSend(data){
                $("#Loader").css('visibility', 'visible');
            },
            success: function (data) {
                console.log(data);
                $("#Loader").css('visibility', 'hidden');
                $("#ResultContainer").css('visibility', 'visible');
                $("#IncentiveReport").html(data['IncentiveReport']);
            },
            error:function (data) {
                console.log(data);
            }
        });
    }).catch(swal.noop);
}





$(document).ready(function() {

    $sidebar = $('.sidebar');
    $sidebar_img_container = $sidebar.find('.sidebar-background');

    $full_page = $('.full-page');

    $sidebar_responsive = $('body > .navbar-collapse');
    sidebar_mini_active = true;

    window_width = $(window).width();

    fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();

    // if( window_width > 767 && fixed_plugin_open == 'Dashboard' ){
    //     if($('.fixed-plugin .dropdown').hasClass('show-dropdown')){
    //         $('.fixed-plugin .dropdown').addClass('show');
    //     }
    //
    // }

    $('.fixed-plugin a').click(function(event) {
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
        if ($(this).hasClass('switch-trigger')) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
        }
    });

    $('.fixed-plugin .active-color span').click(function() {
        $full_page_background = $('.full-page-background');

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if ($sidebar.length != 0) {
            $sidebar.attr('data-active-color', new_color);
        }

        if ($full_page.length != 0) {
            $full_page.attr('data-active-color', new_color);
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-active-color', new_color);
        }
    });

    $('.fixed-plugin .background-color span').click(function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        var new_color = $(this).data('color');

        if ($sidebar.length != 0) {
            $sidebar.attr('data-color', new_color);
        }

        if ($full_page.length != 0) {
            $full_page.attr('filter-color', new_color);
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.attr('data-color', new_color);
        }
    });

    $('.fixed-plugin .img-holder').click(function() {
        $full_page_background = $('.full-page-background');

        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');


        var new_image = $(this).find("img").attr('src');

        if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            $sidebar_img_container.fadeOut('fast', function() {
                $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                $sidebar_img_container.fadeIn('fast');
            });
        }

        if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $full_page_background.fadeOut('fast', function() {
                $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
                $full_page_background.fadeIn('fast');
            });
        }

        if ($('.switch-sidebar-image input:checked').length == 0) {
            var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
            var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

            $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
            $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
        }

        if ($sidebar_responsive.length != 0) {
            $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
        }
    });

    $('.switch-sidebar-image input').on("switchChange.bootstrapSwitch", function() {
        $full_page_background = $('.full-page-background');

        $input = $(this);

        if ($input.is(':checked')) {
            if ($sidebar_img_container.length != 0) {
                $sidebar_img_container.fadeIn('fast');
                $sidebar.attr('data-image', '#');
            }

            if ($full_page_background.length != 0) {
                $full_page_background.fadeIn('fast');
                $full_page.attr('data-image', '#');
            }

            background_image = true;
        } else {
            if ($sidebar_img_container.length != 0) {
                $sidebar.removeAttr('data-image');
                $sidebar_img_container.fadeOut('fast');
            }

            if ($full_page_background.length != 0) {
                $full_page.removeAttr('data-image', '#');
                $full_page_background.fadeOut('fast');
            }

            background_image = false;
        }
    });


    $('.switch-mini input').on("switchChange.bootstrapSwitch", function() {
        $body = $('body');

        $input = $(this);

        if (paperDashboard.misc.sidebar_mini_active == true) {
            $('body').removeClass('sidebar-mini');
            paperDashboard.misc.sidebar_mini_active = false;

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

        } else {

            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

            setTimeout(function() {
                $('body').addClass('sidebar-mini');

                paperDashboard.misc.sidebar_mini_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        var simulateWindowResize = setInterval(function() {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function() {
            clearInterval(simulateWindowResize);
        }, 1000);

    });

    // Initialise the wizard
    demo.initWizard();
    demo.initDateTimePicker();



    setTimeout(function() {
        $('.card.card-wizard').addClass('active');
    }, 600);


    function generateTable(id){

        $(id).DataTable({
            dom: 'Bfrtip',
            responsive: {
                details: false
            },
            fixedHeader: true,
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: 'Oceanx Incentive Report'
                }
            ],
            "pagingType": "full_numbers",
            "lengthMenu": [
                [10, 25, 50, -1],
                [10, 25, 50, "All"]
            ],
            responsive: true,
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search records",
            }

        });

        let table = $(id).DataTable();

        // Delete a record
        table.on('click', '.remove', function(e) {
            $tr = $(this).closest('tr');
            table.row($tr).remove().draw();
            e.preventDefault();
        });

    }

    $('.collapse').collapse();

    // JSON to CSV Converter
    function ConvertToCSV(objArray) {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';
        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    $('#generateButton').on('click',function () {

        let form = $('#formBody').serializeArray();

        $.ajax({
            type: 'POST',
            url: '../Home/IncentiveReport/getData',
            data: { get_param: form },
            dataType: 'json',
            beforeSend(data){
                $("#Loader").css('visibility', 'visible');
            },
            success: function (data) {
                console.log(data);
                $("#Loader").css('visibility', 'hidden');
                $("#ResultContainer").css('visibility', 'visible');

                $("#IncentiveReport").html(data['IncentiveReport']);
                generateTable(datatableIR);


            },
            error:function (data) {
                console.log(data);
            }
        });
    })


    $('#saveQa').on('click',function () {
        let form = $('#qaForm').serializeArray();
        console.log('--->');
        console.log(form);
        console.log('<---');
        $.ajax({
            type: 'POST',
            url: '../Home/IncentiveReport/saveQa',
            data: { get_param: form },
            dataType: 'json',
            beforeSend(data){
            },
            success: function (data) {
                console.log(data);
                if (data =='Ok'){
                    swal({
                        title: "Good job!",
                        text: "You manual evaluation has been save!",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                        type: "success"
                    }).catch(swal.noop);
                    $('#qaModal').modal('toggle');
                }else{
                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong please verify all the fields!',
                        footer: 'Ok'
                    }).catch(swal.noop);
                }

            },
            error:function (data) {
               // console.log(data);
            }
        });
    });



    $('#savePen').on('click',function () {
        let form = $('#penForm').serializeArray();
        console.log('--->');
        console.log(form);
        console.log('<---');
        $.ajax({
            type: 'POST',
            url: '../Home/IncentiveReport/savePen',
            data: { get_param: form },
            dataType: 'json',
            beforeSend(data){
            },
            success: function (data) {
                console.log(data);
                if (data =='Ok'){
                    swal({
                        title: "Good job!",
                        text: "You penalization has been save!",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                        type: "success"
                    }).catch(swal.noop);
                    $('#penModal').modal('toggle');
                }else{
                    swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong please verify all the fields!',
                        footer: 'Ok'
                    }).catch(swal.noop);
                }

            },
            error:function (data) {
                // console.log(data);
            }
        });
    });


    $('#generatePenalizationReport').on('click',function () {

        console.log('Fruta');
        let form = $('#formBody').serializeArray();
        $.ajax({
            type: 'POST',
            url: '../Home/IncentiveReport/penalizationData',
            data: { get_param: form },
            dataType: 'json',
            beforeSend(data){
                $("#Loader").css('visibility', 'visible');
            },
            success: function (data) {
                console.log(data);
                $("#Loader").css('visibility', 'hidden');
                $("#ResultContainer").css('visibility', 'visible');

                $("#IncentiveReport").html(data['PenalizationReport']);
                generateTable(datatableIR);


            },
            error:function (data) {
                console.log(data);
            }
        });
    })
});
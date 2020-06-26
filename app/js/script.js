$(function () {

    // When click on Save Image upload this Image to the S3 Bucket.
    $("#image #saveButton").click(function () {
        console.log('HI');
        let field = $('.fileinput').find('input[name=image]'),
            file = field[0].files[0],
            url = '{{Host}}Index/S3Upload',
            fileName = file['name'],
            fileEncode = file['result'];
        $.ajax({
            type: 'POST',
            url: url,
            data: {fileName: fileName, Image: fileEncode},
            beforeSend: function () {
                 run_waitMe('roundBounce')
            },
            success: function (json) {
                console.log(json)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              $('#wrapperDiv').waitMe('hide');
                console.log('Upload error: ' + XMLHttpRequest.responseText);
            }, complete: function () {
                setTimeout(function(){
                    $('#wrapperDiv').waitMe('hide');
                    // Call the function to get the thumbnail
                    getS3Thumbnail();
                },5000);
            }
        });
    });


    // This function get the files to showup on the Thumbnail
    function getS3Thumbnail() {
        let url = '{{Host}}Index/getS3Files';
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            beforeSend: function () {
                 run_waitMe('roundBounce')
            },
            success: function (json) {
                let html = `<ul>`;
                json.array_key.map((value, index) => {
                    html += `<li><img src="https://n301-resized.s3-us-west-2.amazonaws.com/${value}"/></li>`;
                });
                html += `</ul>`;
                $(`.thumbnail-div`).html(html);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              $('#wrapperDiv').waitMe('hide');
                console.log('Upload error: ' + XMLHttpRequest.responseText);
            }, complete: function () {
              $('#wrapperDiv').waitMe('hide');
                // Initialize the thumbnail library
                $('.thumbnail-div').hSmartThumbnail();
                $('.thumbnail-div').imagesLoaded(function () {
                    $('.plugin').css("display", "block");
                });
            }
        });
    }

    function run_waitMe(effect){
        console.log('hola');
        $('#wrapperDiv').waitMe({

            //none, rotateplane, stretch, orbit, roundBounce, win8,
            //win8_linear, ios, facebook, rotation, timer, pulse,
            //progressBar, bouncePulse or img
            effect: 'bounce',

            //place text under the effect (string).
            text: '',

            //background for container (string).
            bg: 'rgba(255,255,255,0.7)',

            //color for background animation and text (string).
            color: '#000',

            //max size
            maxSize: '',

            //wait time im ms to close
            waitTime: -1,

            //url to image
            source: '',

            //or 'horizontal'
            textPos: 'vertical',

            //font size
            fontSize: '',

            // callback
            onClose: function() {}

        });
    }

    // Call the function to get the thumbnail
    getS3Thumbnail();

});




function start() { 
    fetch('/library')
    .then(data=>data.json())
    .then(data=> { 
        console.log(data);
        var elementRoot = $('#videoBrowser');
        data.fileList.forEach(x=>{
            var videoElement = $(`<div>${x}</div>`);
            $(elementRoot).append(videoElement);
            $(videoElement).click(()=>{
                var videoURL = `/video/${x}`;
                console.log(videoURL);
                $('#videoPlayer').attr('src', videoURL );
            })
        });
        
    });
}

$(document).ready(start());
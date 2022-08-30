document.getElementById("play-button").onclick = function (){
    const myModal = new bootstrap.Modal(document.getElementById('gameModal'), {})
    const modalBody = document.getElementsByClassName("modal-body")[0];

    myModal.show();
    setTimeout(()=>{

        const iframe = document.createElement("iframe");
        // connecting the source directly to dist folder rather than through web link
        iframe.src = '../game/dist';
        iframe.width="100vw";
        iframe.style.height='100vh';
        modalBody.appendChild(iframe);
    },1000)
}
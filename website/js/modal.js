document.getElementById("play-button").onclick = function (){
    const myModal = new bootstrap.Modal(document.getElementById('gameModal'), {})
    myModal.show();
}
//Selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");

let file ; //this is a global variable and we'll use it inside multiple functions
button.onclick = () => {
    input.click(); //if user click on the button then the input
}
input.addEventListener("change", function(){
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    showFile(); //calling function
    dropArea.classList.add("active");
});
//if user Drag File Over DragArea
dropArea.addEventListener("dragover", (event)=> {
    event.preventDefault(); //preventing from default behaviour
    // console.log("File is over DragArea");
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File"
});
//If user leave dragged File Over from DrageArea
dropArea.addEventListener("dragleave", ()=> {
    // console.log("File is outside from DragArea");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File"
});
//if user drop File on DropArea
dropArea.addEventListener("drop", (event)=> {
    event.preventDefault(); //preventing from default behaviour
    // console.log("File is dropped on DragArea");
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});
function showFile(){
    let fileType = file.type;
    // console.log(fileType);

    let validExtensions = ["image/jpeg", "image/jpg", "image/png",]; //adding some valid image extensions in array.
    if(validExtensions.includes(fileType)){ //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURl variable
            // console.log(fileURL);
            let imgTag = `<img src="${fileURL}" alt="">`;//creating an img tag and passing user selected file source inside src attribute
            dropArea.innerHTML = imgTag;//adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file);
        // console.log("This is an Image File");
    }else{
        alert("This is not an Image File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}
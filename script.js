
// 1st request creating the first random image that appears on page-load
const request1 = new XMLHttpRequest();
request1.onreadystatechange = function() {
    if (this.readyState === 4) {
        console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        var dogImage = document.getElementById('dog-image');
        dogImage.src = data.message;
    }
}

request1.open('GET', 'https://dog.ceo/api/breeds/image/random');
request1.send();



// 2nd request creating the drop-down options list
const request2 = new XMLHttpRequest();
request2.onreadystatechange = function() {
    if (request2.readyState === 4) {
        console.log(this.responseText);
        var data = JSON.parse(this.responseText);
        console.log(data.message);
        var breedsArr = Object.keys(data.message);
        console.log(breedsArr);

        // For Loop creating the options within the select drop-down corresponding to breed-subbreed
        for (let i=0; i<breedsArr.length; i++) {
            if (data.message[breedsArr[i]].length === 0) {
                let sel = document.getElementById('select-breed');
                let opt = document.createElement('option');
                opt.innerHTML = breedsArr[i];
                opt.value = breedsArr[i];
                sel.appendChild(opt);
            } else if (data.message[breedsArr[i]].length !== 0) {
                for (let x=0; x<data.message[breedsArr[i]].length; x++) {
                    let sel = document.getElementById('select-breed');
                    let opt = document.createElement('option');
                    let breed = breedsArr[i];
                    let subBreed = data.message[breedsArr[i]][x]
                    opt.innerHTML = `${subBreed} ${breed}`;
                    opt.value = `${breed}-${subBreed}`;
                    sel.appendChild(opt);
                }
            }
        }
    }
}

request2.open('GET', 'https://dog.ceo/api/breeds/list/all');
request2.send();


// const request3 = new XMLHttpRequest();
// request3.onreadystatechange = function() {
//     if (request3.readyState === 4) {



// var link = `https://dog.ceo/api/breed/${breed}/${subbreed}/list/random`;

// request3.open('GET', link);
// request3.send();









 // var sel = document.getElementById('select-breed');
        // for (var key in data.message) {
        //     if (data.message.hasOwnProperty(key)) {

                
        //         var i = 0;
        //         if (data.message[key].length === 0) {
        //             console.log(data.message['bulldog']);
        //             let breedName = data.message[i];
        //             var opt = document.createElement('option');
        //             opt.innerHTML = breedName;
        //             opt.value = breedName;
        //             sel.appendChild(opt);
        //             i++;
        //         } else if (data.message[key].length !== 0) {
        //             console.log(data.message[key])


        //         }


                // var opt = document.createElement('option');
                // opt.innerHtml = data.message[key];
                // opt.value = data.message[key];
                // sel.appendChild(opt);
        //     }
        // }

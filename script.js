
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

// Setting IDs and then creating event listener on button click
// Button event listener is look at the select.value, seeing if it contains a '-')
const select = document.getElementById('select-breed');
const button = document.getElementById('get-breed');
button.addEventListener('click', function() {
    // if select.value contains a '-' split the string into the array and use the array values in the URL
    if (select.value.includes('-')) {
        let strSplitArr = select.value.split('-')
        let url = `https://dog.ceo/api/breed/${strSplitArr[0]}/${strSplitArr[1]}/images/random`
        getDog(url);
    // if select.value doesn't contain a '-', set the select.value in the URL
    } else {
        let url = `https://dog.ceo/api/breed/${select.value}/images/random`
        getDog(url);
    }
})

// Sets the dog image as a variable and then receives the getDog(url) call from the event listener click which fetchs the URL and sets the image
const getDogImage = document.getElementById('dog-image');
const getDog = url => {
    fetch(url)
        .then(res => {
            return res.json();
        })
        .then(data => {
            getDogImage.src = data.message;
        })
}





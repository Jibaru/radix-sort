var formList = document.getElementById('form-list');
var result = document.getElementById('result');
var inputList = document.getElementById('input-list');
var initialList = document.getElementById('initial-list');

function parseString(listString){
    var list = listString.split(',');
    return list;
}

function isNegative(num){
    if(num < 0){
        return true;
    }
    return false;
}

function isDecimal(num){
    if(num % 1 == 0){
        return false;
    }
    return true;
}

function getMax(list){
    let max = 0;
    for(var num of list){

        if(isDecimal(num) && isNegative(num)){
            var numParsed = num.toString().split('.')[0];
            if(max < numParsed.length - 1 ){
                max = numParsed.length - 1;
            }
        } else if(isDecimal(num) && !isNegative(num)){
            var numParsed = num.toString().split('.')[0];
            if(max < numParsed.length){
                max = numParsed.length;
            }
        } else if(!isDecimal(num) && isNegative(num)){
            if(max < num.toString().length - 1){
                max = num.toString().length - 1;
            }
        } else {
            if(max < num.toString().length){
                max = num.toString().length;
            }
        }
        
    }
    return max;
}

// Example: 
// getPosition(243, 1) -> 4
// getPosition(162, 2) -> 1
function getPosition(num, pos){
    return  Math.floor(Math.abs(num) / Math.pow(10,pos)) % 10;
}

function toList(buckets){
    var listOutput = [];
    for(var a of buckets){
        for(var b of a){
            if(b != null && b != undefined){
                console.log(typeof b);
                listOutput.push(b);
            }
        }
    }
    return listOutput;
}

function createDivBucket(bucket, index){

    var bucketDiv = '<div class="col p-0 text-center border border-secondary">';
    bucketDiv += '<div class="p-1 bg-dark text-white">'+index+'</div>';

    for(var element of bucket){
        bucketDiv += '<div class="p-1 border-bottom border-secondary">' + element + '</div>'
    }

    bucketDiv += '</div>';

    return bucketDiv;

}


function printBuckets(buckets, it){

    var bucketRow = '<div class="card mb-5">';
        bucketRow += '<div class="card-header"><h5>Iteración: '+ it +'</h5></div>'
        bucketRow += '<div class="card-body"><div class="row">';

    for(var i = 0; i < buckets.length; i++){
        bucketRow += createDivBucket(buckets[i], i);
    }

    bucketRow += '</div></div>';
    bucketRow += '<div class="card-footer">';
    bucketRow += '<span class="badge badge-primary">Lista:</span> ['+ toList(buckets) +']</div></div>'

    result.innerHTML += bucketRow;

}

function printInitialList(list){
    initialList.innerHTML += 
        '<div class="card mb-2">'+
        '<div class="card-body">'+
        '<span class="badge badge-primary">Lista inicial:</span> ['+ list +']</div></div>';
}

function clearAll(){
    result.innerHTML = '';
    initialList.innerHTML = '';
}

function calc(list){
    const max = getMax(list);

    clearAll();
    printInitialList(list);
    
    // Para las centenas, decenas...
    for (let i = 0; i < max; i++) {
        // creamos los 10 arreglos (del 0 al 9)
        // quedará: [[],[]...,[]] -> 9 arrays en el array
        let buckets = Array.from({ length: 10 }, () => [ ]);

        for (let j = 0; j < list.length; j++) {
            buckets[getPosition(list[ j ], i)].push(list[ j ]); // pushing into buckets
        }

        printBuckets(buckets, i);

        list = [].concat(...buckets);
    }
    return list;
}


formList.addEventListener('submit', function(e){
    e.preventDefault();

    var vals = inputList.value;

    var list = parseString(vals);

    calc(list);
});
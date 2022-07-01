function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    var container = document.getElementById('container');
    container.innerHTML = "";
    array.forEach (x => {
        var bar = document.createElement('div');
        bar.innerHTML = x;
        bar.id = String(x);
        bar.style.height =  x*2;
        container.appendChild(bar);
    });
}
var array = [];
var sortedArray = [];

for (var i = 0; i <100; i++) {
    array[i] = i + 1;
    sortedArray[i] = i + 1;
}
shuffle(array);
var stat = 0;


var li = 0;
var red = true;

var index = 0;
var pivot = array[4];

var a = -1;

function disableButtons() {
    document.getElementById("quickSort").disabled = true;
     document.getElementById("heapSort").disabled = true;
     document.getElementById("mergeSort").disabled = true;
     document.getElementById("insertionSort").disabled = true;
     document.getElementById("selectionSort").disabled = true;
      document.getElementById("swap").disabled = true;
}

function enableButtons() {
    document.getElementById("quickSort").disabled = false;
    document.getElementById("heapSort").disabled = false;
    document.getElementById("mergeSort").disabled = false;
    document.getElementById("insertionSort").disabled = false;
    document.getElementById("selectionSort").disabled = false;
     document.getElementById("swap").disabled = false;
}


function swap(arr, i3, j3) {
    var i2 = arr[i3];
    var j2 = arr[j3];
    var iHTML = document.getElementById(String(i2));

    iHTML.innerHTML = j2;
    iHTML.style.height =   j2;

    var jHTML = document.getElementById(String(j2));
    jHTML.innerHTML = i2;
    jHTML.style.height = i2;

    iHTML.id = j2;
    jHTML.id = i2;
    
    arr[i3] = j2;
    arr[j3] = i2;
}


var j = 0;
function quickSort(arr, lo, hi, i, j, state) {
    disableButtons();
    if (state == "start") {
        stat = 0;
    }
    setTimeout(function() {  
        if (lo <= hi) {
            var x = arr[j];
            var pivot = arr[hi];
            
                if (red) {
                    stat += 1;
                    console.log(stat);
                    document.getElementById("type").innerHTML = "Quick Sort Average Time Complexity: N*log(N)";
                    document.getElementById("comp").innerHTML = stat + " Comparisons";
                    document.getElementById(String(x)).style.background = 'red';
                     red = false;
                 } else {
                     if (arr[j] < pivot) {
                        i += 1;
                         document.getElementById(String(x)).style.background = 'white';
                         red = true;
                         swap(arr, i, j);
                     }
                     document.getElementById(String(x)).style.background = 'white';
                     red = true;
                 }
            if (li == 0) {   
                li++;         
                quickSort(arr, lo, hi, i, j, "not start");
            } else {
                li = 0;
                j++;
                if (j > hi - 1) {
                    i += 1;
                    swap(arr, i, hi);
                    var z = i;
                    i = -1;
                    j = 0;
    
                    quickSort(arr, lo, z-1,lo-1, lo, 'before');
                    quickSort(arr,z+1, hi, z, z+1, 'after');
                    
                } else {
                    quickSort(arr,lo, hi, i, j, "not start ");
                }
            }      
        } else {
            if (compare(arr)) {
                enableButtons();
            }
        }    
    }, 10)



}
function compare (arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != sortedArray[i]) {
            return false;
        }
    }
    return true;
}
var n1, n2, leftArray = {}, rightArray={};
li = 0;
red = true;

var orders = [];
function mergeSort(arr, beg, end, state) {
    var mid = Math.floor((beg + end) / 2);
    
        if (beg < end) {
            
            console.log("first: ", beg, end);
             mergeSort(arr, beg, mid, "start");

            console.log("end: ", beg, end);
            mergeSort(arr, mid + 1, end, "end");
            orders.push([beg, mid, end]);
   
           // console.log("merge: ", beg, end);
             //merge(arr, beg, mid, end, 0, 0, beg, state, -1);

 
            console.log(orders);    
        }
}
function mergeSort2(arr, beg, end, state) {
    stat = 0;
    disableButtons();
    mergeSort(arr, beg, end, state);
    test();

}
var z = 0;
var prev;
function test() {
    
    setTimeout(function() { 
        if (z < orders.length) {
            merge(array, orders[z][0], orders[z][1], orders[z][2], 0, 0, orders[z][0], "?", -1);
            z++;
        } else {
            enableButtons();
        }
    }, 10);
    
    
}

function merge(arr, beg, mid, end, i, j, k, state, step) { 
        console.log(beg, end, k);
        console.log(i,j,k);
        if ((k <= end && beg < end)) {   
            console.log("HELLO", step);
            if (step == -1) {

                for (var ii = 0; ii < mid - beg + 1; ii++) {
                    leftArray[ii] = arr[beg + ii];
                }
    
                for (var jj = 0; jj < end - mid; jj++) {
                    rightArray[jj] = arr[mid + 1 + jj];
                }
                step++;
                console.log("LEFT: ",leftArray);
                console.log("RIGHT: ",rightArray);
            }
            if (step == 0) {
                if (i < mid - beg + 1 && j < end - mid) {
                    console.log("?", red);
                   // setTimeout(function() { 
                        if (red) {
                            stat++;
                            document.getElementById("type").innerHTML = "Merge Sort Average Time Complexity: N*log(N)";
                        document.getElementById("comp").innerHTML = stat + " Comparisons";
                            document.getElementById(leftArray[i]).style.background = 'red';
                            document.getElementById(rightArray[j]).style.background = 'red';
                            if (leftArray[i] <= rightArray[j]) {
                                prev = leftArray[i];
        
                            } else {

                            prev = rightArray[j];
      
                            }

                            red = false;
                        } else {
                         document.getElementById(leftArray[i]).style.background = 'white';
                        document.getElementById(rightArray[j]).style.background = 'white';
                         if (prev == leftArray[i]) {
                            i++;
                         } else if (prev == rightArray[j]) {
                            j++;
                         }
                         swap(arr, k, arr.indexOf(prev));
                         k++;
                            red = true;
                        }
                   // },  50);
                    
                } else {
                    step++;
                }
            }
            else if (step ==1) {
                //console.log("Step 1!");
                    if (i <mid - beg + 1) {
                        console.log("?", red);
                        if (red) {
                            document.getElementById(String(leftArray[i])).style.background = 'red';
                            red = false;
                        } else {
                            document.getElementById(String(leftArray[i])).style.background = 'white';
                            swap(arr, k, arr.indexOf(leftArray[i]));
                            red = true;
                            i++;
                            k++;
                        }

                    } else {
                        step++;
                    }
    
            }
            else if (step ==2) {

                    //console.log("Step 2!");
                    if ( j < end - mid) {
                        console.log("?", red);
                        if (red) {
                            document.getElementById(String(rightArray[j])).style.background = 'red';
                            red = false;
                        } else {
                            document.getElementById(String(rightArray[j])).style.background = 'white';
                            swap(arr, k, arr.indexOf(rightArray[j]));
                            red = true;
                            j++;
                            k++;
                        }
                    } else {
                        step = -1;
                    }

            } 
            console.log(arr);
            setTimeout(function() { 
            if (li == 0) {
                li++;
                console.log('end:', i,j,k);
                merge(arr, beg, mid, end, i, j, k, state, step);
            } else {
                li = 0;
                console.log('end:', i,j,k);
                merge(arr, beg, mid, end, i, j, k, state, step);
            }
        }, 10);
        } else {
            test();
            
        }
}

function heapSort(arr) {
    stat = 0;
    disableButtons();
    var len = arr.length;

    heapSort1(arr, len/2 - 1);
}

function heapSort1(arr, i) {
    var len = arr.length;
    setTimeout(function() {
        if (i >= 0) {
            console.log(i);
            heapify(arr, len, i, i, 1, i);
        } else {
            heapSort2(arr, arr.length - 1);
        }
    }, 10);
}

function heapSort2(arr, i) {
    setTimeout(function() {
        if (i >= 0) {
            swap(arr, 0, i);
            heapify(arr, i, 0, 0, 2, i);
        } else {
            enableButtons();
        }
    }, 10);
}

red = true;

function heapify(arr, n, i, lar, t, save) {
    var largest = lar;
    var left = 2*i + 1;
    var right = 2*i + 2;

    setTimeout(function() {
    if (red) {
        if (left < n) {
            stat++;
            document.getElementById("type").innerHTML = "Heap Sort Average Time Complexity: N*log(N)";
            document.getElementById("comp").innerHTML = stat + " Comparisons";
            document.getElementById(left).style.background = 'red';
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }
        if (right < n) {
            stat++;
            document.getElementById("type").innerHTML = "Heap Sort Average Time Complexity: N*log(N)";
            document.getElementById("comp").innerHTML = stat + " Comparisons";
            document.getElementById(right).style.background = 'red';
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }
        
    
       red = false;
       console.log("Da: ", i);
        heapify(arr, n, i, largest, t, save);
    } else {
        if (left <n) {
            document.getElementById(left).style.background = 'white';
        }

        if (right < n) {
            document.getElementById(right).style.background = 'white';
        }
        
        red = true;
        if (largest != i) {
            console.log("FUQ:", i);
            swap(arr, i, largest);
            heapify(arr, n, largest, largest, t, save);
        } else {
            if (t == 1) {
                heapSort1(arr, save - 1);
            } else if (t == 2) {
                heapSort2(arr, save -1);
            }
        }

    }

}, 10);
}

function insertionSort(arr, i) {
    stat = 0;
    setTimeout(function() {
        if (i < arr.length) {
            var key = arr[i];
            var j = i - 1;

            insertionSort2(arr,j, key, i);
        }
    }, 10);
}

red = true;
function insertionSort2(arr, j,key, i) {
    setTimeout(function() {
    if (j >= 0 && arr[j] > key) {
        if (red) {
            stat++;
            document.getElementById("type").innerHTML = "Insertion Sort Average Time Complexity: N^2";
            document.getElementById("comp").innerHTML = stat + " Comparisons";
            document.getElementById(arr[j]).style.background = 'red';
            red = false;
            insertionSort2(arr, j,key, i);
        } else {
            document.getElementById(arr[j]).style.background = 'white';
            swap(arr, j+1, j);
            red = true;
            insertionSort2(arr, j-1,key, i);
        }
    } else {
        insertionSort(arr, i+1);
    }
}, 10);
}

function selectionSort(arr) {
    stat = 0;
    var len = arr.length;
    selectionSort1(arr, 0, len);
    console.log(arr);
}

function selectionSort1(arr, i, len) {
    if (i < len -1) {
        var min = i;
       selectionSort2(arr, i, i+1, len, min);
    }
}

red = true;

function selectionSort2(arr, i, j, len, min) {
    setTimeout(function() {
        if (red){
            stat++;
            document.getElementById("type").innerHTML = "Selection Sort Average Time Complexity: N^2"
            document.getElementById("comp").innerHTML = stat + " Comparisons";
            document.getElementById(j).style.background = 'red';
            red = false;
            //var audio = new Audio('src/' + j + '.mp3');
            //audio.play();
            selectionSort2(arr, i, j, len, min);
        } else {
            document.getElementById(j).style.background = 'white';
            red = true;
            if (j < len) {
                if (arr[j] < arr[min]){
                    min = j;
                }
                selectionSort2(arr, i, j+1, len, min);
            } else {
                swap(arr, min, i);
                selectionSort1(arr, i+1, len);
            }
        }

    }, 10);
}
module QT {
    export class Utilities {
        static powerOf2(x: number) {
            return x !== 0 && (x & (x - 1)) === 0;
        }

        static indexOf(elem, array, comparer) {
            //if (array.indexOf) { 
            //    return array.indexOf(elem);
            //}
            var length = array.length;
            for (var i = 0; i < length; ++i) {
                if(comparer(array[i],elem))
                    return i;
            }
            return -1;
        } 
    }
} 
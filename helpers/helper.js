/**
 * 
 * @param {Array of Objects} array 
 * @param {integer} id 
 * @returns found element
 */
exports.findById = (array,id) => {
   let found=array.find(element => element.id==id);
   return found;
}
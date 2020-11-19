// const itemCollection = firebase.db.collection('products');
// const item = itemCollection.doc(id);
// item.get().then(doc => {
//   if(!doc.exists){
//     setError(true);
//     return
//   }
//   return setProduct({
//     id: doc.id,
//     ...doc.data()
//   });
// }).catch(error => {
//   setError(true);
//   console.log("Error: ", error);
// }).finally(() => {
//   setLoading(false);
//   setConsult(false);
// });
import firestore from '@react-native-firebase/firestore';
const cardsRef = firestore().collection('cards');


export const  addCard = async (params)=>{

  await cardsRef.add(params).then(()=>{
      console.log("card Added successfully");
    })
    .catch( e => {
      console.log("error entering card:",e);
    })

}


export const getAllCards = async () =>{   
  let data = null
  await cardsRef
  .orderBy('createdAt','asc')
  .get()  
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);    
    // return querySnapshot;
    data= querySnapshot
  });
  return data;
}

export const  updateCard = async (id,params)=>{
  console.log(id,params);
  await cardsRef.doc(id).update(params).then(()=>{
      console.log("card updated successfully");
    })
    .catch( e => {
      console.log("error entering card:",e);
    })

}


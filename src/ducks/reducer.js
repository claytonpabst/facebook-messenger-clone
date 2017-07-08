
 const EXAMPLE = 'EXAMPLE'

const initialState = {
  loading: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE:
      return {
        loading: action.payload,
      }
    default:
      return state;
    }
}


export function handleSubscription(){
    return{
      type: EXAMPLE,
      payload: true
    } 
}

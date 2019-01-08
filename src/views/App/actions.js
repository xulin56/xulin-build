export const startLoading = ()=>{
    return {type:"SET_LOADING",param:{loadStatus:true}};
};

export const stopLoading = ()=>{
    return {type:"SET_LOADING",param:{loadStatus:false}};
};

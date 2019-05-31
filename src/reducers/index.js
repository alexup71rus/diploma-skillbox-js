const reducers = (state = [], action) => {
    let newState = {...state};
    switch (action.type) {
        case 'SET_MY_INFO':
        newState.user_info = action.info;
        return {...newState};

        case 'ADD_IMAGES':
        newState.images = [...state.images, ...action.images];
        return {...newState};

        case 'TOGGLE_LIKE':
        let i = 0;
        newState.images = state.images.map((image)=>{
            i++;
            if(i === action.id){
                if (image.liked_by_user) {
                    image.liked_by_user = false;
                    image.likes--;
                    action.unsplash.photos.unlikePhoto(action.image);
                } else {
                    image.liked_by_user = true;
                    image.likes++;
                    action.unsplash.photos.likePhoto(action.image);
                }
                return image;
            }
            return image;
        });
        return {...newState};

        case 'POPUP_IMAGE':
        newState.popup_image = {
            id: action.id,
            state: action.state,
            image: action.image
        };
        return {...newState};

        case 'TOGGLE_BLUR':
        newState.settings = { ...action.arr };
        // window.localStorage.setItem('settings', JSON.stringify(newState.settings)); window.localStorage.setItem('settings', JSON.stringify(newState.settings));
        return {...newState};

        default:
        return state;
    }
}

export default reducers;
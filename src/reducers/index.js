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
        newState.images = state.images.map((image, i)=>{
            if(i === action.id){
                if (image.liked_by_user == true) {
                    image.liked_by_user = false;
                    image.likes--;
                } else if (image.liked_by_user == false) {
                    image.liked_by_user = true;
                    image.likes++;
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

        case 'CHANGE_SETTINGS':
        Object.keys(action.arr).map((item, index) => {
            if (newState.settings[item] !== undefined) {
                newState.settings[item] = action.arr[item];
            }
        });
        return {...newState};

        default:
        return state;
    }
}

export default reducers;
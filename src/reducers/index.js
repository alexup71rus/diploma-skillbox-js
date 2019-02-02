const reducers = (state = [], action) => {
    switch (action.type) {
        case 'SET_MY_INFO':
        return {
            images: [...state.images],
            user_info: action.info,
            test: state.test
        };

        case 'ADD_IMAGES':
        return {
            images: [...state.images, ...action.images],
            // images: [...state.images, action.images],
            user_info: {...state.user_info},
            test: state.test
        };

        case 'SET_LIKE':
        let i = 0;
        return {
            images: state.images.map((image)=>{
                i++;
                if(i == action.id){
                    if (image.liked_by_user) {
                        image.liked_by_user = false;
                        image.likes--;
                    } else {
                        image.liked_by_user = true;
                        image.likes++;
                    }
                    return image;
                }
                return image;
              }),
            user_info: {...state.user_info},
            test: ++state.test
        };;

        case 'TEST':
        return {
            images: [...state.images],
            user_info: {...state.user_info},
            test: ++state.test
        };

        default:
        return state;
    }
}

export default reducers;
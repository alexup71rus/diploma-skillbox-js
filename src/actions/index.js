export const setMyInfo = (info) => {
    return {
        type: 'SET_MY_INFO',
        info: info
    }
}

export const addImages = (images) => {
    return {
        type: 'ADD_IMAGES',
        images: images
    }
}

export const likeImage = (id) => {
    return {
        type: 'SET_LIKE',
        id: id
    }
}

export const test = (int) => {
    return {
        type: 'TEST'
    }
}
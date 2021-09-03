export const OPEN_MODAL_FILTER='OPEN_MODAL_FILTER';
export const CLOSE_MODAL_FILTER='CLOSE_MODAL_FILTER';
export const ENABLE_FILTER = 'ENABLE_FILTER';
export const DISABLE_FILTER = 'DISABLE_FILTER';

export const openModalFilter = () => {
    return {type: OPEN_MODAL_FILTER}
}

export const closeModalFilter = () => {
    return {type: CLOSE_MODAL_FILTER}
}

export const enableFilter = () => {
    return {type:ENABLE_FILTER}
}

export const disableFilter = () => {
    return {type:DISABLE_FILTER}
}

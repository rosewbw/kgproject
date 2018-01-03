function getElementPositionOfWindow(ele) {
    return {
        left:ele.offsetLeft,
        top:ele.offsetTop
    }
}

function getClickPosition(e) {
    e = e || window.event;
    return {
        left: e.clientX,
        top: e.clientY
    };
}

export {getElementPositionOfWindow,getClickPosition}
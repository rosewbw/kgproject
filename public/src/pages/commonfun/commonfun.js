function getElementPositionOfWindow(ele) {
    return {
        left:$(ele).offset().left,
        top:$(ele).offset().top
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
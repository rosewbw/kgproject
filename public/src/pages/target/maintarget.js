import $ from 'jquery'

let control = {
    target: null ,
    trans: null ,
    imgCont: null ,
    svgCont: null ,
    start: null ,
    list: null ,
    remove: null
};
let manifestOptions = {
    imgClassOnList: 'canvas-api-img-main',
    imgClassOnCanvas: 'canvas-api-img-main',
    imgBoxClass: 'canvas-api-imgbox',
    imgBoxClassOnCanvas: 'canvas-api-imgbox',
    startClass: 'canvas-api-start',
    pathCollect: 'canvas-api-path-collect',
    butnEditorId: 'start-butn-editor',
    removeButtonClass: 'canvas-api-remove-butn',
    removeButtonPosition: null,
    removeButnColor: '#23df67',
    circle: 'canvas-api-circle',
    circleSize: [20, 20],
    floatImgOpacity: 0.7,
    hightLightColor: '#34a3cf',
    pathAboveColor: '#000',
    pathBottomColor: '#fff',
    pathAboveWidth: 2,
    pathHighLight: '#fff',
    pathBottomWidth: 3,
    arrowBottom: 4,
    arrowHeight: 6
};

let targetUrl = null ;
let imgOriginalPosition = {};
let scale = 1;
let pathContainer = [];
let pathFrom = null ;
let elements = [];

class Target{
    constructor(element,list,targetOptions,callback){
        this.data = [];
        this.list = list;
        this.element = element;
        updateBasicOptions(targetOptions);
        initTarget(element,list);
        bindEvent()
    }

}

function updateBasicOptions(targetOptions) {
    if(targetOptions){
        for(let prop in targetOptions){
            if(targetOptions.hasOwnProperty(prop) &&
                manifestOptions.hasOwnProperty(prop)){
                manifestOptions[prop] = targetOptions[prop];
            }
        }
    }
}

function initTarget(target,list){
    let transform = createElement('div').addClass('canvas-transform').attr('id', 'canvas-transform');
    let start = createElement('div').addClass(manifestOptions.startClass).attr('id', 'trans-start').text('Start');
    let imgContainer = createElement('div').addClass('canvas-api-trans').attr('id', 'trans-img-cont');
    let svgContainer = createElement('div').addClass('canvas-api-trans').attr('id', 'trans-svg-cont');
    let remove = createElement('div').addClass(manifestOptions.removeButtonClass).attr('id','canvas-remove-butn').text('Delete');
    $(target).append(transform.append(start, imgContainer, svgContainer)).css('overflow', 'hidden');
    manifestOptions.removeButtonPosition ? $('#'+manifestOptions.removeButtonPosition).append(remove) : $(canvas).append(remove);
    saveControlOptions(target,transform,start,imgContainer,svgContainer,remove,list);
}

function saveControlOptions(target,transform,start,imgContainer,svgContainer,remove,list) {
    control.target = target;
    control.list = list;
    control.transform = transform;
    control.svgContainer = svgContainer;
    control.imgContainer = imgContainer;
    control.start = start;
    control.remove = remove;
}

function createElement(type) {
    let xmlns = 'http://www.w3.org/2000/svg';
    let basicElem = ['div','img','div','span','input'];
    let advanceElem = ['svg','path','rect','svg-ori','path-ori','rect-ori'];
    if(basicElem.includes(type)&&advanceElem.includes(type)){
        return $(document.createElement(type));
    }else {
        return $(document.createElementNS(xmlns,type));
    }
}

function bindEvent(canvas, list, canv, info, callback) {

    var cssTransformOrigin = $(control.trans).css('transform-origin').match(/\d+/g);
    var cssTransformOffset = $(control.trans).offset();
    var fn = new func();

    fn.init(info);

    fn.hover(control.svgCont);

    fn.canvas.bind({
        'mousedown': function(e) {
            var ele = fn.getsrc(e);
            var trans_position = fn.trans.offset();
            var click_position = fn.get_click_position(e);
            var click_position_on_img = fn.get_click_position_on_img(e, ele);
            if (ele.hasClass(manifestOptions.imgBoxClass) || ele.attr('id') === control.start.attr('id')) {
                fn.canvas_input_disabled($(this), ele);
                $(document).bind({
                    'mousemove': function(e) {
                        fn.move_canvas_ele(e, ele, click_position_on_img);
                    },
                    'mouseup': function(e) {
//No.2 发送元素移动信息，发送元素移动后的新位置信息 position{x: , y: }
                        var newPositionInfo = fn.canvas_input_abled(fn.imgContainer, ele);
                        if (ele.attr('id') === control.start.attr('id')) {
                            callback ? callback('pushStartPosition', newPositionInfo) : '';
                        } else {
                            callback ? callback('pushNewPosition', newPositionInfo) : '';
                        }
                        $(document).unbind();
                    }
                });
            } else if (ele.attr('id') === control.canvas.attr('id')) {
                fn.canvas_input_disabled($(this));
                $(document).bind({
                    'mousemove': function(e) {
                        fn.move_canvas(e, click_position, trans_position, cssTransformOrigin, cssTransformOffset);
                    },
                    'mouseup': function(e) {
                        fn.canvas_input_abled(fn.imgContainer);
                        $(document).unbind();
                    }
                });
            }

        },
        'click': function(e) {
            var ele = fn.getsrc(e);
            if (ele.attr('class') === manifestOptions.imgBoxClass) {
                fn.ele_highLight(ele, this);
                removeButnHighLight(true);
                editorButnHighLight(true);
                path_highLight_ended();
            } else if (ele.hasClass(manifestOptions.circle) || ele.parents('.' + manifestOptions.circle)[0]) {
                var svgobj;
                ele = fn.search_ele(ele.parents('.' + manifestOptions.circle));
                svgobj = fn.ready_for_path(ele);
                removeButnHighLight(false);
                editorButnHighLight(false);
                path_highLight_ended();
                $(document).bind({
                    'mousemove': function(e) {
                        fn.path_moving(e, svgobj, ele);
                    }
                });
            } else if (ele.attr('class') === manifestOptions.pathCollect) {
//No.3 发送添加新路径请求，发送新路径的 fromId 和 targetId
                var newPathInfo = fn.staticed_path(ele.parent());
                callback ? callback('pushNewPath', newPathInfo) : '';
                $(document).unbind();
            } else if(ele[0].tagName === 'path') {
                cancle_img_highLight(fn);
                fn.path_highLight(ele.parent());
                removeButnHighLight(true);
                editorButnHighLight(false);
            } else {
                fn.recover_canvas();
                removeButnHighLight(false);
                editorButnHighLight(false);
                path_highLight_ended();
            }
        },
        'mousewheel': function(e, delta) {
            fn.zoom(delta);
        }
    });
}



export {Target}



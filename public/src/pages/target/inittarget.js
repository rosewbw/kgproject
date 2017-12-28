import React from 'react'
import defaultOptions from 'default-options.json'
im

let control = {
    canvas: null ,
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
        updateBasicOptions(targetOptions)
        initTarget();
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

function initTarget(){

}




Target.prototype = {};


export {Target}
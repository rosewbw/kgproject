import React from 'react';
import WebUploader from 'webuploader'
import './upload.css'


class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        // WebUploader实例
        this.uploader = null;
        this.updateTotalProgress = this.updateTotalProgress.bind(this);
        this.bindDom = this.bindDom.bind(this);
        this.setState = this.setState.bind(this);
        this.addFile = this.addFile.bind(this);

        // 总体进度条
        this.$progress = null;

        // 图片容器
        this.$queue = $('<ul class="filelist"></ul>')
            .appendTo( $('.queueList') );


        this.$list= null;

        // 状态栏，包括进度和控制按钮
        this.$statusBar = null;

        // 文件总体选择信息。
        this.$info = null;

        // 上传按钮
        this.$upload = null;

        // 没选择文件之前的内容。
        this.$placeHolder = null;

        // 所有文件的进度信息，key为file id
        this.percentages = {};

        // 添加的文件数量
        this.fileCount = 0;

        // 添加的文件总大小
        this.fileSize = 0;

        // 优化retina, 在retina下这个值是2
        this.ratio = window.devicePixelRatio || 1;


        // 缩略图大小
        this.thumbnailWidth = 110 * this.ratio;
        this.thumbnailHeight = 110 * this.ratio;

        // 可能有pedding, ready, uploading, confirm, done.
        this.state = 'pedding';
    }

    updateTotalProgress(){
        let loaded = 0,
            total = 0,
            spans = this.$progress.children(),
            percent;

        $.each( this.percentages, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );

        percent = total ? loaded / total : 0;

        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
    }

    bindDom(){
        this.$list = $('#uploadInfo');
        this.$progress = $('.progress').hide();
        this.$info = $('.info');
        this.$placeHolder= $('.placeholder');
        this.$upload= $('.uploadBtn');
        this.$statusBar = $('.statusBar');
    }

    updateStatus() {
        let text = '', stats;

        if ( state === 'ready' ) {
            text = '选中' + this.fileCount + '张图片，共' +
                WebUploader.formatSize( this.fileSize ) + '。';
        } else if ( state === 'confirm' ) {
            stats = this.uploader.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                    stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
            }

        } else {
            stats = this.uploader.getStats();
            text = '共' + this.fileCount + '张（' +
                WebUploader.formatSize( this.fileSize )  +
                '），已上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }

        this.$info.html( text );
    }

    setState( val ) {
        let file, stats;

        if ( val === this.state ) {
            return;
        }

        this.$upload.removeClass( 'state-' + this.state );
        this.$upload.addClass( 'state-' + val );
        this.state = val;

        switch ( this.state ) {
            case 'pedding':
                this.$placeHolder.removeClass( 'element-invisible' );
                this.$queue.parent().removeClass('filled');
                this.$queue.hide();
                this.$statusBar.addClass( 'element-invisible' );
                this.uploader.refresh();
                break;

            case 'ready':
                this.$placeHolder.addClass( 'element-invisible' );
                $( '#filePicker2' ).removeClass( 'element-invisible');
                this.$queue.parent().addClass('filled');
                this.$queue.show();
                this.$statusBar.removeClass('element-invisible');
                this.uploader.refresh();
                break;

            case 'uploading':
                $( '#filePicker2' ).addClass( 'element-invisible' );
                this.$progress.show();
                this.$upload.text( '暂停上传' );
                break;

            case 'paused':
                this.$progress.show();
                this.$upload.text( '继续上传' );
                break;

            case 'confirm':
                this.$progress.hide();
                this.$upload.text( '开始上传' ).addClass( 'disabled' );

                stats = this.uploader.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    this.setState( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = this.uploader.getStats();
                if ( stats.successNum ) {
                    alert( '上传成功' );
                } else {
                    // 没有成功的图片，重设
                    this.state = 'done';
                    location.reload();
                }
                break;
        }

        this.updateStatus();
    }

    addFile(){

    }


    componentDidMount() {
        let _this = this;

        _this.state = 'pedding';
        // 总体进度条

        _this.uploader = WebUploader.create({
            // // swf文件路径
            // swf: BASE_URL + '/js/Uploader.swf',

            //指定Drag And Drop拖拽的容器
            dnd:'#dragarea',

            // 文件接收服务端。
            server: '/upload',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id:'#picker',
                innerHTML:'请选择文件'
            },

            //指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
            //@title {String} 文字描述
            //@extensions {String} 允许的文件后缀，不带点，多个用逗号分割。
            //@mimeTypes {String} 多个用逗号分割。
            //accept:

            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false
        });

        _this.uploader.addButton({
            id: '#picker2',
            label: '继续添加'
        });

        _this.uploader.on('fileQueued', function (file) {
            _this.fileCount++;
            _this.fileSize += file.size;
            console.log(_this.fileCount)
            if(_this.fileCount === 1){
                console.log(_this.fileCount)
                _this.$placeHolder.addClass( 'element-invisible' );
                _this.$statusBar.show();
            }
        });

        _this.uploader.on('uploadProgress', function (file, percentage) {
            let $li = $('#' + file.id),
                $percent = $li.find('.progress .progress-bar');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>' +
                    '</div>').appendTo($li).find('.progress-bar');
            }

            $li.find('p.state').text('上传中');
        console.log('上传中');

        $percent.css('width', percentage * 100 + '%');
    });
        _this.uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).find('p.state').text('已上传');
        console.log('已上传');
    });

        _this.uploader.on('uploadError', function (file) {
            $('#' + file.id).find('p.state').text('上传出错');
            console.log('上传出错');
        });

        _this.uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').fadeOut();
            console.log('完成');
        });

        _this.bindDom();
        _this.updateTotalProgress();
    }

    render() {
        const options = {
            baseUrl: 'localhost:3000',
            param: {
                fid: 0
            }
        }
        return (
            <div id="uploader" className="uploader">
                <div id="queuelist" className="queueList">
                    <div id="dragarea" className="dragArea">
                        <div className="btns">
                            <div id="picker">选择文件</div>
                            <p>或将文件拖到这里</p>
                        </div>
                    </div>
                </div>
                <div className="statusBar" style={{display:'none'}}>
                    <div className="progress">
                        <span className="text">0%</span>
                        <span className="percentage"></span>
                    </div>
                    <div className="info"></div>
                    <div className="btns">
                        <div id="picker2">继续添加</div>
                        <div className="uploadBtn">开始上传</div>
                    </div>
                </div>
            </div>
        )
    }
}

Upload.propTypes = {};
Upload.defaultProps = {};


export {Upload}

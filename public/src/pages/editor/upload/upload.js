import React from 'react';
import WebUploader from 'webuploader'
import './upload.css'


class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {

    }

    componentDidMount() {
        let $list, $li, $percent;
        $list = $('#uploadInfo');
        let state = 'pedding';


        let uploader = WebUploader.create({
            // // swf文件路径
            // swf: BASE_URL + '/js/Uploader.swf',

            //指定Drag And Drop拖拽的容器
            dnd:'#dragarea',

            // 文件接收服务端。
            server: '/upload',
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker',

            //指定接受哪些类型的文件。 由于目前还有ext转mimeType表，所以这里需要分开指定。
            //@title {String} 文字描述
            //@extensions {String} 允许的文件后缀，不带点，多个用逗号分割。
            //@mimeTypes {String} 多个用逗号分割。
            //accept:

            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false
        });
        uploader.on('fileQueued', function (file) {
            $list.append('<div id="' + file.id + '" className="item">' +
                '<h4 className="info">' + file.name + '</h4>' +
                '<p className="state">等待上传...</p>' +
                '</div>');
            console.log('等待上传');
        });
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
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
        uploader.on('uploadSuccess', function (file) {
            $('#' + file.id).find('p.state').text('已上传');
            console.log('已上传');
        });

        uploader.on('uploadError', function (file) {
            $('#' + file.id).find('p.state').text('上传出错');
            console.log('上传出错');
        });

        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').fadeOut();
            console.log('完成');
        });

        $('#ctlBtn').on('click',function () {
            uploader.upload();
        })
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
                            <button id="ctlBtn" className="btn btn-default">开始上传</button>
                        </div>
                    </div>
                </div>

                <div id="uploadInfo"></div>
            </div>
        )
    }
}

Upload.propTypes = {};
Upload.defaultProps = {};


export {Upload}

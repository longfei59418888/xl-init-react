import { connect as connects } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router';
import { getCookie } from 'src/utils/cookie';
import { bindActionCreators } from 'redux';

/*
* 设置默认属性
* defaultProps  Object  传入默认属性
* */
export function defaultProps(props) {
    return function (target) {
        target.defaultProps = props;
    };
}

/*
* 组件的延时加载
* promise   Promise Promise对象
* Loading   Component 加载组件
* 传入promise对象，当promise中执行resole时候组件加载完成
* 也可以异步的加载组件或者模块
* */
export function loading(promise, Loading = '') {
    return function (Target) {
        return class Com extends React.Component {
            state={
                loadStatus: false,
                load: [],
            }
            componentWillMount() {
                this.setState({
                    loadStatus: true,
                });
                if (promise) {
                    promise(this.props, this.state).then((modules) => {
                        const asyncComponent = [];
                        if (modules) {
                            modules.forEach((item) => {
                                asyncComponent.push(item.default);
                            });
                        }
                        this.setState({
                            loadStatus: false,
                            load: asyncComponent,
                        });
                    });
                }
            }
            render() {
                const { loadStatus, load } = this.state;
                if (loadStatus) {
                    return !Loading ? '' : <Loading />;
                }
                return <Target {...this.props} load={load} />;
            }
        };
    };
}


/*
* 是否登陆
* 检查是否登陆，通过传入的数据
* */
export function login() {
    return function (target) {
        const renderBak = target.prototype.render;
        target.prototype.render = function () {
            const token = getCookie('token');
            if (!token) {
                return (<Redirect to="/login" />);
            }
            return renderBak.apply(this);
        };
    };
}

/*
* redux的connect方法和组件连接
* reduces   Array   state对象上的属性名称数组，用于绑定state数据到组件上
* actions   Object  redux的actions
* */
export function connect(reduces, actions) {
    return function (target) {
        return connects((state) => {
            let stateProps;
            reduces.forEach((item) => {
                stateProps = {
                    [item]: state[item],
                };
            });
            return stateProps;
        }, dispatch => bindActionCreators(actions, dispatch))(target);
    };
}

/*
* 将class上面的方法this指向对象本身
* */
export function autobind(targer, name, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
        return oldValue.apply(this, arguments);
    };
    return descriptor;
}


/*
* 设置title
* title String  标题名称
* */
export function setTitle(title) {
    return (target) => {
        const componentWillMountBak = target.prototype.componentWillMount;
        target.prototype.componentWillMount = function () {
            _setTitle(title);
            if (componentWillMountBak) componentWillMountBak.apply(this);
        };
    };
}

// 设置文档的标题 html标题
function _setTitle(title) {
    document.title = title;
    const iframe = document.createElement('iframe');
    iframe.src = '../favicon.ico';
    iframe.style.display = 'none';
    // 重新加载一个iframe就会重新刷新 document.title
    iframe.onload = function () {
        setTimeout(() => {
            iframe.remove();
        }, 0);
    };
    document.body.appendChild(iframe);
}


/*
* 绑定方法/属性到原型上面
* objects Object 合并到prototype的对象
* */

export function mixin(objects) {
    return (target) => {
        Object.assign(target.prototype, objects);
    };
}

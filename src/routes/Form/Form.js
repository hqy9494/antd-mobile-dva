import { Component } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { connect } from 'dva';
import { PullToRefresh, ListView, Button,List, InputItem, WhiteSpace,ImagePicker, WingBlank, SegmentedControl, Switch, Calendar} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios';
import { get } from 'https';
import { createForm,getFieldProps,getFieldsValue } from 'rc-form';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import moment from 'moment';
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
const extra = {
    '2017/07/15': { info: 'Disable', disable: true },
  };
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
  }, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
  }];
  const now = new Date();
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
  extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };
  
  Object.keys(extra).forEach((key) => {
    const info = extra[key];
    const date = new Date(key);
    if (!Number.isNaN(+date) && !extra[+date]) {
      extra[+date] = info;
    }
  });




class Form extends Component{
originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);
    // console.log("inidata",dataSource)
    this.state = {
        type: 'money',
        files: data,
        multiple: false,
        en: false,
      show: false,
      config: {},
      money1: 0,
      money2: 0,
      control: 8888888888888888,
      startTime: '',
      endTime: '',
      field:[],
      }
  }
  
  componentDidMount() {
    const that = this
    axios({
      method: 'get',
      url: 'http://localhost:3000/adv/findForm',
    })
    .then(function (response) {
      let dt = response.data;
      console.log('response',dt)
      // alert("更新完成");
      that.setState({
        money1: dt.money1,
        money2: dt.money2,
        control: dt.control,
        files: dt.files,
        startTime: dt.startTime,
        endTime: dt.endTime,
      })
    })
    .catch(function (error) {
      console.log('error',error);
    });

  }

  componentDidUpdate() {

  }



    componentWillMount(){
    }
  
    handleClick = () => {
        this.inputRef.focus();
    }

   
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
      onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
          multiple: index === 1,
        });
      }

      handleSumit = () => {
        const that = this;
        this.props.form.validateFields({ force: true }, (error) => {
            if (!error) {
              let dt = {...this.props.form.getFieldsValue(),startTime:this.state.startTime,endTime:this.state.endTime,files:this.state.files};
              console.log(dt)
              axios({
                method: 'post',
                url: 'http://localhost:3000/adv/updateForm',
              })
              .then(function (response) {
                let dt = response.data;
                alert("更新完成");
                console.log(dt)
              })
              .catch(function (error) {
                console.log('error',error);
              });

            } else {
              console.log(error);
              alert('Validation failed');
            }
        });
      }

  

      renderBtn(zh, en, config = {}) {
        config.locale = this.state.en ? enUS : zhCN;
    
        return (
          <List.Item arrow="horizontal"
            onClick={() => {
              document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
              this.setState({
                show: true,
                config,
              });
            }}
          >
            {this.state.en ? en : zh}
          </List.Item>
        );
      }
    
      changeLanguage = () => {
        this.setState({
          en: !this.state.en,
        });
      }
    
      onSelectHasDisableDate = (dates) => {
        console.warn('onSelectHasDisableDate', dates);
      }
    
      onConfirm = (startTime, endTime) => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
          show: false,
          startTime:moment(startTime).format('YYYY-MM-DD hh:mm:ss'),
          endTime:moment(endTime).format('YYYY-MM-DD hh:mm:ss'),
        });
      }
    
      onCancel = () => {
        document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
        this.setState({
          show: false,
          startTime: undefined,
          endTime: undefined,
        });
      }
    
      getDateExtra = date => extra[+date];





    render() {
        const { getFieldProps } = this.props.form;
        const { type } = this.state;
        const { files } = this.state;
        return (
          <div>
              
                <List>
                    <WingBlank>
                        <InputItem
                            {...getFieldProps('money1',{
                              initialValue: this.state.money1
                            })}
                            type={type}
                            defaultValue={100}
                            placeholder="start from left"
                            clear
                            moneyKeyboardAlign="left"
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        >光标在左</InputItem>
                        <InputItem 
                            // error
                            type={type}
                            placeholder="start from right"
                            clear
                            onChange={(v) => { console.log('onChange', v); }}
                            onBlur={(v) => { console.log('onBlur', v); }}
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        >光标在右</InputItem>
                        <InputItem
                            {...getFieldProps('money2', {
                            normalize: (v, prev) => {
                                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                                if (v === '.') {
                                    return '0.';
                                }
                                return prev;
                                }
                                return v;
                            },
                            initialValue: this.state.money2
                            })}
                            type={type}
                            placeholder="money format"
                            ref={el => this.inputRef = el}
                            onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                            clear
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        >数字键盘</InputItem>
                        <List.Item>
                            <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}
                            onClick={() => this.inputRef.focus()}
                            >
                            click to focus
                            </div>
                        </List.Item>
                    </WingBlank>
                    
                </List>
            
                <List renderHeader={() => 'Whether is controlled'}>
                    <InputItem
                    clear
                        {...getFieldProps('control',{
                            initialValue: this.state.control,
                          })}
                        placeholder="controled input"
                    >受控组件</InputItem>
                    <InputItem
                        defaultValue="Title"
                        placeholder="please input content"
                        data-seed="logId"
                    >非受控组件</InputItem>
                </List>
                
                <SegmentedControl
                    values={['切换到单选', '切换到多选']}
                    selectedIndex={this.state.multiple ? 1 : 0}
                    onChange={this.onSegChange}
                />
                {get}
                <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 7}
                    multiple={this.state.multiple}
                />

<List className="calendar-list" style={{ backgroundColor: 'white' }}>
          <List.Item className="item" extra={<Switch className="right" checked={!this.state.en} onChange={this.changeLanguage} />}>
            {this.state.en ? 'Chinese' : '中文'}
          </List.Item>
          {/* {this.renderBtn('选择日期区间', 'Select Date Range')} */}
          {this.renderBtn('选择日期时间区间', 'Select DateTime Range', { pickTime: true })}
          {/* {this.renderBtn('选择日期', 'Select Date', { type: 'one' })}
          {this.renderBtn('选择日期时间', 'Select DateTime', { type: 'one', pickTime: true })}
          {this.renderBtn('选择日期区间(快捷)', 'Select Date Range (Shortcut)', { showShortcut: true })}
          {this.renderBtn('选择日期时间区间(快捷)', 'Select DateTime Range (Shortcut)', { pickTime: true, showShortcut: true })}
          {this.renderBtn('大行距', 'XL row size', { rowSize: 'xl' })}
          {this.renderBtn('不无限滚动', 'infinite: false', { infinite: false })}
          {this.renderBtn('水平进入', 'Horizontal enter', { enterDirection: 'horizontal' })}
          {this.renderBtn('默认选择范围', 'Selected Date Range', { defaultValue: [new Date(+now - 86400000), new Date(+now - 345600000)] })} */}
          {this.renderBtn('onSelect API', 'onSelect API', {
            onSelect: (date, state) => {
              console.log('onSelect', date, state);
              return [date, new Date(+now - 604800000)];
            },
          })}
          {
            this.state.startTime &&
            <List.Item>Time1: {this.state.startTime.toLocaleString()}</List.Item>
          }
          {
            this.state.endTime &&
            <List.Item>Time2: {this.state.endTime.toLocaleString()}</List.Item>
          }
        </List>
        <Calendar
          {...this.state.config}
          visible={this.state.show}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSelectHasDisableDate={this.onSelectHasDisableDate}
          getDateExtra={this.getDateExtra}
          defaultDate={now}
          minDate={new Date(+now - 5184000000)}
          maxDate={new Date(+now + 31536000000)}
        />

                <Button onClick={this.handleSumit}>提交</Button>
          </div>
        );
      }
    }
  
    const H5NumberInputWrapper = createForm()(Form);
        // export default Products;
        // export default connect(({ Form }) => ({
        // Form,
        // }))(Form);
    export default connect()(H5NumberInputWrapper);
import { Component } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { connect } from 'dva';
import { PullToRefresh, ListView, Button} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios';
import { get } from 'https';
// const data = [
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//     title: 'Meet hotel',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//     title: 'McDonald\'s invites you',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
//   {
//     img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//     title: 'Eat the week',
//     des: '不是所有的兼职汪都需要风吹日晒',
//   },
// ];
const NUM_ROWS = 12;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}




class Reflash extends Component{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    // console.log("inidata",dataSource)
    this.state = {
      data: [],
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
    };
  }
  
  componentDidMount() {
    // console.log(ReactDOM)
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(genData()),
        height: hei,
        refreshing: false,
        isLoading: false,
      });
    }, 1500);
  }

  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }



    componentWillMount(){
      this.getOne();
    }
  
    onRefresh = () => {
      let that = this;
      this.setState({ refreshing: true, isLoading: true });
      // simulate initial Ajax
      setTimeout(() => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/adv/find',
        })
        .then(response => {
          let dt = response.data;
          // console.log('data',dt)
          that.setState({data:dt},()=>{
            console.log('data',that.state.data)
            this.rData = genData();
            that.setState({
              dataSource: that.state.dataSource.cloneWithRows(that.rData),
              isLoading: false,
              refreshing: false,
            });
          })
        })
        .catch(function (error) {
          console.log('error',error);
        });
      }, 1000);

     




    };

    onEndReached = (event) => {
      // load new data
      // hasMore: from backend data, indicates whether it is the last page, here is false
      if (this.state.isLoading && !this.state.hasMore) {
        return;
      }
      console.log('reach end', event);
      this.setState({ isLoading: true });
      let that = this;
      setTimeout(() => {
        axios({
          method: 'get',
          url: 'http://localhost:3000/adv/find',
        })
        .then(function (response) {
          let dt = response.data;
          // console.log('data',dt)
          that.setState({data:[...that.state.data,...dt]},()=>{
            console.log('data',that.state.data)
            that.rData = [...that.rData, ...genData(++pageIndex)];
            that.setState({
              dataSource: that.state.dataSource.cloneWithRows(that.rData),
              isLoading: false,
            });
          })
        })
        .catch(function (error) {
          console.log('error',error);
        });
      }, 1000);
    };
  
    getOne  =() => {
      let that = this;
      axios({
        method: 'get',
        url: 'http://localhost:3000/adv/find',
      })
      .then(function (response) {
        let dt = response.data;
        // console.log('data',dt)
        that.setState({data:dt},()=>{
          console.log('data',that.state.data)
        })
      })
      .catch(function (error) {
        console.log('error',error);
      });
    }

  
    render(){
      const separator = (sectionID, rowID) => (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      );
      let data = this.state.data
      let index = 0;
      const row = (rowData, sectionID, rowID) => {
        const obj = data[index++];   //循环自减
        // console.log('obj',obj)
        return (
          <div key={rowID}
            style={{
              padding: '0 15px',
              backgroundColor: 'white',
            }}
          >
            <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
              {obj&&obj.title}
            </div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
              <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj&&obj.img} alt="" />
              <div style={{ display: 'inline-block' }}>
                <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj&&obj.des}-{rowData}</div>
                <div style={{ fontSize: '16px' }}><span style={{fontSize: '30px', color: '#FF6E27'}} onClick={()=>this.props.history.push("/Products")}>{rowID}</span> 元/任务</div>
              </div>
            </div>
          </div>
        );
    }
    return (<div>
      <Button
      // type="warning"
        style={{ margin: '30px 15px',border:"1px solid red"}}
        inline
        onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
      >
        {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
      </Button>
      <ListView
        key={this.state.useBodyScroll ? '0' : '1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>Pull to refresh</span>}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        useBodyScroll={this.state.useBodyScroll}
        style={this.state.useBodyScroll ? {} : {
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={3}
        distanceToRefresh = {window.devicePixelRatio * 25}
      />
    </div>);
    }
  }
  

// export default Products;
export default connect(({ Reflash }) => ({
  Reflash,
}))(Reflash);
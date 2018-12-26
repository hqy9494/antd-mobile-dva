import { Component } from 'react';
import ReactDOM from 'react-dom';
import React from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace, Badge, PullToRefresh, ListView, Button, Picker, List, SegmentedControl, WingBlank, } from 'antd-mobile';
import { createForm } from 'rc-form';
import arrayTreeFilter from 'array-tree-filter';

import 'antd-mobile/dist/antd-mobile.css';
import styles from './Tab.scss';
const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}


class Tab extends Component{
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight,
      useBodyScroll: false,
      current: "Segment1",
    };
  }
  
  componentDidUpdate() {
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  componentDidMount() {
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

  onRefresh = () => {
    this.setState({ refreshing: true, isLoading: true });
    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        isLoading: false,
      });
    }, 600);
  };

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData, ...genData(++pageIndex)];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };

  onChange = (e) => {
    console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
  }
  onValueChange = (value) => {
    console.log(value);
    // this.setState({
    //   current: value
    // })
  }
  
  
    render(){
      const tabs = [
        { title: <Badge text={'3'}>First Tab</Badge> },
        { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
        { title: <Badge dot>Third Tab</Badge> },
        { title: <Badge dot>Fourth Tab</Badge> },
      ];
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
      let index = data.length - 1;
      const row = (rowData, sectionID, rowID) => {
        console.log(rowData,sectionID,rowID,"dsi")
        // console.log("dataSource",this.state.dataSource)
        if (index < 0) {
          index = data.length - 1;
        }
        const obj = data[index--];
        return (
          <div key={rowID}
            style={{
              padding: '0 15px',
              backgroundColor: 'white',
            }}
          >
            <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
              {obj.title}
            </div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
              <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
              <div style={{ display: 'inline-block' }}>
                <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
                <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
              </div>
            </div>
          </div>
        );
      }



      return (
        <div style={{width: "100%",height: "auto"}}>
          <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
              <div style={{width: "100%"}}>
                <Button
                  style={{ margin: '30px 15px' }}
                  className = {styles.one}
                  inline
                  onClick={() => this.setState({ useBodyScroll: !this.state.useBodyScroll })}
                >
                  {this.state.useBodyScroll ? 'useBodyScroll' : 'partial scroll'}
                </Button>
                <div className={styles.banner}>233333</div>
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
                  pageSize={1}
                  distanceToRefresh = {window.devicePixelRatio * 25}
                />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'auto', backgroundColor: '#fff' }}>
              {/* <div className={styles.block}> */}
                <WingBlank size="lg" className="sc-example">
                  <SegmentedControl
                    values={['Segment1', 'Segment2', 'Segment3']}
                    onChange={this.onChange}
                    onValueChange={this.onValueChange}
                    style={{ width: '250px' }}
                  />
                </WingBlank>
              {/* </div> */}
              
              <div className={styles.block} style={{display: this.state.current=="Segment1"?"block":"none"}}>1</div>
              <div className={styles.block} style={{display: this.state.current=="Segment2"?"block":"none"}}>2</div>
              <div className={styles.block} style={{display: this.state.current=="Segment3"?"block":"none"}}>3</div>            
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              Content of third tab
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
              Content of fourth tab
            </div>
          </Tabs>
         
      </div>
      );
    }
  }
  

// export default Products;
export default connect(({ Tab }) => ({
  Tab,
}))(Tab);
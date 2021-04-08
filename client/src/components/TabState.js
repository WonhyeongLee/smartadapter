import React , {useEffect , useContext , useState} from 'react';
import socketio from 'socket.io-client';
import './TabState.css';
import CurrentTabState from './TabStateProvider';

const socket = socketio.connect('localhost:3002');

function TabState() {
    // const classes = useStyles();
    // onChange 이벤트함수를 만들어 체크가 풀리면 TAB상태를 0으로 ESP32에도 0으로 MQTT 메세지 전송
    const { state , actions} = useContext(CurrentTabState); //useContext 로 MQTT 메세지 상태 전역관리 
    const [onCheckTab1 ,setOnCheckTab1] = useState(true);
    const [onCheckTab2 ,setOnCheckTab2] = useState(true);
    const [onCheckTab3 ,setOnCheckTab3] = useState(true);

    // 버튼의 Change 이벤트 발생 시 실행되는 함수 , TAB상태를 비교해 켜져있으면 꺼지도록 꺼져있으면 켜지도록 
    const SocketMqttTab1Control = () => {
        console.log("SocketMqttTab1Control 함수 호출" + state.tab1);
        state.tab1 == '1' ? actions.setTab1State('0') : actions.setTab1State('1')
        socket.emit('publish', state.tab1 == '1' ? "TAB1_OFF" : "TAB1_ON")
    }
    const SocketMqttTab2Control = () => {
        console.log("SocketMqttTab2Control 함수 호출" + state.tab2);
        state.tab2 == '1' ? actions.setTab2State('0') : actions.setTab2State('1')
        socket.emit('publish', state.tab1 == '1' ? "TAB2_OFF" : "TAB2_ON")
    }
    const SocketMqttTab3Control = () => {
        console.log("SocketMqttTab3Control 함수 호출" + state.tab3);
        state.tab3 == '1' ? actions.setTab3State('0') : actions.setTab3State('1')
        socket.emit('publish', state.tab1 == '1' ? "TAB2_OFF" : "TAB2_ON")
    }


    const SocketStateSet = () => {
        socket.on('connect_failed', () => {
          console.log("소켓서버에 연결할 수 없습니다.");
        })
        
        socket.on('connect', () => {
          console.log('connected !');
          // socket.on('mqtt', msg => {
          //   console.log('mqtt 테스트');d
          //   console.log(msg.topic+ ' ' + msg.payload);
          // })
          socket.on('/pc1/tab1', msg => {
            //console.log(msg.topic+ ' : ' + msg.payload);
            actions.setTab1State(msg.payload)
          })
          socket.on('/pc1/tab2', msg => {
            //console.log(msg.topic+ ' : ' + msg.payload);
            actions.setTab2State(msg.payload)
          })
          socket.on('/pc1/tab3', msg => {
            //console.log(msg.topic+ ' : ' + msg.payload);
            actions.setTab3State(msg.payload)
          })
        });
        };

 //0305 체크박스를 컴포넌트로 따로 빼서 map 으로 바꿀생각해보기

    useEffect(() => {
        SocketStateSet();
        console.log(state);
        // console.log(state.tab1 == '1' ? setOnCheck(true) : setOnCheck(false)); 
        state.tab1 == '1' ? setOnCheckTab1(true) : setOnCheckTab1(false)
        state.tab2 == '1' ? setOnCheckTab2(true) : setOnCheckTab2(false)
        state.tab3 == '1' ? setOnCheckTab3(true) : setOnCheckTab3(false)

    }, [state])

        return(
                // ContextAPI HOOK 으로 안할 시 
                // <TabStateConsumer>
                //     {({state , actions}) => (
                <>
                    
                <div class="container">
                
    	            <div class="grid-tab1 grid-size"> 
                    <span className="tab-style">TAB1</span><br></br>
                    <div class="tab-switch">
                            <input type="checkbox" checked={onCheckTab1}// 두번눌러야 색이 바뀜 해결해야함. 각 Tab의 체크상태를 저장하는 State를 만들어서 해결
                                                    // onChange={()=> state.tab1 == '1' ? actions.setTab1State('0') : actions.setTab1State('1')}
                                                    onChange={SocketMqttTab1Control}
                                                    
                                                    />
                            <label><i class="fas fa-power-off"></i></label>
                        </div> 
                    </div>
    	            <div class="grid-tab2 grid-size"> 
                    <span className="tab-style">TAB2</span><br></br>
                    <div class="tab-switch">
                            <input type="checkbox" checked={onCheckTab2}
                                                    onChange={SocketMqttTab2Control}/>
                            <label><i class="fas fa-power-off"></i></label>
                        </div> 
                    </div>
                   <div className="grid-tab3 grid-size">
                        {/* <div className="tab-box">
                            <span className="tab-style">TAB3</span><br></br>
                            <button className="fas fa-power-off fa-5x tab-button-style"></button> 
                        </div> */}
                        <span className="tab-style">TAB3</span><br></br>
                        <div class="tab-switch">
                            <input type="checkbox" checked={onCheckTab3}
                                                    onChange={SocketMqttTab3Control}/>
                            <label><i class="fas fa-power-off"></i></label>
                        </div> 
                        
    
                   </div>
                   <div className="grid-state-chart">
                        <li>{state.tab1}</li>
                        <li>{state.tab2}</li>
                        <li>{state.tab3}</li>
                   </div>
                </div>
                   </>
                    // )}
                    // </TabStateConsumer>
        )
    }



export default TabState;
import React, { useState  ,createContext} from 'react';

//CONTEXT API 전역 관리 
//value 의 actions 와 useState의 actions 를 다르게 써서 오류가 났었음 기억하자 
const CurrentTabState = createContext({
    state: { tab1: '1' , tab2: '1' ,tab3: '1'},
    actions: {
      setTab1State: () => {},
      setTab2State: () => {},
      setTab3State: () => {}
    }
  });

  const TabStateProvider = ({children}) => {

    const [tab1,setTab1State] = useState('1');
    const [tab2,setTab2State] = useState('1');
    const [tab3,setTab3State] = useState('1');



  const value = {
    state: { tab1,tab2,tab3 },
    actions: {setTab1State,setTab2State,setTab3State}
  };

  return (
    <CurrentTabState.Provider value={value}> {children} </CurrentTabState.Provider>
  );
};

const { Consumer : TabStateConsumer} = CurrentTabState;

export { TabStateProvider , TabStateConsumer};

export default CurrentTabState;
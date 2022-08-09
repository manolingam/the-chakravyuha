import React, { Component, createContext } from 'react';

export const AppContext = createContext();

class AppContextProvider extends Component {
  state = {
    //web3 state
    signerAddress: null,
    signature: null,
    isMember: false,
    isWhitelisted: false,
    whitelistedAccess: [],
    member: null,
    profileImage: null,
    profileValidated: false
  };

  setWeb3Data = (data) => {
    this.setState({
      ...data
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setWeb3Data: this.setWeb3Data
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;

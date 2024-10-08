import React from "react";
import axios from "axios";
import "./App.css";

import Platypus from "./components/Platypus";
let endPoint = process.env.NODE_ENV === "development" ? "127.0.0.1:7331" : window.location.host;
let baseUrl = ["http://", endPoint].join("");
let apiUrl = [baseUrl, "/api"].join("");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: "bottomLeft",
      serversMap: null,
      serversList: [],
      isModalVisible: false,
      currentServer: null,
      connectBack: "",
      serverCreateHost: "0.0.0.0",
      serverCreatePort: Math.floor(Math.random() * 65536),
      serverCreateEncrypted: true,
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.selectServer = this.selectServer.bind(this);
    this.serverCreated = this.serverCreated.bind(this);
    this.setConnectBack = this.setConnectBack.bind(this);
    this.setCopied = this.setCopied.bind(this);
    this.setData = this.setData.bind(this);
    this.setServersMap = this.setServersMap.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setServerCreateHost = this.setServerCreateHost.bind(this);
    this.setServerCreatePort = this.setServerCreatePort.bind(this);
    this.setServerCreateEncrypted = this.setServerCreateEncrypted.bind(this);
  }
  refreshIndex=()=>{
    window.location.reload()
  }

  AuthSuccess=()=>{
    this.setState({isAuth:true})
  }

  AuthFail=()=>{
    this.setState({isAuth:false})
  }

  getCtxName=(userName)=>{
    this.setState({ctxName:userName})
  }

  ToShowRbac=()=>{
    this.setState({showRbac:true})
  }

  unShowRbac=()=>{
    this.setState({showRbac:false})
  }

  logOut=()=>{
    axios
        .get([apiUrl, "/logout"].join(""))
        .then((response)=>{
          this.setState({isAuth:false})
        })
        .catch(
            //
        )
  }


  setServerCreateHost(host) {
    this.setState({ serverCreateHost: host });
  }

  setServerCreatePort(port) {
    this.setState({ serverCreatePort: port });
  }

  setServerCreateEncrypted(encrypted, event) {
    this.setState({ serverCreateEncrypted: encrypted });
  }

  showModal() {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk(hash) {
    this.setState({
      isModalVisible: false,
      connectBack: "",
    })
  };

  handleCancel() {
    this.setState({
      isModalVisible: false,
      connectBack: "",
    })
  };

  serverCreated(newServer) {
    this.setState({
      serversList: [...this.state.serversList, newServer],
    });
    const newServersMap = this.state.serversMap;
    newServersMap[newServer.hash] = newServer;
    this.setState({
      serversMap: newServersMap,
      serverCreatePort: Math.floor(Math.random() * 65536),
    });
  }

  selectServer(hash) {
    this.setState({
      currentServer: this.state.serversMap[hash],
    });
  }

  setConnectBack(value) {
    this.setState({ connectBack: value });
  }

  setCopied() {
    this.setState({ copied: true })
  }

  setData(data) {
    this.setState({
      serversMap: data.msg.servers,
      serversList: Object.values(data.msg.servers),
      currentServer: Object.values(data.msg.servers)[0],
      distributor: data.msg.distributor
    });
  }

  setServersMap(serversMap) {
    this.setState({
      serversMap: serversMap,
    });
  }

  render() {
    return (
        <div>
          <Platypus
              bottom={this.state.bottom}
              connectBack={this.state.connectBack}
              currentServer={this.state.currentServer}
              distributor={this.state.distributor}
              handleCancel={this.handleCancel}
              handleOk={this.handleOk}
              isModalVisible={this.state.isModalVisible}
              selectServer={this.selectServer}
              serverCreated={this.serverCreated}
              serverCreateHost={this.state.serverCreateHost}
              serverCreatePort={this.state.serverCreatePort}
              serverCreateEncrypted={this.state.serverCreateEncrypted}
              serversList={this.state.serversList}
              serversMap={this.state.serversMap}
              setConnectBack={this.setConnectBack}
              setCopied={this.setCopied}
              setData={this.setData}
              setServerCreateHost={this.setServerCreateHost}
              setServerCreatePort={this.setServerCreatePort}
              setServerCreateEncrypted={this.setServerCreateEncrypted}
              setServersMap={this.setServersMap}
              showModal={this.showModal}

              refreshIndex={this.refreshIndex}
              logOut={this.logOut}
              ctxName={this.state.ctxName}
              showRbac={this.state.showRbac}
              ToShowRbac={this.ToShowRbac}
              unShowRbac={this.unShowRbac}
              isAuth={this.state.isAuth}
              getCtxName={this.getCtxName}
              AuthSuccess={this.AuthSuccess}
              AuthFail={this.AuthFail}
          /> 
        </div>
    )
  }
}

export default App;
import React, { Component } from "react";
import {
  setResp,
  clearResp,
  setCostos,
  clearCostos,
  setCupos,
  clearCupos,
  setProveedores,
  clearProveedores,
  setNecesidad,
  clearNecesidad,
} from "./initializers/actions";
import { connect } from "react-redux";

import readXlsxFile from "read-excel-file";

import LoadFileContainer from "./containers/LoadFileContainer";

import CosCupNecContainer from "./containers/CosCupNecContainer";
import ProveedoresContainer from "./containers/ProveedoresContainer";
import ProveedoresRespContainer from "./containers/ProveedoresRespContainer";

class LoadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seeProveedores: false,
      isFile: false,
      proveedoresResp:false
    };
    this.onChange = this.onChange.bind(this);
    this.costosLog = this.costosLog.bind(this);
    this.cuposLog = this.cuposLog.bind(this);
    this.proveedores = this.proveedores.bind(this);
    this.necesidad = this.necesidad.bind(this);
    this.next = this.next.bind(this);
    this.cancel = this.cancel.bind(this);
    this.final = this.final.bind(this);

  }
  costosLog(data) {
    this.props.setCostos(data);
    console.log(data);
  }
  cuposLog(data) {
    this.props.setCupos(data);
    console.log(data);
  }
  proveedores(data) {
    this.props.setProveedores(data);
    console.log("Proveedores");
    console.log(data);
  }
  necesidad(data) {
    this.props.setNecesidad(data);
    console.log(data);
  }

  async calculoMinimoCosto() {
    var a = await new Promise((res, rej) => {
      var costoA = this.props.costos[1][0];
      var costoM = this.props.costos[1][1];
      var costoT = this.props.costos[1][2];
      var proveedoresAux =   this.props.proveedores
      var proveedores = [];

      proveedoresAux.map((prov) => {
        if (prov[3] == "A") {
          prov[2] = prov[2] + costoA;
        }
        if (prov[3] == "M") {
          prov[2] = prov[2] + costoM;
        }
        if (prov[3] == "T") {
          prov[2] = prov[2] + costoT;
        }
        proveedores.push(prov);
      });
      proveedores.shift();
      const compareNumbers = (a, b) => {
        return a[2] - b[2];
      };
      proveedores.sort(compareNumbers);
      res(proveedores);
    });
    console.log(a)
    var resp = await new Promise((res, rej) => {
      var cant = this.props.necesidad[1][0];
      var cupoA = this.props.cupos[1][0];
      var cupoM = this.props.cupos[1][1];
      var cupoT = this.props.cupos[1][2];
      var proveedoresEsc = [];

      while (cant > 0 && a.length > 0) {
        var e = a.shift();
        if (e[3] === "A") {
          if (cupoA > 0) {
            var cuanta = Math.min(e[1], cant);
            e.push(cuanta);
            proveedoresEsc.push(e);
            console.log(cuanta)
            cant -= cuanta;
            cupoA -= cuanta;
          }
        }
        if (e[3] === "M") {
          if (cupoM > 0) {
            var cuanta = Math.min(e[1], cant);
            e.push(cuanta);
            proveedoresEsc.push(e);
            cant -= cuanta;
            cupoM -= cuanta;
            console.log(cuanta)

          }
        }
        if (e[3] === "T") {
          if (cupoT > 0) {
            var cuanta = Math.min(e[1], cant);
            e.push(cuanta);
            proveedoresEsc.push(e);
            cant -= cuanta;
            cupoT -= cuanta;
            console.log(cuanta)
          }
        }
      }
      res(proveedoresEsc);
    });
    console.log(resp)
    this.props.setResp(resp)
  }

  async onChange(e) {
    if (e) {
      try {
        let files = e.target.files;
        console.log(files);
        for (var i = 1; i < 6; i++) {
          const a = await readXlsxFile(files[0], { sheet: i })
            .then((data) => {
              switch (i) {
                case 1:
                  this.costosLog(data);
                  break;
                case 2:
                  this.cuposLog(data);
                  break;
                case 3:
                  this.proveedores(data);
                  break;
                case 4:
                  this.necesidad(data);
                  break;
                default:
                  console.log("DEFAULT");
              }
            })
            .catch(
              // Warning el archivo no cumple los estandares
              (e) => {
                console.log(e);
                i = 6;
              }
            );
        }
        this.state.isFile = true;
        console.log(this.state.isFile);
      } catch {
        console.log("ERROR EN ASYNC");
      }
    }
  }
  procesoLoad() {
    console.log(this.props.costos);
    if (this.props.necesidad) {
      console.log(this.props.proveedores);
      if (this.state.seeProveedores) {
        console.log(this.props.proveedores);
        return (
          <ProveedoresContainer
            proveedores={this.props.proveedores}
            next={this.final}
            cancel={this.cancel}
          />
        );
      } else if (this.state.proveedoresResp){

        return (
            <ProveedoresRespContainer
              proveedores={this.props.resp}
              cancel={this.cancel}
            />
          );
      }
      
      
      else {
        return (
          <CosCupNecContainer
            costos={this.props.costos}
            cupos={this.props.cupos}
            necesidad={this.props.necesidad}
            next={this.next}
            cancel={this.cancel}
          ></CosCupNecContainer>
        );
      }
    }
    return <LoadFileContainer onChange={this.onChange} />;
  }

  next() {
    console.log(this.state.seeProveedores);
    this.setState({ seeProveedores: true });
    this.calculoMinimoCosto();
  }
 async  cancel() {
      const a = await new Promise( (res,rej) =>{
        this.props.clearResp();
        this.props.clearCostos();
        this.props.clearCupos();
        this.props.clearNecesidad();
        this.props.clearProveedores();
        this.setState(
            {
                seeProveedores: false,
                isFile: false,
                proveedoresResp:false
            }
        )
      })
   
  }
  final(){
    this.setState({ seeProveedores: false });
    this.setState({proveedoresResp:true})

  }
  render() {
    return this.procesoLoad();
  }
}

//Quiero del almacen
const mapStateToProps = (state) => {
  //user viene de el roo de store
  return {
    resp: state.resp,
    costos: state.costos,
    cupos: state.cupos,
    proveedores: state.proveedores,
    necesidad: state.necesidad,
  };
};
//Despacho al almacen
const mapDispatchToProps = {
  setResp,
  clearResp,
  setCostos,
  clearCostos,
  setCupos,
  clearCupos,
  setProveedores,
  clearProveedores,
  setNecesidad,
  clearNecesidad,
};
// estado de la app a props del componente
// y como se actualiza
export default connect(mapStateToProps, mapDispatchToProps)(LoadFile);

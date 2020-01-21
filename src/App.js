import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import AdminPanel from './components/admin/admin';

import './App.css';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state={
      bigObj:{},
      changedContent:{}
    }
  }


componentDidMount(){
  // let body ={array:[this.state.lang,[]]}

  // document.querySelectorAll('p').forEach(elem=>{
  //   elem.setAttribute("className",`forTranslate${1}`)
  //   body.array[1].push(['lang',`${elem.textContent}`])

  // })
  // console.log(body)
  // fetch('/createText',{
  //   method:"POST",
  //   headers:new Headers({"Content-type":"application/json"}),
  //   body:JSON.stringify(body)
  // }).then(res=>res.json()).then(data=>{console.log(document.querySelectorAll('p')[0].innerHTML=data.lang)
  //  console.log(data)})


  let bigObj = {}

  const elements = document.body.getElementsByTagName("*");
  let count = 0;
  
  for(let i = 0; i < elements.length; i++) {
     let current = elements[i];
      if(current.children.length === 0 && current.textContent.replace(/ |\n/g,'') !== '') {
         // Check the element has no children && that it is not empty
        //  textsArray.push(current.textContent);
         current.setAttribute("id",`forTranslate_${count}`)
         bigObj[current.id] = current.textContent
         count+=1
        //  tagsArray.push(current)
        }
  }
  this.setState({
    bigObj
  })

  fetch('/createText',{
    method:"POST",
    headers:new Headers({"Content-type":"application/json"}),
    body:JSON.stringify(bigObj)
  }).then(res=>res.json()).then(data=>{console.log(data)})
}

handleChangeEnglish=()=>{
  fetch('/getEnglishData').then(res=>res.json()).then(data=>{
    for(let [key,val] of Object.entries(data)){
      document.getElementById(key).innerHTML = val
    }
  })
}

handleChangeRussian=()=>{
  fetch('/getRussianData').then(res=>res.json()).then(data=>{
    for(let [key,val] of Object.entries(data)){
      document.getElementById(key).innerHTML = val
    }
  })
}




  render() {
    // console.log(this)
    // const changeRussian=()=>{
    //   this.setState({
    //     lang:"ru"
    //   })
    // }
    // const changeAmerican=()=>{
    //   this.setState({
    //     lang:"eng"
    //   })
    // }
    return (
      <div>
        {/* <button onClick={()=>{changeRussian()}}>Ruseren</button>
        <button onClick={()=>{changeAmerican()}}>Angleren</button> */}
        <Router>
        <Route path="/main">

        <p>Hayeren</p>
        <ul>
          <li>anyHay</li>
        </ul>
        <Link to="admin"><button className="btn btn-success">Go to admin panel</button></Link>
        <button className="btn btn-success" onClick={()=>{this.handleChangeRussian()}} style={{marginLeft:"20px",marginRight:"20px"}}>translate to russian</button>
        <button className="btn btn-success" onClick={()=>{this.handleChangeEnglish()}}>translate to english</button>

        </Route>
        


          <Route path='/admin'>
            <AdminPanel bigObj={this.state.bigObj}/>
          </Route>
        </Router>

      </div>
    )



  }
}


import React, { Component } from 'react'

export default class AdminPanel extends Component {



    handleSendEnglishData=(contentObj)=>{
        let translateObj = {}
        let count = 0
        for(let [key,val] of Object.entries(contentObj)){
            let inputValue = document.querySelectorAll('input')[count]
            count+=1
            translateObj[key] = inputValue
        }
        fetch('/sendEnglishData',{
            method:"POST",
            headers:new Headers({"Content-type":"application/json"}),
            body:JSON.stringify(translateObj)
          }).then(res=>res.json()).then(data=>{console.log(data)})
     
    }

    handleSendRussianData=(contentObj)=>{
        let translateObj = {}
        let count = 0
        for(let [key,val] of Object.entries(contentObj)){
            let inputValue = document.querySelectorAll('input')[count]
            count+=1
            translateObj[key] = inputValue
        }

        fetch('/sendRussianData',{
            method:"POST",
            headers:new Headers({"Content-type":"application/json"}),
            body:JSON.stringify(translateObj)
          }).then(res=>res.json()).then(data=>{console.log(data)})
    }

    render() {

        const texts = this.props.bigObj
        const adminPanelContent = [];

        for(let [key,val] of Object.entries(texts)){
            adminPanelContent.push(
                <div class="input-group input-group-sm mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">{val}</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
            )
        }

            
        
        



        return (
            <div>
                {adminPanelContent}
                <button className="btn btn-success">Translate to english</button>
                <button className="btn btn-success" style={{marginLeft:"20px"}}>Translate to russian</button>
            </div>
        )
    }
}
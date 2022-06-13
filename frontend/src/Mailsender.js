import React, { useState } from "react";

const Mailsender = () => {
    const [msg,setMsg] = useState('');
    const [user, setUser] = useState({
      to: "",
      subject: "",
      description: ""
    });
   
    const { to, subject, description} = user;
    const onChange = e => {
      setUser({ ...user, [e.target.name]: e.target.value });
    };
   
    const handleSubmit = async e => {
      e.preventDefault();
    
    const response=await fetch(`http://localhost:5000/send`,{
      method:'POST',headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        to:to,subject:subject,description:description
      })
    })
    let json= await response.json()
    console.log(json);
    if (json.status==true) {
      setMsg(json.respMesg)
      setTimeout(() => {
        setMsg("")
      }, 3000);
    }
    if (json.status==false) {
      setMsg(json.respMesg)
      setTimeout(() => {
        setMsg("")
      }, 3000);

    }
     setUser({
      to: "",
      subject: "",
      description: ""
     })
    };
    return (
      <div className="container" >
           <h3 className="text-center mb-2 mt-4">Email Sender</h3>
          
        <div className="row">  
        
         <div style={{"backgroundColor":"white",
        "alignItems":"center"}}className="col-sm-4 mx-auto shadow p-5">
          <h4 className="text-center mb-2">Send E Mail </h4>

          <div className="mb-3 mt-2" >
             <b>{msg}</b>
          </div>
            <div className="form-group mb-3">
              <input
                type="email"
                placeholder="Enter email-id"
                className="form-control form-control-lg"
                name="to"
                onChange={onChange}
                value={to}
                
              />
            </div>
            <div className="form-group  mb-4 ">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="type subject here" required
                name="subject"
                onChange={onChange}
                value={subject}
              />
            </div>
            <div className="form-group  mb-4">
              <textarea
                type="text"
                className="form-control form-control-lg"
                placeholder="Description" required
                name="description"
                onChange={onChange}
                value={description}
              />
            </div>
            <div>

            <button onClick={handleSubmit} className="btn btn-primary btn-block " >Send Mail</button>
            </div>
         
        </div>
      </div>
    </div>  
    );
  };
   

export default Mailsender
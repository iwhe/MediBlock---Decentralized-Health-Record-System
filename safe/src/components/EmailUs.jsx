import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { MdHeight } from 'react-icons/md';

const EmailUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_5pahcaj', 'template_u2032yt', form.current, {
        publicKey: 'NYlg3mkhiNNF0hoiL',
      })
      .then(
        () => {
          window.alert('Message sent Successfully!');
        },
        (error) => {
          console.log('Message FAILED...', error.text);
        },
      );
  };
{/* <style> */}
  {/* .email-form{{
    height: "100px",
    display: "flex" ,
    flex-direction: "column" }}
</style> */}
  return (
    <form ref={form}  style ={{display:"flex",flexDirection:'column'}}
   className="email-form" >
    <h2 style={{textAlign:'center', marginBottom:'14px', paddingTop:'0px'}}> Write to us</h2>
      <label>Name</label>
      <input style ={{ padding: '10px', borderRadius:'10px',color:'#101010'}} type="text" name="user_name" />
      <label>Email</label>
      <input style ={{  padding: '10px', borderRadius:'10px',color:'#101010'}} type="email" name="user_email" />
      <label>Message</label>
      <textarea style ={{  padding: '10px', borderRadius:'10px',color:'#101010', minHeight:'50px'}} name="message" />
      <input style ={{  marginTop: '20px', color: '#1a5adf', textDecoration:'underline'}}type="submit" onSubmit={sendEmail} value="Send" />
    </form>
  );
};
export default EmailUs;
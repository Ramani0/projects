/* SERVER */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/food',{useNewUrlParser: true, useUnifiedTopology: true});

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
},{
    collection:'foodcollection'
});

const User = mongoose.model('User',userSchema);

/* Register */

app.post('/api/users', async (req, res) => {
    try {
       
        const {username,email, password } =req.body;
        const user = new User({username,email,password});
        console.log(user)
        await user.save();
        res.status(201).json({ message: 'user create successfully'});

    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }
});

/* login */

app.post('/api/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        console.log(email,password);
        const user =await User.findOne({email, password});

        if (user) {
            res.status(200).json({message: 'login succussful'});
            console.log("success");
        }else{
            res.status(401).json({ message: 'Login failes. User not found'});
            console.log("nosuccess");
        }
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'})
        console.log("notsuccess");
    }
});





/* product */
const userSchema1 = new mongoose.Schema({
    name: String,
    description: String,
    price: String,
    picture: String,
},{
    collection: 'foodcollection'
});

const User1 = mongoose.model('User1', userSchema1);

// Register a new user
app.post('/api/product', async (req, res) => {
    try {
        const { name, description, price, picture } = req.body;
       
        const user = new User1({ name, description, price, picture });
        await user.save();
        res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error'});
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 
    `);
});


/* SIGN IN */

import React, { useState } from 'react'
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [ email, setemail ] =useState('');
	const [ password, setpassword ] =useState('');
	const navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {
			console.log(email,password);
			const response = await fetch('http://localhost:5000/api/login',{
				method:'POST',
				headers:{
					'Content-Type':'application/json',
				},
				body: JSON.stringify({email, password}),
			});

			
			if (response.ok) {
				console.log('Login successful');
				alert('Login success');
				navigate('/Home');
			}else{
				console.error('Login failed');
				alert('Login failed');
			}
		}catch (error) {
			console.error ('Error:',error);
			alert('Error occured');
		}
	};

  return (
    <>
  
      <div id='a' style={{backgroundColor:'rgb(245, 239, 233)',height:'100%'}}>
      <main class="main">
	<div class="container">
		<section class="wrapper">
			<div class="heading">
				<h1 class="text text-large">Sign In</h1>
				<p class="text text-normal">New user? <span><a href="/Signup" class="text text-links">Create an account</a></span>
				</p>
			</div>
			<form action="" method="post" name="signin" onSubmit={handleSubmit} class="form">
				<div class="input-control">
					<label for="email" class="input-label" hidden>Email Address</label>
					<input type="email" name="email" id="email" value={email} onChange={(e) =>setemail(e.target.value)}class="input-field" placeholder="Email Address" required />
				</div>
				<div class="input-control">
					<label for="password" class="input-label" hidden>Password</label>
					<input type="password" name="password" id="password" value={password} onChange={(e) =>setpassword(e.target.value)} class="input-field" placeholder="Password" />
				</div>
				<div class="input-control">
					<a href="#" class="text text-links">Forgot Password</a>
					<input type="submit" name="submit" class="input-submit"  value="Sign In" />
				</div>
			</form>
			
		</section>
	</div>
</main>
      </div>
      
    </>
  )
}

export default Login



/* SIGN UP */

import React from 'react'
import './Signup.css'
import { useState } from 'react';

const Signup = () => {
  const [username,setname ] =useState('');
  const [ email,setemail ] =useState('');
  const [ password,setpassword ] =useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch ('http://localhost:5000/api/users',{
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
          body:JSON.stringify({username,email,password }),
        
      });
      if (response.ok) {
        console.log('User Created Successfully');
        alert('Users Created Successfully');
        setname('');
        setemail('');
        setpassword('');
      }
      else{console.log('Failed to create usr');
    alert('Failed to create user');
  }
    }catch (error) {
      console.error('Error',error);
      alert('Error occured');
    }
  };

  return (
    <>
    <body style={{backgroundColor:'rgb(248, 244, 239)'}}>
    <div class="container">
    <form action="" method="post" class="sign-form" id="sign-form" onSubmit={handleSubmit} autocomplete="on">
      <h1 class="form-title">Sign Up</h1>
      <p class="form-caption">See your growth and get consulting support!</p>
      <button class="google-sign-btn"><i class="fa fa-google"></i> Sign up with Google</button>

      <br></br>

      <div class="google-guide-container">
        <div class="hr-left"></div>
        <p class="guide-google">or Sign up with Email</p>
        <div class="hr-right"></div>
      </div>

      <label for="username">Name<span class="star-required">*</span></label>
      <input type="text" name="username" id="username" placeholder="Name" value={username} onChange={(e) =>setname(e.target.value)} autofocus required />

      <label for="email">Email<span class="star-required">*</span></label>
      <input type="email" name="email" id="email" placeholder="mail@website.com" value={email}  onChange={(e) =>setemail(e.target.value)} required />

      <label for="password">Password<span class="star-required">*</span></label>
      <input type="password" name="password" id="password" placeholder="Min. 8 character" value={password} onChange={(e) =>setpassword(e.target.value)} required />

      <br></br>

      <input type="checkbox" name="terms-agree" id="terms-agree" required />
      <p class="sentence-agree">I agree to the <a href="">Terms & Conditions</a></p>

      <input type="submit" value="Sign Up" id="submit" />

      <p class="have-account-line">Already have an Account? <a href="/Login">Sign in</a></p>

      <p class="info">&copy;2024 Felix All rights reserved.</p>
    </form>
  </div></body>
    </>
  )
}

export default Signup
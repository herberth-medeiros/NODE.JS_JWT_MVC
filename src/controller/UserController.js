import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

class userController {

  static cadastrarUsuario = async (req, res) => {
      const {name, email, password, confirmpassword} = req.body;
    
        if(!name){
          return res.status(422).json({message: "O nome e obrigatorio!"})
      }
    
      if(!email){
        return res.status(422).json({message: "O email e obrigatorio!"})
      }
    
      if(!password){
        return res.status(422).json({message: "A senha e obrigatorio!"})
      }
    
      if(password !== confirmpassword){
        return res.status(422).json({message: "Senha incorreta"})    
      }
       //check if user exists
  const userExists = await User.findOne({ email: email})

  if (userExists) {
    return res.status(422).json({message: "Por favor, utilize outro e-mail"})
  }

  //create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password,salt);

  //create user
  const user = new User ({
    name,
    email,
    password: passwordHash,
  })

  try{
    await user.save()

    res.status(201).json({message: "Usuario criado com sucesso"});
  }catch(error){
    res.status(500).json({message: "Internal server error"});
  }
 };

 static loginUsuario = async (req, res) => {

  const {email, password} = req.body;

  if(!email){
    return res.status(422).json({message: "O email e obrigatorio!"})
  }

  if(!password){
    return res.status(422).json({message: "A senha e obrigatorio!"})
  }

//check if user exist
  const user = await User.findOne({ email: email})

    if (!user) {
      return res.status(404).json({message: "Usuario nao encontrado"});
  }

//check if password match
  const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return res.status(422).json({message: "Senha invalida"});
  }
  
  try{
    
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
      id: user._id,
      },
      secret,
    );

    res.status(200).json({message: "Autenticacao realizada com sucesso", token});
  }catch(error){
    res.status(500).json({message: "Internal server error"});
  }

 }
};

export default userController;
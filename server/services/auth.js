import User from '../Model/usersModel.js';
import jwt from 'jsonwebtoken';


const generateToken = (user) => {
    return jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


export const registerUser = async (userData) => {
    const { name, email, password,userId } = userData;
    // בדוק אם המשתמש קיים כבר
    const existingUser = await User.findOne({ email });
    console.log("existingUser:")
    console.log(existingUser)
   
       
    
    if (existingUser==null){
// צור את המשתמש החדש
console.log("start create new user")
      const user = new User({ name, email, password,userId });
      console.log(user)
     
    
            await user.save();
            console.log(user)
            const token = generateToken(user);
            console.log(token)
            return { token, user };
        
    }
    else
    throw new Error('Email already exists');
    
};

export const loginUser = async (email, password) => {
    // חפש את המשתמש לפי דוא"ל
    const user = await User.findOne({ email });
    console.log(user )
    if (!user) {
        throw new Error('Invalid credentials');
    }

    // השווה את הסיסמה
    const isMatch = await user.comparePassword(password);
    console.log(isMatch)
    if (isMatch) {
        console.log(isMatch)
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user);
    return { token, user };
};




// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { createUser as createUserService } from './users.js'; // Import existing user creation function

// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable

// export async function registerUser(name, email, password) {
//     // Check if user already exists
//     const existingUser = await User.findOne({ $or: [{ name }, { email }], isDeleted: false });
//     if (existingUser) {
//         if (existingUser.name === name) {
//             throw new Error('Username already exists');
//         }
//         if (existingUser.email === email) {
//             throw new Error('Email already exists');
//         }
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const userId = await getNextUserId();
    
//     // Create user using existing service
//     const user = await createUserService({
//         name,
//         userId,
//         profile: '', // Default value
//         email,
//         password: hashedPassword
//     });

//     // Generate JWT token
//     const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });
//     return { token, user };
// }

// export async function loginUser(email, password) {
//     const user = await User.findOne({ email });
//     if (!user) throw new Error('User not found');
    
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) throw new Error('Invalid credentials');

//     const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });
//     return { token, user };
// }


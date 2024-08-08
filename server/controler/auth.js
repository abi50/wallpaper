import { registerUser, loginUser } from '../services/auth.js';
import { getNextUserId } from '../utils/idGenerator.js';

export const register = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData)
        const nextUserId = await getNextUserId();
        console.log(nextUserId)
        userData.userId = nextUserId;
        console.log(userData)
        const { token, user } = await registerUser(userData);
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

export const login = async (req, res) => {
    console.log("start login")
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const { token, user } = await loginUser(email, password);
        res.json({ token, user });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};






// export async function login(req, res) {
//     try {
//         const { email, password } = req.body;
//         const { token, user } = await loginUser(email, password);
//         res.status(200).json({ token, user });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }

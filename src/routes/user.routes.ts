import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";
import { AuthService } from "./auth.service";
import { authenticateJWT } from "./auth.middleware"; 

export const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);

userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já registrado." });
        }

        const hashedPassword = await AuthService.hashPassword(password);
        const newUser = userRepository.create({ username, email, password: hashedPassword });
        await userRepository.save(newUser);

        res.status(201).json({ message: "Usuário registrado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao registrar usuário." });
    }
});

// Rota pública de login (sem autenticação necessária)
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const isPasswordValid = await AuthService.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const token = AuthService.generateToken({ id: user.id, email: user.email });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer login." });
    }
});

// Rotas protegidas com autenticação JWT
userRouter.get("/", authenticateJWT, async (req, res) => {
    console.log(req.user);
    const users = await userRepository.find();
    res.json(users);
});

userRouter.get("/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

userRouter.delete("/:id", authenticateJWT, async (req, res) => {
    const { id } = req.params;
    const result = await userRepository.delete(id);
    if (result.affected === 0) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
});

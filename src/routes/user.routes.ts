import { Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

export const userRouter = Router();
const userRepository = AppDataSource.getRepository(User);

userRouter.post("/", async (req, res) => {
    const { name, email } = req.body;
    const user = userRepository.create({ name, email });
    await userRepository.save(user);
    res.status(201).json(user);
});

userRouter.get("/", async (req, res) => {
    const users = await userRepository.find();
    res.json(users);
});

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });
    if (!user){
        return res.status(404).json({ message: "User not found" });
    }
        
    res.json(user);
});

userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const result = await userRepository.delete(id);
    if (result.affected === 0){
        return res.status(404).json({ message: "User not found" });
    }
    res.status(204).send();
});

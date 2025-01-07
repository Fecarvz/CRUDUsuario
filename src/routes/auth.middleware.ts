import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { User } from "../entity/user";  

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1]; // Extrai o token do cabeçalho Authorization

    try {
        const decoded = AuthService.verifyToken(token); // Verifica e decodifica o token
        req.user = decoded; // Adiciona os dados do usuário ao objeto `req`
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido ou expirado." });
    }
};

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'random'; // Idealmente, use uma variável de ambiente.

export class AuthService {
  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Gera o hash da senha
  }

  static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword); // Compara a senha fornecida com o hash armazenado
  }

  static generateToken(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' }); // Gera o token JWT
  }

  static verifyToken(token: string): any {
    return jwt.verify(token, SECRET_KEY); // Verifica e decodifica o token JWT
  }
}

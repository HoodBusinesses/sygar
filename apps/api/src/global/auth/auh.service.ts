import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { DatabaseConstants } from "../db/db.constants";
import { DbService } from "../db/db.service";

/**
 * Service responsible for authentication and user validation.
 */
@Injectable()
export class AuthService {
    // Constructor to inject necessary services: JwtService for token management,
    // DatabaseConstants for database configurations, and DbService for database operations.
    constructor(private readonly jwtService: JwtService,
        private readonly dbConstants: DatabaseConstants,
        private readonly dbService: DbService,
    ) {}

    // Method to validate a user by email and password.
    // It hashes the provided password and compares it with the stored hashed password.
    // Returns user details if validation is successful, otherwise returns null.
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.findUserByEmail(email);
        if (!user)
            return null;
        const storedPassword = user.password;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        if (user && hashedPassword === storedPassword) {
            return { uid: user.uid, role: user.role};
        }
        return null;
    }

    // Method to generate a JWT token for a validated user.
    // The token payload includes user ID, role, email, and active status.
    async login(user: any) {
        const payload =  { uid: user.uid, role: user.role, email: user.email, isActive: user.isActive};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Method to find a user by email in the database.
    // Queries the 'Users' table for a matching email and returns the user if found.
    async findUserByEmail(email: string) {
        const result = await this.dbService.getItemsByQuery('Users', 'email', email);
        if (result && result.length) 
            return result[0];
        return null;
    }
}
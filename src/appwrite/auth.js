import conf from '../conf/conf.js';
import { Account, Client, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    // Method to create a session with email and password
    async createEmailPasswordSession(email, password) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;  // Return session details on success
        } catch (error) {
            throw new Error(error.message || 'Error creating session');
        }
    }

    // Method to create a new account
    async createAccount({ email, password, name }) {
        try {
            // Create the account with unique ID, email, password, and name
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // After account creation, create the session automatically
                return this.createEmailPasswordSession(email, password);
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // Method to log in the user by creating a session with email and password
    async login({ email, password }) {
        try {
            return await this.createEmailPasswordSession(email, password);  // Use the method directly
        } catch (error) {
            throw error;
        }
    }

    // Method to fetch the current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        return null;
    }

    // Method to log out the user by deleting their session
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService;

/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/appwrite.ts
import { User } from '@/context/useAppContext.hook';
import { Account, Client, ID, Databases } from 'appwrite';

const Config = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID!,
  companionCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMPANION_COLLECTION_ID!,
};

const client = new Client()
  .setEndpoint(Config.endpoint)
  .setProject(Config.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export const createUser = async ( email: string, password: string, firstName: string, lastName: string ) => {
  try {
    await account.deleteSession('current').catch(() => {});
    const fullName = `${firstName} ${lastName}`;
    await account.create(ID.unique(), email, password, fullName);
    await signIn(email, password);

    const currentAccount = await account.get();

    const data = {
      accountid: currentAccount.$id,
      email,
      firstName,
      lastName,
    };

    return await databases.createDocument(
      Config.databaseId,
      Config.userCollectionId,
      ID.unique(),
      data
    );
  } catch (error: any) {
    console.error('❌ createUser error:', error.message);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (err) {
    console.error("❌ signIn error:", err);
    throw err; 
  }
};

export const logout = async (): Promise<void> => {
  try {
    await account.deleteSession("current");
  } catch (e) {
    throw e;
  }
};

export const getCurrentAccount = async () => {
  try {
    return await account.get();
  } catch (error: any) {
    if (error.code === 401) return null;
    throw error;
  }
};

export const normaliseUserFromAccount = (accountData: any): User => {
  return {
    $id: accountData.$id,
    email: accountData.email,
    name: accountData.name || undefined,
  };
}

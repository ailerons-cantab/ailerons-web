/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/appwrite.ts
import { Account, Client, ID, Databases, Query } from 'appwrite';

const Config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  projectId: '6713a83f000d07c7099d',
  databaseId: '6713ab1800238ca39f74',
  userCollectionId: '6713ab330032e418ce8e',
  storageId: '6713abf5000e4702a73c',
  companionCollectionId: '67dd5050003190d7098f',
};

const client = new Client()
  .setEndpoint(Config.endpoint)
  .setProject(Config.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
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
    await account.getSession('current');
    await account.deleteSession('current');
  } catch (_) {}

  return await account.createEmailPasswordSession(email, password);
};

export const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    const userDocs = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal('accountid', currentAccount.$id)]
    );
    return userDocs.documents[0] ?? null;
  } catch (error: any) {
    if (error.code === 401) return null;
    throw error;
  }
};

export const getUserAndCompanions = async () => {
  try {
    const currentAccount = await account.get();
    const userDocs = await databases.listDocuments(
      Config.databaseId,
      Config.userCollectionId,
      [Query.equal('accountid', currentAccount.$id)]
    );
    const companionsDocs = await databases.listDocuments(
      Config.databaseId,
      Config.companionCollectionId,
      [Query.equal('ownerAccountId', currentAccount.$id)]
    );

    return {
      user: userDocs.documents[0],
      companions: companionsDocs.documents,
    };
  } catch (error: any) {
    throw error;
  }
};

export const createCompanion = async (data: Record<string, any>) => {
  return await databases.createDocument(
    Config.databaseId,
    Config.companionCollectionId,
    ID.unique(),
    data
  );
};


export const updateProfile = async (
  collectionId: string,
  docId: string,
  data: Record<string, any>
) => {
  return await databases.updateDocument(
    Config.databaseId,
    collectionId,
    docId,
    data
  );
};


export { ID };
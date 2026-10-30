import { v7 as uuidv7 } from "uuid";
import * as userRepository from "./userRepository";

export const createUser = async (user: any) => {

     const { id, first_name, last_name, email_addresses } = user

    const name=first_name+" "+last_name;

    const email=email_addresses[0].email_address

    console.log("Creating user:", user.id);

    userRepository.create(uuidv7(),id,name,email)

};

export const updateUser = async (user: any) => {
    const { id, first_name, last_name, email_addresses } = user;

    const name = first_name + " " + last_name;

    const email = email_addresses[0].email_address;

    console.log("Updating user:", id);

    await userRepository.update(id, name, email);
};


export const deleteUser = async (user: any) => {
        console.log("Deleting user:", user.id);
    await userRepository.remove(user.id);
};
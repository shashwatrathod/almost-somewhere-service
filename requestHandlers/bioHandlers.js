/* eslint-disable */
import {StatusCodes} from "http-status-codes";
import ResponseStatus from '../dtos/ResponseStatus.js';
import bioDao from "../daos/bioDao.js";

/**
 * This is the handler to get the bio of the user with the given username.
 * Throws an error if the username does not exist.
 * @param username
 * @returns {Promise<ResponseStatus>}
 */
export const getBioHandler = async username => {

    const bioUser = await bioDao.getUserBio(username);
    if (!bioUser) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }
    return new ResponseStatus(true, 'Get Bio', bioUser, StatusCodes.OK);

};

/**
 * This is the handler to get the bio with sensitive info of the user with the given username.
 * Throws an error if the username does not exist.
 * @param username
 * @param role
 * @returns {Promise<ResponseStatus>}
 */
 export const getSensitiveBioHandler = async (username, givenRole) => {

    let bioUser = await bioDao.getSensitiveUserBio(username);
    bioUser = {...bioUser._doc, role: givenRole}

    if (!bioUser) {
        return new ResponseStatus( false,
                                   'This username does not exist',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Get Bio', bioUser, StatusCodes.OK);

};

/**
 * This is the handler to create the bio of the user with the given username
 * Throws an error if the bio could not be created.
 * @param bio the bio object with the information to be added
 * @returns {Promise<ResponseStatus>} response status with the error message or the success message
 * and the new bio object
 */
export const createBioHandler = async bio => {

    const userBio = await bioDao.createUserBio(bio);

    if (!userBio) {
        return new ResponseStatus( false,
                                   'Bio could not be created',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Bio created', userBio, StatusCodes.OK);
}

/**
 * This is the handler for updating the bio of the user with the given username.
 * Throws an error if the bio could not be updated.
 * @param bio the bio object which has the updated parameters
 * @returns {Promise<ResponseStatus>} response status with the error message or the success message
 * and the new bio object
 */
export const updateBioHandler = async (username, bio) => {

    const userBio = await bioDao.updateUserBio(username, bio);
    const newBio = await bioDao.getUserBio(username);
    if (!userBio) {
        return new ResponseStatus( false,
                                   'Bio could not be updated',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Bio updated', newBio, StatusCodes.OK);
}


/**
 * This is the handler for updating the verified status in bio of user with the given username.
 * Throws an error if the bio could not be updated.
 * 
 * @param bio the bio object which has the updated parameters
 * @returns {Promise<ResponseStatus>} response status with the error message or the success message
 * and the new bio object
 */
 export const updateUserVerifiedHandler = async (username, bio) => {
    const userBio = await bioDao.updateUserVerified(username, bio);
    if (!userBio) {
        return new ResponseStatus( false,
                                   'Bio could not be updated',
                                   {},
                                   StatusCodes.UNAUTHORIZED,);
    }

    return new ResponseStatus(true, 'Bio updated', userBio, StatusCodes.OK);
}

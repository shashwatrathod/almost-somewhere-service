import bioModel from '../models/bioModel.js';

/**
 * Create a user with the userBio object having all params.
 * It calls the create method of mongo to crate a new collection for user.
 * @param userBio the object of the bio to be created.
 */
const createUserBio = async userBio => bioModel.create(userBio);

/**
 * Updtates the bio of the user with the given username.
 * @param userBio the bio object with the new params for the given username.
 */
const updateUserBio = async (givenUsername,userBio) =>
  bioModel.updateOne(
    { username: givenUsername },
    {
      $set: {
        firstname: userBio.firstname,
        lastname: userBio.lastname,
        gender: userBio.gender,
        age: userBio.age,
        favorites: userBio.favorites,
        followers: userBio.followers,
        following: userBio.following,
        profilePhotoURL: userBio.profilePhotoURL,
        bannerPhotoURL: userBio.bannerPhotoURL
      },
    },
  );


/**
 * Updtates the verified status of the user with the given username.
 * @param givenUsername
 * @param verifiedStatus 
 */
 const updateUserVerified = async (givenUsername, verifiedStatus) =>
 bioModel.findOneAndUpdate(
   { username: givenUsername },
   {
     $set: {
       verified: verifiedStatus.verified
     },
   },
   {new: true}
 );


/**
 * Retrieves the bio of the user with the given username. Uses the findOne method to retrieve the
 * unique collection with the username. Filters sensitive info.
 * @param givenUsername the username whose record is to be retrieved.
 */
const getUserBio = async givenUsername => bioModel.findOne({ username: givenUsername  }).select('-favorites');

/**
 * Retrieves the bio of the user with the given username. Uses the findOne method to retrieve the
 * unique collection with the username.
 * @param givenUsername the username whose record is to be retrieved.
 */
 const getSensitiveUserBio = async givenUsername => bioModel.findOne({ username: givenUsername });



/**
 * Adds the first user to second user's following list
 * @param givenUsername the username whose record is to be retrieved.
 */
 const addToFollowing = async (givenUsername, followUsername) => bioModel.findOneAndUpdate(
  { username: givenUsername },
  { $addToSet: { following: followUsername } },
  {new: true}
);;

/**
* Adds the first user to second user's follower list
* @param givenUsername the username whose record is to be retrieved.
*/
const addToFollower = async (givenUsername, followUsername) => bioModel.findOneAndUpdate(
  { username: givenUsername },
  { $addToSet: { followers: followUsername } },
  {new: true}
);;

/**
* Removes the first user to second user's following list
* @param givenUsername the username whose record is to be retrieved.
*/
const removeFromFollowing = async (givenUsername, followUsername) => bioModel.findOneAndUpdate(
  { username: givenUsername },
  { $pull: { following: followUsername } },
  {new: true}
);;

/**
* Removes the first user to second user's follower list
* @param givenUsername the username whose record is to be retrieved.
*/
const removeFromFollower = async (givenUsername, followUsername) => bioModel.findOneAndUpdate(
  { username: givenUsername },
  { $pull: { followers: followUsername } },
  {new: true}
);;

 
const bioDao = {
  createUserBio,
  updateUserBio,
  getUserBio,
  updateUserVerified,
  getSensitiveUserBio,
  addToFollowing,
  addToFollower,
  removeFromFollower,
  removeFromFollowing,
};

export default bioDao;

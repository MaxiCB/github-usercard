/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.

          This can be used for the stretch goals
          followers_url: "https://api.github.com/users/MaxiCB/followers"
*/

const followersArray = [
  'MaxiCB',
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];

axios.get(`https://api.github.com/users/MaxiCB/followers`)
    .then( response => {
        //console.log(response);
        var followers = response.data;
        followers.forEach((user) => {
          followersArray.push(user['login']);
        })
        followersArray.forEach((person) => {
          axios.get(`https://api.github.com/users/${person}`)
            .then( response => {
                var user = response.data;
                console.log(user);
                createCard(user);
            })
            .catch( err => {
                console.log(`Error: ${err}`);
            })
        })
    })
    .catch( err => {
        console.log(`Error: ${err}`);
    })

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} /> avatar_url
  <div class="card-info">
    <h3 class="name">{users name}</h3> name
    <p class="username">{users user name}</p> login
    <p>Location: {users location}</p> location
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a> html_url
    </p>
    <p>Followers: {users followers count}</p> followers
    <p>Following: {users following count}</p> following
    <p>Bio: {users bio}</p> bio
  </div>
</div>

*/

// followersArray.forEach((person) => {
//   axios.get(`https://api.github.com/users/${person}`)
//     .then( response => {
//         var user = response.data;
//         console.log(user);
//         createCard(user);
//     })
//     .catch( err => {
//         console.log(`Error: ${err}`);
//     })
// })

const cards = document.querySelector('.cards');

function createCard(userObject) {
  let newCard = document.createElement('div');
  newCard.classList.add('card');

  let userAvi = document.createElement('img');
  userAvi.src = userObject['avatar_url'];

  let cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  let name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = userObject['name'];

  let username = document.createElement('p');
  username.classList.add('username');
  username.textContent = userObject['login'];

  let profile = document.createElement('p');
  profile.textContent = 'Profile: '
  let profileAddress = document.createElement('a');
  profileAddress.href = userObject['html_url'];
  profileAddress.textContent = `${userObject['html_url']}`;

  let followers = document.createElement('p');
  followers.textContent = `Followers: ${userObject['followers']}`;

  let following = document.createElement('p');
  following.textContent = `Following: ${userObject['following']}`;

  let bio = document.createElement('p');
  bio.textContent = `Bio: ${userObject['bio']}`;

  let location = document.createElement('h3');
  location.textContent = `Location: ${userObject['location']}`;

  newCard.appendChild(userAvi);
  newCard.appendChild(cardInfo);

  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileAddress);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  cards.appendChild(newCard);
  //return newCard;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

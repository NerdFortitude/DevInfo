const wrapper = document.querySelector(".wrapper");
const profilePhoto = document.querySelector('[profile-photo]');
const userName = document.querySelector('[user-name]');
const profileLink = document.querySelector('[profile-link]');
const userJoinDate = document.querySelector('[user-join-date]');
const userBio = document.querySelector('[profile-bio]');
const repoData = document.querySelector('[repo-data]');
const followingData = document.querySelector('[following-data]');
const followerData = document.querySelector('[follower-data]');
const locationData = document.querySelector('[location]');
const websiteData = document.querySelector('[website]');
const twitterData = document.querySelector('[twitter]');
const companyData = document.querySelector('[company]');
const SearchButton = document.querySelector('.btn');
const SearchInput = document.querySelector('[search-input]');
const errorMessage = document.querySelector('.error-message');
const theme = document.querySelector(".theme-icon");
const themeInfo = document.querySelector(".theme-info");

console.log(theme);

let islight = true;
theme.addEventListener("click",()=>{
       
    console.log("hello");
    wrapper.classList.toggle("dark-wrapper");
    SearchButton.classList.toggle("dark-btn");

    if(islight){
        theme.src = "./images/sun-icon.svg";
        themeInfo.innerText = "LIGHT";
        islight = false;
    }
    else{
        theme.src = "./images/moon-icon.svg";
        themeInfo.innerText = "DARK";
        islight = true;
    }


})

async function fetchUserData(user){
    try{  
    const response = await fetch(`https://api.github.com/users/${user}`);
    const data = await response.json();
   if(data?.message == "Not Found"){
     errorMessage.classList.add('error-message-active');
     errorMessage.innerText = "User does not exists";
     setTimeout(()=>{
     errorMessage.classList.remove('error-message-active');
     },3000);
   }
   else{
   renderUserData(data);
   }
    }
    catch(e){
        console.log(e);
    }
}

SearchButton.addEventListener('click',()=>{

    if(SearchInput.value == ""){
        errorMessage.classList.add('error-message-active');
        errorMessage.innerText = "Please enter a username";
        setTimeout(()=>{
            errorMessage.classList.remove('error-message-active');
            },3000);
    }
    else{
        fetchUserData(SearchInput.value);
    }
    
});


function renderUserData(data){

    userName.innerText = data?.name;
    profilePhoto.src = data?.avatar_url;
    profileLink.href = data?.html_url;
    profileLink.action = "_blank";
    profileLink.innerText = `@${data.login}`;
    userJoinDate.innerText = `joined ${data?.created_at.split('T')[0]}`

    if(data?.bio){
        userBio.innerText = data?.bio;
    }
    else{
        userBio.innerText = "This Profile has no Bio";
    }

    repoData.innerText = data?.public_repos;
    followerData.innerText = data?.followers;
    followingData.innerText = data?.following;

    if(data?.location){
        locationData.innerText = data?.location;

    }
    else{
        locationData.innerText = "Not Available";
    }



    if(data?.twitter_username){
        twitterData.href = `https://www.twitter.com/${data?.twitter_username}`;
        twitterData.innerText = data?.twitter_username;
    }
    else{
        twitterData.innerText = "Not Available";
    }

   if(data?.blog){
        websiteData.href = data?.blog;
        websiteData.innerText = "blog";
   }
   else{
    websiteData.innerText = "Not Available";
   }

   if(data?.company){
    companyData.href = data?.company;
    companyData.innerText = company;
   }
   else{
    companyData.innerText = "Not Available";
   }

}






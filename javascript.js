const btn = document.getElementById("searchBtn");
const input = document.getElementById("username");
const result = document.getElementById("result");
btn.addEventListener("click",()=>{
  const username=input.value.trim();
    if (!username) {
    alert("Please enter a username!");
    return;
  }
  fetchProfile(username);
})
async function fetchProfile(username){
   try{
    const response=await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
      throw new Error("User not found!");
    }
    const data = await response.json();
    console.log(data);
result.innerHTML = `
  <div class="card">
    <img src="${data.avatar_url}"/>
    <h2>${data.name || data.login}</h2>
    <p class="username">@${data.login}</p>
    <p>📍 ${data.location || "Location not set"}</p>
    <p>📝 ${data.bio || "No bio available"}</p>

    <div class="stats">
      <div class="stat">
        <span>${data.followers}</span>
        <span>Followers</span>
      </div>
      <div class="stat">
        <span>${data.following}</span>
        <span>Following</span>
      </div>
      <div class="stat">
        <span>${data.public_repos}</span>
        <span>Repos</span>
      </div>
    </div>

    <a href="${data.html_url}" target="_blank">View Profile →</a>
  </div>
`;
;
   }   
   catch(error){
  console.log("Error:",error.message)
      result.innerHTML = `
      <div class="card">
        <p>❌ ${error.message}</p>
      </div>
    `;
   }
}
const { default: axios } = require("axios");

function sum(a,b){
    return a+b;
}
const BACKEND_URL="http://localhost:3000"

describe('Authentication', () => {
 
// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });
// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(-1,- 2)).not.toBe(3);
//   });  
  test('User is able to sign up only once', async () => {
    const username="Ashu" +Math.random();
    const password="123456"
     const response= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password,
        type:"admin"
    })
    expect(response.statusCode).toBe(200)
     const updatedResponse= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        userName,
        password,
        type:"admin"
    })
    expect(updatedResponse.statusCode).toBe(400)
  })

  test('Signup request fails if the username is empty',async () => {
    const username=`Ashu-${Math.random()}`
    const password="123456"
    const response= await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        password,
        type:"admin"
    })
    expect(response.statusCode).toBe(400);
  })
  test('Sign in success is password and username is correct',async () => {
    const username=`Ashu-${Math.random()}`
    const password="123456"
    await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password,
        // type:"admin"
    })
    const response=   await axios.post(`${BACKEND_URL}/api/v1/signin`,{
        username,
        password,
        // type:"admin"
    })
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  })
  test('Signin fails if the username and password are incorrect',async () => {
    const username=`Ashu-${Math.random()}`
    const password="123456"
    await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password,
        // type:"admin"
    })
    const response=   await axios.post(`${BACKEND_URL}/api/v1/signin`,{
        username:'WrongUserName',
        password,
        // type:"admin"
    })
    expect(response.statusCode).toBe(403);
    // expect(response.body.token).toBeDefined();
  })
});

describe("User Metadata endpoints",()=>{
    let token="";
    let avatarId="";
    // beforeAll - 1 time before all 
    // beforeEach- each time before every test in this block
    beforAll(async()=>{
        const username=`Ashu-${Math.random()}`
        const password="123456"
        await axios.post(`${BACKEND_URL}/api/v1/signup`,{
            username,
            password,
            type:"admin"
        })
       const response= await axios.post(`${BACKEND_URL}/api/v1/signin`,{
            username,
            password
        })
        token=response.data.token
        const avatarResponse= await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
	"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
	"name": "Timmy"
        })
        avatarId=avatarResponse.data.avatarId;
    })

    test('User cant update their metadata with wrong avatar ID',async () => {
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
        avatarId:"123123123"},{
            headers:{
                "authorization":`Bearer ${token}`
            }
      })
      expect(response.statusCode).toBe(400)
    })
    test('User Can update their metadata with right avatar id',async () => {
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
            avatarId},{
                headers:{
                    "authorization":`Bearer ${token}`
                }
          })
          expect(response.statusCode).toBe(200)
    })
    test('User cant update its metadata if auth header not present',async () => {
        const response=await axios.post(`${BACKEND_URL}/api/v1/user/metadata`,{
            avatarId})
          expect(response.statusCode).toBe(403)// unauthorised
    })   
})

describe('User avatar Information endpoints', () => {
    let avatarID;
    let token;
    let userId;
    beforeAll(async()=>{

const username=`Ashu-${Math.random()}`
const password="123456"
const singupResponse=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
    username,
    password,
    type:"admin"
})
userId=singupResponse.data.userId

const response= await axios.post(`${BACKEND_URL}/api/v1/signin`,{
    username,
    password
})
token=response.data.token

const avatarResponse= await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`,{
"imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
"name": "Timmy"
})

avatarId=avatarResponse.data.avatarId;

    })

    test('Get back avatar information for a user', async() => {
      const response= axios.get(`${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`)
        expect((await response).data.avatars.length).toBe(1)
        expect((await response).data.avatars[0].userId).toBe(userId)
    })
    test('Available avatars lists the recently created avatar', async() => {
      const response= axios.get(`${BACKEND_URL}/api/v1/avatars`);
      expect(response.data.avatars.length).not.toBe(0);
      const currentAvatar=await response.data.avatars.find(item=>item.id==avatarID)
      expect(currentAvatar).toBeDefined()
    })
    
});

describe('Space Information', () => {
    let mapId;
    let element1Id;
    let element2Id;
    let token;
    let userId;
    
    beforeAll(async()=>{
        

            const username=`Ashu-${Math.random()}`
            const password="123456"
            const singupResponse=await axios.post(`${BACKEND_URL}/api/v1/signup`,{
                username,
                password,
                type:"admin"
            })
            userId=singupResponse.data.userId
            
            const response= await axios.post(`${BACKEND_URL}/api/v1/signin`,{
                username,
                password
            })
            token=response.data.token
    })
    
});




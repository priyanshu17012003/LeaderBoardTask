const {server}=require('./index');
const socket=require('socket.io');
const User=require('./models/UserModel');
const History=require('./models/HistoryModel');
const dotenv=require('dotenv');
dotenv.config();

const getUpdatedRanking=async()=>{

    try{
        const users=await User.find().sort({totalPonints:-1});
    
        for(let i=0;i<users.length;i++){
            users[i].rank=i+1;
            await users[i].save();
        }

        return await User.find().sort({totalPonints:-1});

    }catch(error){
        console.log(error);
        throw new Error('Failed to update rankings');
    }
}

const generatePoints=()=>{
    return Math.floor(Math.random() * 10) + 1;
}

const FRONTEND_URL=process.env.FRONTEND_URL;

const io=socket(server,{
    cors:{
        origin:[FRONTEND_URL]
    }
})

io.on("connection",(socket)=>{

    console.log("Connected to socket.io "+socket.id);

    socket.on('add-user',async(data)=>{
        try{

            console.log(data);
            const {name}=data;
            if(!name || name.trim().length===0)
            {
                return socket.emit('error','Name is required')
            }
    
            const existingUser=await User.findOne({name:name.trim()});
    
            if(existingUser)
            {
                return socket.emit('error','User already exists')
            }
    
            const user=await User.create({
                name:name.trim()
            });
    
            const updatedList=await getUpdatedRanking();

            io.emit('user-added',updatedList);
        }
        catch (error)
        {
            console.log(error);
            socket.emit('error','Internal server error');
        }
    })

    socket.on('get-users',async()=>{
        try{
            const users=await User.find().sort({totalPoints:-1});
            socket.emit('users-fetched',users);
        }
        catch (error)
        {
            console.log(error);
            socket.emit('error','Internal server error');
        }
    })

    socket.on('claim-points',async(data)=>{
        try{
            const {userid}=data;

            if(!userid)
            {
                return socket.emit('error','User id is required')
            }

            const user=await User.findById(userid);

            const prev=user.totalPoints;
            const newPoints=prev+generatePoints();

            user.totalPoints=newPoints;
            await user.save();

            const updatedList=await getUpdatedRanking();

            await History.create({
                userId:userid,
                userName:user.name,
                pointsAwarded:newPoints,
                previousPoints:prev,
                newPoints:newPoints
            })

            io.emit('points-claimed',updatedList);
        }
        catch (error)
        {
            console.log(error);
            socket.emit('error','Internal server error');
        }
    })

    socket.on('get-history',async()=>{
        try{
            const history=await History.find().sort({claimedAt:-1});
            socket.emit('history-fetched',history);
        }
        catch (error)
        {
            console.log(error);
            socket.emit('error','Internal server error');
        }
    })

    socket.on('disconnect',()=>{
        console.log("Disconnected from socket.io "+socket.id);
    })

    socket.on('error',(message)=>{
        console.log(message);
    })
})

const port=process.env.PORT || 5000;

server.listen(port,()=>console.log("Server started on port "+port));
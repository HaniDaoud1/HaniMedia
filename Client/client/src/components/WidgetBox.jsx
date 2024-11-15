import Box from '@mui/material/Box';

const UserImage=({image,size="60px"})=>{
return(
    <>
    <Box width={size} height={size}>
        <img src={`http://localhost:3001/assets/${image}`} alt="Image" 
        className={`rounded-full w-${size} h-${size} `}/>
        </Box></>
)
}
export default UserImage
import {BsSearch} from 'react-icons/bs'

export default function Search() {

    const Search = (event: React.KeyboardEvent<HTMLDivElement>) =>{
        if(event.key == "Enter"){
            
        }
    }

  return (
    <div onKeyUp={Search} className='bg-gray-600 w-[70%] items-center px-2 flex justify-between text-white rounded-md hover:bg-gray-500'>
        <input placeholder='search by termn' className='w-[80%] decoration-0 outline-none bg-transparent p-1' />
        <BsSearch style={{fontSize: "14px"}} />
    </div>
  )
}

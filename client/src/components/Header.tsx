import { Controller, useForm } from 'react-hook-form'
import logo from '../assets/Images/Logo.png'
import { SearchProps } from '../types'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router'

const Header = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            search: ''
        }
    })

    const onSubmit = (data: SearchProps) => {
        console.log(data)
    }
    return (
        <header className='bg-[#d2d2d0] shadow-md p-3'>
            <div className='flex justify-between items-center max-w-6xl mx-auto'>
                <Link to={'/'} className='flex gap-1'>
                    <img
                        src={logo}
                        alt='logo'
                        className='w-15'
                    />
                    <h1 className='font-bold text-sm sm:text-xl flex items-center'>
                        <span className='text-[#1b4866]'>Locate</span>
                        <span className='text-[#cda057]'>Me</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 flex items-center p-3 rounded-lg '>
                    <Controller
                        control={control}
                        name='search'
                        render={({ field }) => (
                            <>
                                <input
                                    type='text'
                                    placeholder='Search...'
                                    {...field}
                                    className='bg-transparent focus:outline-none w-24 sm:w-64 h-full border-none'
                                />

                            </>
                        )}
                    />
                    <button className='cursor-pointer' type='submit'>
                        <FaSearch type='submit' className='text-[#cda057]' />
                    </button>
                </form>
                <ul className='flex gap-8 font-bold'>
                    <li className='hidden sm:inline text-[#1b4866] hover:text-[#cda057]'>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li className='hidden sm:inline text-[#1b4866] hover:text-[#cda057]'>
                        <Link to={'/about'}>About</Link>
                    </li>
                    <li className=' text-[#1b4866] hover:text-[#cda057]'>
                        <Link to={'/sign-in'}>Sign in</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header
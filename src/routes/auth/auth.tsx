import * as React from 'react'
import {useContext} from 'react'
import {createFileRoute} from '@tanstack/react-router'
import {Button, Image, TextInput, Title} from '@mantine/core'
import pic1 from '../../assets/couple.jpg'
import pic2 from '../../assets/couplehands.jpg'
import {AuthContext} from "../../contexts/Authorization"
import {useMutation} from '@tanstack/react-query'
import {handleLogin} from '../../utils/apiCalls'
import {notifications} from '@mantine/notifications'
import {getErr} from '../../utils/methods'
import {MdCheck, MdOutlineError} from 'react-icons/md'

export const Route = createFileRoute('/auth/auth')({
    component: AuthComponent,
})

function AuthComponent() {
    const {saveToken} = useContext(AuthContext)
    const {isPending, mutate} = useMutation({
        mutationKey: ['login'],
        mutationFn: async (body: LoginBodyObj) => await handleLogin(body),
        onSuccess: (data) => {
            saveToken(data.data.token, data.data.username)
            notifications.show({
                title: 'Success',
                icon: <MdCheck/>,
                message: data.data.message,
            })
        },
        onError: (err) => {
            console.log(err)
            notifications.show({
                ...getErr(err),
                icon: <MdOutlineError/>,
                title: 'Error signing in',
            })
        },
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        mutate({
            username: form.get('username')?.toString() ?? '',
            password: form.get('password')?.toString() ?? '',
        })
    }

    return (
        <div className={'w-full h-screen flex'}>
            <div className={'w-max max-w-[90%] h-full max-h-[70vh] m-auto flex '}>
                <div className={'w-1/3 h-full flex'}>
                    <Image
                        className={'w-full h-3/4 rounded-xl rounded-tl-[50px]'}
                        src={pic1}
                        alt={''}
                    />
                    <Image
                        className={
                            'w-1/2 h-[60%] top-[40%] -left-[30%] object-center rounded-xl rounded-tl-3xl rounded-br-[50px]'
                        }
                        src={pic2}
                        alt={''}
                    />
                </div>
                <div className={'flex-1 w-full flex'}>
                    <div className={'m-auto grid gap-5'}>
                        <Title
                            size={52}
                            className={
                                'text-center text-transparent bg-gradient-to-tr from-red-500 to-blue-500 bg-clip-text'
                            }
                        >
                            Penzi Admin Portal
                        </Title>
                        <form
                            onSubmit={handleSubmit}
                            className={
                                'rounded-md m-auto grid gap-2 bg-white p-2 md:pl-5 md:pr-5 w-3/4 min-w-[300px]'
                            }
                        >
                            <Title className={'text-center'} size={24}>
                                Welcome back
                            </Title>
                            <TextInput
                                name={'username'}
                                required
                                variant={'filled'}
                                placeholder={'Username'}
                            />
                            <TextInput
                                name={'password'}
                                required
                                variant={'filled'}
                                type={'password'}
                                placeholder={'Password'}
                            />
                            <Button type={'submit'} loading={isPending}>
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

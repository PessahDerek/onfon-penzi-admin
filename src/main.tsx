import React from 'react'
import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'
// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
import "./index.css"
import {createTheme, MantineProvider, Notification} from "@mantine/core";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Notifications} from "@mantine/notifications";


// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
})

// Register things for typesafety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootQueryClient = new QueryClient()
const theme = createTheme({})

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <MantineProvider theme={theme}>
            <QueryClientProvider client={rootQueryClient}>
                <Notifications position={'top-center'} />
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </MantineProvider>
    )
}

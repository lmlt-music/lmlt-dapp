import {ReactNode} from "react";
import {Metadata} from "next";
import {cookies} from 'next/headers';
import Script from "next/script";
import CssBaseline from "@mui/material/CssBaseline";

import EmotionRootStyleRegistry from '@/theme/EmotionRootStyleRegistry';
import ThemeProvider from "@/theme/ThemeProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import AppLayout from "@/components/home/AppLayout";
import '@/polyfills';
import '@/firebase';
import '@/app/globals.css';
import AuthProvider from "@/auth/AuthProvider";
import {getUser} from "@/auth/getUser";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";


const title = 'Next.js + Firebase + MUI Starter';
const description = 'A starter template for Next.js + Firebase + MUI projects';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
        twitter: {
            title: title,
            description: description,
        },
    };
}

const CLIENT_ID = "a34344b907a4dd3c2811807c82a1b4bd"; // Replace with your actual client ID

const client = createThirdwebClient({ clientId: CLIENT_ID });


export default async function RootLayout({children}: {
    children: ReactNode,
}) {
    const defaultUser = await getUser(cookies());
    console.log('layout default user:', defaultUser?.id);

    return <>
        <html lang="en">
        <head>
            <meta content="width=device-width, initial-scale=1" name="viewport"/>
            <link rel="icon" href="/favicon.ico"/>
            <meta property="og:site_name" content={title}/>

            {/* Clarity Script (for user-event tracking) - paste the script below */}
            <Script id="clarity-script" strategy="lazyOnload">{`
            `}</Script>
        </head>

        <body>
        <EmotionRootStyleRegistry>
        <ThemeProvider>
        <ErrorBoundary>
                            <AuthProvider defaultUser={defaultUser}>
                                <ThirdwebProvider>
                                    <CssBaseline />
                                </ThirdwebProvider>
                                
            <AppLayout>
                {children}
            </AppLayout>
        </AuthProvider>
        </ErrorBoundary>
        </ThemeProvider>
        </EmotionRootStyleRegistry>
        </body>
        </html>
    </>
}

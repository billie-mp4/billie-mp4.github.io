import { createClient } from '@supabase/supabase-js'
import type {Database} from './database.types.ts'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey)
async function login(){
	const {data:_data,error}=await supabase.auth.signInWithOAuth({
		provider:'github',
		options:{redirectTo:'https://billie-mp4.github.io/'}
	})
	if(error!==null){
		console.error(error)
	}
}
async function logout(){
	const {error}=await supabase.auth.signOut()
	if(error!==null){
		console.error(error)
	}
}
async function handle(){
	const {data,error}=await supabase.auth.getClaims()
	if(error!==null){
		console.error(error)
	}else if(data!==null){
		document.querySelector<HTMLDivElement>('#app')!.innerHTML=`<button id="logout">logout</button>`
		document.querySelector<HTMLDivElement>('#logout')!.addEventListener('click',logout)
	}else{
		document.querySelector<HTMLDivElement>('#app')!.innerHTML=`<button id="login">login</button>`
		document.querySelector<HTMLDivElement>('#login')!.addEventListener('click',login)
	}
}
handle()
supabase.auth.onAuthStateChange(async ()=>{
	handle()
})
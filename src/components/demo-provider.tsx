'use client';
import {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import {demoKey,seed,type State,type User} from '@/lib/demo';
type Context={db:State;user:User;ready:boolean;update:(fn:(s:State)=>State)=>void;switchUser:(id:string)=>void;reset:()=>void};
const DemoContext=createContext<Context|null>(null);
function cloneSeed():State{return JSON.parse(JSON.stringify(seed)) as State}
export function DemoProvider({children}:{children:React.ReactNode}){
 const [db,setDb]=useState<State>(cloneSeed);
 const [ready,setReady]=useState(false);
 useEffect(()=>{try{const raw=localStorage.getItem(demoKey);if(raw){const next=JSON.parse(raw) as State;if(next&&Array.isArray(next.users)&&Array.isArray(next.courses)&&Array.isArray(next.lessons)&&Array.isArray(next.purchases)&&Array.isArray(next.reviews))setDb(next)}}catch{ /* Corrupted demo cache falls back to seed */ }setReady(true)},[]);
 useEffect(()=>{if(ready){try{localStorage.setItem(demoKey,JSON.stringify(db))}catch{/* Browser storage can be unavailable */}}},[db,ready]);
 const update=useCallback((fn:(s:State)=>State)=>setDb(prev=>fn(prev)),[]);
 const switchUser=useCallback((id:string)=>setDb(prev=>prev.users.some(u=>u.id===id)?{...prev,currentUser:id}:prev),[]);
 const reset=useCallback(()=>{setDb(cloneSeed());try{localStorage.removeItem(demoKey)}catch{}},[]);
 const user=db.users.find(u=>u.id===db.currentUser)??db.users[0];
 const value=useMemo(()=>({db,user,ready,update,switchUser,reset}),[db,user,ready,update,switchUser,reset]);
 return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}
export function useDemo(){const v=useContext(DemoContext);if(!v)throw Error('DemoProvider missing');return v}

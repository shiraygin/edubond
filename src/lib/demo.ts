import { courses as examples } from '@/lib/catalog';
export type Role='student'|'tutor'|'admin';
export type User={id:string;name:string;role:Role;email:string;specialization?:string};
export type Course={id:string;title:string;description:string;category:string;symbol:string;level:'Beginner'|'Intermediate'};
export type Lesson={id:string;courseId:string;tutorId:string;title:string;description:string;price:number;approved:boolean;resource?:string};
export type Purchase={id:string;studentId:string;lessonId:string;total:number;date:string};
export type Review={id:string;studentId:string;lessonId:string;rating:number;comment:string};
export type WalletEntry={id:string;userId:string;amount:number;kind:'topup'|'purchase'|'sale'|'refund';note:string;date:string;purchaseId?:string};
export type State={users:User[];courses:Course[];lessons:Lesson[];purchases:Purchase[];reviews:Review[];currentUser:string;wallets:Record<string,number>;walletHistory:WalletEntry[]};
export const seed:State={
 users:[
 {id:'s1',name:'Sara Ahmed',role:'student',email:'sara@example.demo'},
 {id:'t1',name:'Noor Alharbi',role:'tutor',email:'noor@example.demo',specialization:'Programming'},
 {id:'t2',name:'Omar Khalid',role:'tutor',email:'omar@example.demo',specialization:'Mathematics'},
 {id:'a1',name:'Alex Morgan',role:'admin',email:'admin@example.demo'}
 ],
 courses:examples.map(({id,title,description,category,symbol,level})=>({id,title,description,category,symbol,level})),
 lessons:[
 {id:'l1',courseId:'python',tutorId:'t1',title:'Variables and Data Types',description:'Meet the building blocks of Python.',price:35,approved:true},
 {id:'l2',courseId:'python',tutorId:'t1',title:'Loops and Conditions',description:'Practice branching and iteration.',price:45,approved:true},
 {id:'l3',courseId:'web',tutorId:'t1',title:'Your First HTML Page',description:'Get started with web development.',price:40,approved:true},
 {id:'l4',courseId:'algebra',tutorId:'t2',title:'Solving Equations',description:'One variable at a time.',price:30,approved:true},
 {id:'l5',courseId:'calculus',tutorId:'t2',title:'Understanding Limits',description:'An approachable introduction to calculus.',price:50,approved:true},
 {id:'l6',courseId:'python',tutorId:'t1',title:'Functions Workshop',description:'Functions, inputs, and outputs.',price:60,approved:false}
 ],
 purchases:[{id:'p1',studentId:'s1',lessonId:'l1',total:35,date:'2026-09-20'}],
 reviews:[{id:'r1',studentId:'s1',lessonId:'l1',rating:5,comment:'Clear and easy to follow!'}],
 wallets:{s1:465,t1:35,t2:0,a1:0},
 walletHistory:[{id:'tx0',userId:'s1',amount:-35,kind:'purchase',note:'Variables and Data Types',date:'2026-09-20',purchaseId:'p1'},{id:'tx1',userId:'t1',amount:35,kind:'sale',note:'Variables and Data Types',date:'2026-09-20',purchaseId:'p1'}],
 currentUser:'s1'
};
export const demoKey='edubond-v4-demo';
export function uid(){return Math.random().toString(36).slice(2,10)}
export function money(n:number){return new Intl.NumberFormat('en-SA',{style:'currency',currency:'SAR',maximumFractionDigits:0}).format(n)}

export function balance(s:State,id:string){return s.wallets?.[id]??0}
export function topUp(s:State,userId:string,amount:number):State{
 if(!Number.isFinite(amount)||amount<=0||amount>10000||!s.users.some(u=>u.id===userId&&u.role==='student'))return s;
 return {...s,wallets:{...s.wallets,[userId]:balance(s,userId)+amount},walletHistory:[{id:uid(),userId,amount,kind:'topup',note:'Wallet top-up',date:new Date().toISOString()},...s.walletHistory]};
}
export function purchaseLesson(s:State,studentId:string,lessonId:string):State{
 const student=s.users.find(u=>u.id===studentId),l=s.lessons.find(x=>x.id===lessonId);
 if(student?.role!=='student'||!l?.approved||!s.users.some(u=>u.id===l.tutorId&&u.role==='tutor')||s.purchases.some(p=>p.studentId===studentId&&p.lessonId===lessonId)||!Number.isFinite(l.price)||l.price<0||balance(s,studentId)<l.price)return s;
 const purchaseId=uid(),date=new Date().toISOString(),cost=l.price;
 return {...s,wallets:{...s.wallets,[studentId]:balance(s,studentId)-cost,[l.tutorId]:balance(s,l.tutorId)+cost},purchases:[...s.purchases,{id:purchaseId,studentId,lessonId,total:cost,date:date.slice(0,10)}],walletHistory:[{id:uid(),userId:studentId,amount:-cost,kind:'purchase',note:l.title,date,purchaseId},{id:uid(),userId:l.tutorId,amount:cost,kind:'sale',note:l.title,date,purchaseId},...s.walletHistory]};
}
export function removeLessons(s:State,ids:string[]):State{
 const target=new Set(ids),refunds=s.purchases.filter(p=>target.has(p.lessonId)),wallets={...s.wallets},history=[...s.walletHistory];
 for(const p of refunds){
  const tutor=s.lessons.find(l=>l.id===p.lessonId)?.tutorId;
  wallets[p.studentId]=(wallets[p.studentId]??0)+p.total;
  if(tutor)wallets[tutor]=(wallets[tutor]??0)-p.total;
  history.unshift({id:uid(),userId:p.studentId,amount:p.total,kind:'refund',note:'Lesson removed — refund',date:new Date().toISOString(),purchaseId:p.id});
  if(tutor)history.unshift({id:uid(),userId:tutor,amount:-p.total,kind:'refund',note:'Lesson removed — reversal',date:new Date().toISOString(),purchaseId:p.id});
 }
 return {...s,lessons:s.lessons.filter(l=>!target.has(l.id)),purchases:s.purchases.filter(p=>!target.has(p.lessonId)),reviews:s.reviews.filter(r=>!target.has(r.lessonId)),wallets,walletHistory:history};
}

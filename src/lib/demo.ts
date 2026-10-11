import { courses as examples } from '@/lib/catalog';
export type Role='student'|'tutor'|'admin';
export type User={id:string;name:string;role:Role;email:string;specialization?:string};
export type Course={id:string;title:string;description:string;category:string;symbol:string;level:'Beginner'|'Intermediate'};
export type Lesson={id:string;courseId:string;tutorId:string;title:string;description:string;price:number;approved:boolean;resource?:string};
export type Purchase={id:string;studentId:string;lessonId:string;total:number;date:string};
export type Review={id:string;studentId:string;lessonId:string;rating:number;comment:string};
export type State={users:User[];courses:Course[];lessons:Lesson[];purchases:Purchase[];reviews:Review[];currentUser:string};
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
 currentUser:'s1'
};
export const demoKey='edubond-v3-demo';
export function uid(){return Math.random().toString(36).slice(2,10)}
export function money(n:number){return new Intl.NumberFormat('en-SA',{style:'currency',currency:'SAR',maximumFractionDigits:0}).format(n)}

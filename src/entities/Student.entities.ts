import {
   Entity,
   PrimaryGeneratedColumn,
   Column
 } from 'typeorm'
 @Entity()
 export class Student {
   @PrimaryGeneratedColumn()
   id!: number
 
   @Column()
   firstname!: string
 
   @Column()
   lastname!: string
 
   @Column()
   age!: number
 
   @Column()
   email!: string
 
   @Column()
   fullname!: string
 
 }
 
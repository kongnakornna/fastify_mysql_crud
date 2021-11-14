import {
   Entity,
   PrimaryGeneratedColumn,
   Column
 } from 'typeorm'
 @Entity()
 export class Ad_administrator_roles {
    @PrimaryGeneratedColumn()
    id!: number
       
    @Column({ type: 'datetime',unique: false,nullable: true})
    create!: string
     
    @Column({ type: 'datetime',unique: false,nullable: true})
    update!: string
     
    @Column({ unique: false, nullable: true, })
    role_id!: number
     
    @Column({ unique: true, nullable: true, })
    user_id!: number

 }
 
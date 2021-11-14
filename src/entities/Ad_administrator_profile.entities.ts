import {
   Entity,
   PrimaryGeneratedColumn,
   Column
 } from 'typeorm'
 @Entity()
 export class Ad_administrator_profile {
    @PrimaryGeneratedColumn()
    id!: number
     
    @Column({ unique: false, nullable: true, })
    user_id!: number
       
    @Column({ nullable: false,})
    firstname!:string
    
    @Column({ nullable: false,})
    lastname!: string
    
    @Column({unique: false, nullable: true,})
    fullname!: string
     
    @Column({unique: false, nullable: true,type: "varchar", length: 250 })
    nickname!: string
    
    @Column({unique: false, nullable: true,type: "varchar", length: 80 })
    idcard!: string
    
    @Column({type: 'text',unique: false,nullable: true})
    detail!: string
     
    @Column({type: 'text',unique: false,nullable: true})
    address!: string
     
    @Column({ type: 'datetime',unique: true,nullable: true})
    date!: string
     
    @Column({ unique: false, nullable: true, })
    language_id!: number

 }
 
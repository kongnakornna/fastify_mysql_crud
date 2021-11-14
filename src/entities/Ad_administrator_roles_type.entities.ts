import {
   Entity,
   PrimaryGeneratedColumn,
   Column
 } from 'typeorm'
 @Entity()
 export class Ad_administrator_roles_type {
    @PrimaryGeneratedColumn()
    role_id!: number
       
    @Column({unique: false, nullable: true,type: "varchar", length: 255 })
    name!: string
     
    @Column({unique: false, nullable: true,type: "varchar", length: 255 })
    detail!: string
     
    @Column({ type: 'datetime',unique: false,nullable: true})
    created!: string
      
    @Column({ type: 'datetime',unique: false,nullable: true})
    updated!: string

 }
 